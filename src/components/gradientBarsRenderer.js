// Desenho das barras. Roda dentro de um Web Worker (OffscreenCanvas) quando o navegador suporta,
// assim a animacao NAO depende da thread principal e nao engasga enquanto a pagina carrega.
// Sem suporte, o mesmo codigo roda na thread principal (fallback).

const PULSE_MIN = 0.7; // altura minima do pulso (1 = altura base)
const IDLE_FRAME_MS = 33; // pulso parado na tela roda a ~30fps; scroll redesenha na hora
// Quanto as barras ENCOLHEM com o scroll (fill = 1): altura = altura base x (1 - SHRINK).
// 1 = somem por completo (a #problema cobre o fundo). O encolhimento e proporcional, entao as
// barras mantem alturas e degrades DIFERENTES entre si (efeito vidro).
const SHRINK = 1;
// Animacao de entrada: uma onda atravessa a tela da esquerda para a direita. Quando a crista passa
// por uma barra, ela sobe, passa um pouco da altura final (INTRO_OVERSHOOT) e assenta no lugar.
const INTRO_DELAY = 0; // s, espera antes de comecar
const INTRO_DURATION = 0.85; // s, tempo de cada barra para assentar
const INTRO_STAGGER = 0.05; // s, atraso entre uma barra e a proxima (maior = onda mais lenta)
const INTRO_OVERSHOOT = 1.9; // 0 = sem estouro; maior = a crista da onda passa mais da altura final
const OVERLAP = 1; // px de sobreposicao da barra mais baixa sobre a mais alta (fecha a fresta)

const calculateHeight = (index, total, minHeight) => {
  const position = total > 1 ? index / (total - 1) : 0.5;
  const distanceFromCenter = Math.abs(position - 0.5);
  const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
  return minHeight + (100 - minHeight) * heightPercentage;
};

export function createBarsRenderer(canvas, { bottomCss, bgCss, numBars, minHeight, duration, stagger, reduced, immediate }) {
  const ctx = canvas.getContext("2d");
  const base = Array.from({ length: numBars }, (_, i) => calculateHeight(i, numBars, minHeight) / 100);

  // buffers reaproveitados a cada frame (sem alocar nada no loop)
  const hPx = new Array(numBars).fill(0);
  const order = Array.from({ length: numBars }, (_, i) => i);

  let W = 0;
  let H = 0;
  let fill = 0; // 0 a 1: barras encolhem ate sumir
  let rotation = 0; // graus
  let scale = 1;
  let visible = true;
  let dirty = true;
  let raf = 0;
  let lastDraw = 0;
  let destroyed = false;
  const introEnd = INTRO_DELAY + (numBars - 1) * INTRO_STAGGER + INTRO_DURATION;
  let introDone = reduced;
  // Relogio proprio da entrada: avanca no maximo 1/30s por frame (um engasgo pausa em vez de pular).
  let ready = reduced || !!immediate; // immediate (mobile): a intro comeca no 1o desenho, sem esperar 2 frames
  let introT = 0;
  let lastFrame = 0;
  const t0 = performance.now();

  const draw = (now) => {
    dirty = false;
    lastDraw = now;
    if (!W || !H) return;
    const t = (now - t0) / 1000;
    const dt = lastFrame ? (now - lastFrame) / 1000 : 0;
    lastFrame = now;
    if (ready && !introDone) introT += Math.min(dt, 1 / 30);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // rotacao e escala feitas AQUI, em resolucao nativa (nada de esticar bitmap = sem blur)
    if (rotation !== 0 || scale !== 1) {
      ctx.translate(W / 2, H / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.translate(-W / 2, -H / 2);
    }

    ctx.fillStyle = bgCss;
    ctx.fillRect(0, 0, W, H);

    // altura de cada barra neste frame (pulso + fill + intro)
    for (let i = 0; i < numBars; i++) {
      let p = 1;
      if (!reduced) {
        const phase = (t - i * stagger) / duration;
        if (phase > 0) {
          const cycle = Math.floor(phase);
          let x = phase - cycle;
          if (cycle % 2 === 1) x = 1 - x;
          p = 1 - (1 - PULSE_MIN) * (x * x * (3 - 2 * x));
        }
      }
      const b = base[i] * p;
      let target = H * b * (1 - SHRINK * fill);
      if (!introDone) {
        // easeOutBack: sobe, passa da altura final e volta (a "crista" da onda) ate parar
        const k = (introT - INTRO_DELAY - i * INTRO_STAGGER) / INTRO_DURATION;
        const c1 = INTRO_OVERSHOOT;
        const e = k <= 0 ? 0 : k >= 1 ? 1 : 1 + (c1 + 1) * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2);
        target *= e;
      }
      hPx[i] = Math.round(target);
    }
    if (!introDone && introT >= introEnd) introDone = true;

    // Desenha da mais baixa para a mais alta. Cada barra baixa avanca OVERLAP px para dentro
    // da vizinha mais alta (que e desenhada depois e cobre a sobra): fecha a fresta, mesmo
    // girando/escalando, e nunca aparece degrau no topo.
    order.sort((a, b) => hPx[a] - hPx[b] || a - b);
    for (let k = 0; k < numBars; k++) {
      const i = order[k];
      const h = hPx[i];
      if (h <= 0) continue;

      let x0 = Math.round((i * W) / numBars);
      let x1 = Math.round(((i + 1) * W) / numBars);
      const l = i - 1;
      const r = i + 1;
      if (l >= 0 && (h < hPx[l] || (h === hPx[l] && i < l))) x0 -= OVERLAP;
      if (r < numBars && (h < hPx[r] || (h === hPx[r] && i < r))) x1 += OVERLAP;

      const y = H - h;
      const g = ctx.createLinearGradient(0, H, 0, y);
      g.addColorStop(0, bottomCss);
      g.addColorStop(1, bgCss);
      ctx.fillStyle = g;
      ctx.fillRect(x0, y, x1 - x0, h);
    }
  };

  const loop = (now) => {
    raf = 0;
    if (destroyed || !visible) return;
    if (dirty || (ready && !introDone) || now - lastDraw >= IDLE_FRAME_MS) draw(now);
    if (!reduced) raf = requestAnimationFrame(loop);
  };

  const requestDraw = () => {
    dirty = true;
    if (!raf && !destroyed) raf = requestAnimationFrame(loop);
  };

  // A intro comeca logo depois do primeiro desenho (2 frames para a pintura inicial assentar).
  if (!ready) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ready = true;
        lastFrame = 0;
        requestDraw();
      })
    );
  }

  return {
    // w/h em pixels do dispositivo
    resize(w, h) {
      if (w !== W || h !== H) {
        W = w;
        H = h;
        canvas.width = W;
        canvas.height = H;
      }
      requestDraw();
    },
    setScroll(d = {}) {
      fill = Math.min(1, Math.max(0, d.fill ?? 0));
      rotation = d.rotation ?? 0;
      scale = d.scale ?? 1;
      requestDraw();
    },
    setVisible(v) {
      visible = v;
      if (v) requestDraw();
    },
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}