// Parada de CHEGADA e de SAIDA nas secoes fixas (pin).
//
// Problema: um scroll longo vindo de cima atravessava a chegada da secao e ja comecava a rolagem
// horizontal no mesmo gesto. Aqui, quando o gesto da roda CRUZARIA o inicio da secao, a rolagem
// e freada exatamente nele (com a mesma suavizacao do resto da pagina, sem trava seca) e o resto
// daquele gesto e ignorado. So um NOVO gesto (roda parou e voltou a girar) entra na horizontal.
// O mesmo vale ao chegar pelo fim, subindo, e ao SAIR da horizontal pelo fim, descendo: um
// gesto longo nao atravessa a secao e ja continua na vertical; so um novo gesto sai dela.
//
// Dentro da secao, e fora dela, a rolagem e livre: nada e freado.
//
// Desktop: createStopGate (roda do mouse / trackpad, via virtualScroll do Lenis).
// Celular/tablet: createTouchGate (dedo). No toque o Lenis deixa a rolagem NATIVA, entao o
// virtualScroll nunca recebe o gesto; o gate de toque observa o scroll e segura a pagina na fronteira.

const zones = new Set();

/** Registra uma secao fixa. getRange devolve { start, end } (posicoes de scroll) ou null. */
export function registerStopZone(getRange) {
  zones.add(getRange);
  return () => zones.delete(getRange);
}

const GESTURE_GAP = 200; // ms sem girar a roda = gesto novo
const TOL = 6; // px
const NOISE = 4; // deltas menores que isso (ruido do trackpad) nao contam

/** Cria o handler para a opcao `virtualScroll` do Lenis. */
export function createStopGate({ getLenis, lerp }) {
  let waiting = false; // ja parou na chegada; ignora o resto do gesto atual
  let lastWheel = 0;
  let lastDir = 0;

  return (data) => {
    const { deltaY, event } = data;
    const lenis = getLenis();
    if (!lenis || zones.size === 0) return true;
    if (event.type !== "wheel" || event.ctrlKey) return true;
    if (document.documentElement.classList.contains("is-loading")) return true;
    if (event.target?.closest?.("dialog, input, textarea, select, [data-lenis-prevent]")) return true;

    const dir = Math.sign(deltaY);
    if (!dir) return true;
    const now = performance.now();
    const noise = Math.abs(deltaY) < NOISE;
    const fresh = !noise && (now - lastWheel > GESTURE_GAP || dir !== lastDir);

    if (waiting) {
      if (fresh) {
        waiting = false;
      } else {
        // continuacao do mesmo gesto (inclui a inercia do trackpad): engole
        lastWheel = now;
        if (event.cancelable) event.preventDefault();
        return false;
      }
    }

    lastWheel = now;
    if (!noise) lastDir = dir;
    if (noise) return true;

    // posicao para onde a rolagem ja esta indo (nao onde esta agora) + este passo
    const target = lenis.targetScroll;
    const predicted = target + deltaY;

    for (const getRange of zones) {
      const range = getRange();
      if (!range) continue;
      // fronteiras da secao: inicio e fim. Um gesto nunca atravessa uma fronteira:
      // descendo, para no inicio (chegada) e depois no fim (saida da horizontal);
      // subindo, o inverso.
      const bounds = [range.start, range.end];
      let stopAt = null;
      if (dir > 0) {
        for (const b of bounds) {
          if (target < b - TOL && predicted >= b) { stopAt = b; break; }
        }
      } else {
        for (let i = bounds.length - 1; i >= 0; i--) {
          const b = bounds[i];
          if (target > b + TOL && predicted <= b) { stopAt = b; break; }
        }
      }
      if (stopAt === null) continue;

      if (event.cancelable) event.preventDefault();
      waiting = true;
      // freia ate a fronteira com a MESMA suavizacao da rolagem normal
      lenis.scrollTo(stopAt, { programmatic: false, lerp });
      return false;
    }
    return true;
  };
}

// Enquanto o usuario arrasta a faixa horizontal com o dedo (useHorizontalPin), o scroll da pagina
// e movido por codigo; o gate de toque nao deve interpretar isso como um gesto que cruza fronteira.
let touchBypass = false;
export function setTouchGateBypass(on) {
  touchBypass = on;
}

/**
 * Gate para TOQUE (celular/tablet). Mesma regra do createStopGate:
 * um gesto (dedo na tela + a inercia depois de soltar) nunca atravessa o inicio nem o fim de uma
 * secao fixa. Ao cruzar a fronteira, a pagina para nela e o resto do gesto e ignorado.
 * Gesto novo = dedo novo na tela (touchstart).
 *
 * O scroll de toque e nativo e nao da para cancelar no meio do gesto. Reposicionar o scroll a cada
 * frame (brigar com a inercia) faz a secao fixa tremer, entao a parada e feita travando a rolagem
 * do documento (overflow:hidden), que mata a inercia na hora, e soltando quando o dedo sai da tela.
 * Retorna a funcao de limpeza.
 */
export function createTouchGate({ getLenis }) {
  const IDLE = 150; // ms sem scroll depois de soltar o dedo = fim da inercia
  const MOVE = 4; // px de movimento do dedo para contar como arrasto (toque simples nao conta)
  const RELEASE = 80; // ms parado na fronteira (inercia sem dedo) antes de liberar a rolagem

  const root = document.documentElement;
  let active = false; // gesto de arrasto em andamento (dedo na tela ou inercia)
  let touching = false;
  let moved = false;
  let startY = 0;
  let blocked = false; // ja parou numa fronteira; ignora o resto do gesto
  let blockDir = 0;
  let blockAt = 0;
  let prevY = window.scrollY;
  let idleTimer = 0;
  let releaseTimer = 0;
  let locked = false;
  let saved = ["", ""];

  const ignoreTarget = (t) =>
    root.classList.contains("is-loading") ||
    !!t?.closest?.("dialog, input, textarea, select, [data-lenis-prevent]");

  const lockScroll = () => {
    if (locked) return;
    locked = true;
    saved = [root.style.overflow, document.body.style.overflow];
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    if (!locked) return;
    locked = false;
    root.style.overflow = saved[0];
    document.body.style.overflow = saved[1];
  };

  const endGesture = () => {
    clearTimeout(releaseTimer);
    unlockScroll();
    active = false;
    blocked = false;
    blockDir = 0;
  };

  const armIdle = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!touching) endGesture();
    }, IDLE);
  };

  const jump = (y) => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo({ top: y, behavior: "instant" });
    prevY = y;
  };

  const findStop = (from, to, dir) => {
    for (const getRange of zones) {
      const range = getRange();
      if (!range) continue;
      const bounds = [range.start, range.end];
      if (dir > 0) {
        for (const b of bounds) if (from < b - TOL && to >= b) return b;
      } else {
        for (let i = bounds.length - 1; i >= 0; i--) {
          const b = bounds[i];
          if (from > b + TOL && to <= b) return b;
        }
      }
    }
    return null;
  };

  const onStart = (e) => {
    clearTimeout(idleTimer);
    clearTimeout(releaseTimer);
    unlockScroll();
    touching = true;
    moved = false;
    blocked = false; // dedo novo = gesto novo
    blockDir = 0;
    prevY = window.scrollY;
    startY = e.touches[0]?.clientY ?? 0;
    // pinca (2 dedos) e dialogos/campos ficam fora do gate
    active = e.touches.length === 1 && !ignoreTarget(e.target);
  };

  const onMove = (e) => {
    if (!active) return;
    if (!moved && Math.abs((e.touches[0]?.clientY ?? 0) - startY) > MOVE) moved = true;
  };

  const onEnd = (e) => {
    touching = e.touches.length > 0;
    if (touching) return;
    if (!moved || blocked) {
      // toque simples, ou gesto que ja parou na fronteira (a inercia foi morta): acabou
      requestAnimationFrame(() => {
        if (!touching) endGesture();
      });
    } else {
      armIdle(); // arrasto livre: a inercia ainda pode estar rolando
    }
  };

  const onScroll = () => {
    const y = window.scrollY;
    if (touchBypass || !active || zones.size === 0) {
      prevY = y;
      return;
    }
    if (!touching && !blocked) armIdle();

    if (blocked) {
      // plano B se o navegador ignorar o overflow:hidden: volta para a fronteira
      if ((y - blockAt) * blockDir > 0.5) jump(blockAt);
      return;
    }

    const dir = Math.sign(y - prevY);
    if (dir) {
      const stopAt = findStop(prevY, y, dir);
      if (stopAt !== null) {
        blocked = true;
        blockDir = dir;
        blockAt = stopAt;
        lockScroll();
        jump(stopAt);
        // sem dedo na tela (so inercia): solta logo, nao ha mais nada a segurar
        if (!touching) {
          releaseTimer = setTimeout(() => {
            if (!touching) endGesture();
          }, RELEASE);
        }
        return;
      }
    }
    prevY = y;
  };

  const opts = { passive: true };
  window.addEventListener("touchstart", onStart, opts);
  window.addEventListener("touchmove", onMove, opts);
  window.addEventListener("touchend", onEnd, opts);
  window.addEventListener("touchcancel", onEnd, opts);
  window.addEventListener("scroll", onScroll, opts);

  return () => {
    clearTimeout(idleTimer);
    clearTimeout(releaseTimer);
    unlockScroll();
    window.removeEventListener("touchstart", onStart);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", onEnd);
    window.removeEventListener("touchcancel", onEnd);
    window.removeEventListener("scroll", onScroll);
  };
}