import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Preenchimento da linha curva do #processo (svg .ut-timeline-bg) conforme a rolagem.
//
// - A mascara (.ut-path-mask) revela o tracejado laranja ate o comprimento atual da curva.
// - A bolinha (.ut-dot) acompanha a ponta, usando getPointAtLength na mesma curva.
// - Cada pill (.ut-timeline-pill) recebe `is-on` (sai do cinza) e `is-pinged` (pulso + chacoalhada)
//   quando a bolinha esta DENTRO dela. A classe sai se a rolagem voltar, entao a animacao pode repetir.
// - A pill 1 e a excecao: acende assim que aparece um pouco na tela (a linha so comeca abaixo dela).
// - O avanco da linha/bolinha e suavizado (amortecimento exponencial por frame): em rolagem rapida
//   a bolinha desliza ate o alvo em vez de saltar junto com o scroll.
//
// "Dentro" e testado contra o formato real da pill (retangulo arredondado, com a rotacao dela),
// e nao contra o retangulo envolvente, que e maior que a pill nos cantos arredondados.
const SAMPLES = 600;
const INSIDE_DEPTH = 6; // px: o centro da bolinha precisa estar pelo menos isso dentro da pill
const SMOOTH = 5.5; // maior = mais colado na rolagem; menor = mais suave/lento (1/s)
const FIRST_PILL_VIEW = 0.93; // pill 1 acende quando o topo dela passa dessa fracao da altura da tela
// O fim da curva pode so encostar na borda da ultima pill (ou ficar a poucos px dela) quando a pill e baixa
// ou a tela e estreita. Antes, sem uma entrada de INSIDE_DEPTH px, ela so acendia com a linha no ULTIMO pixel,
// e o fim da suavizacao exponencial e muito lento (varios segundos). Agora:
//  - tenta entradas cada vez mais permissivas (6px dentro -> encostando -> a 8px da borda);
//  - nenhuma pill exige mais que LAST_REACH do comprimento total da curva.
const ENTRY_DEPTHS = [INSIDE_DEPTH, 0, -8]; // px (distancia com sinal: positivo = dentro)
const LAST_REACH = 0.995;

// distancia com sinal ate um retangulo arredondado centrado na origem (negativa = dentro)
const sdRoundBox = (px, py, hw, hh, r) => {
  const qx = Math.abs(px) - (hw - r);
  const qy = Math.abs(py) - (hh - r);
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
};

// Faixa ate 1024px: os cards ficam em grade (1 coluna, alternando esquerda/direita) e a posicao/altura
// deles varia com a largura e com a quebra de texto. Um path fixo nao acompanha isso, entao nessa faixa a
// curva e desenhada em px, passando pelo CENTRO de cada card, de cima a baixo do .ut-timeline.
// Fora da faixa (>=1025) continuam valendo os paths originais do JSX.
const FIT_MQ = "(max-width: 1024px)";
const FIT_STROKE = 2.3; // px (igual ao traco que o svg mobile tinha em 390px)
const FIT_DASH = 7.6; // px
const FIT_BEND = 0.5; // 0..1: quao "esticado" e o S entre dois cards (handles verticais)

// S entre os centros dos cards, com tangente vertical em cada centro (a linha entra/sai reta no card).
// Comeca no CENTRO do primeiro card e termina no CENTRO do ultimo (a bolinha nao vaza para fora deles).
const buildFitPath = (centers) => {
  const f = (n) => Number(n.toFixed(2));
  const first = centers[0];
  const last = centers[centers.length - 1];
  let d = `M${f(first.x)} ${f(first.y)}`;
  for (let i = 1; i < centers.length; i += 1) {
    const a = centers[i - 1];
    const b = centers[i];
    const k = (b.y - a.y) * FIT_BEND;
    d += `C${f(a.x)} ${f(a.y + k)} ${f(b.x)} ${f(b.y - k)} ${f(b.x)} ${f(b.y)}`;
  }
  return d;
};

export default function useProcessTimeline(timelineRef) {
  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return undefined;

    // há dois svgs (desktop e mobile); o css esconde um deles com display:none
    const svgs = Array.from(root.querySelectorAll(".ut-timeline-bg"));
    const pickSvg = () => svgs.find((el) => el.getClientRects().length > 0) || svgs[0];
    let svg = pickSvg();
    let guide = svg?.querySelector(".ut-path-guide, .ut-path-base");
    let mask = svg?.querySelector(".ut-path-mask");
    const dot = root.querySelector(".ut-dot");
    const pills = Array.from(root.querySelectorAll(".ut-timeline-pill"));
    if (!svg || !guide || !mask || !dot) return undefined;

    let vb = svg.viewBox.baseVal;
    let total = 0;
    const fitMq = window.matchMedia?.(FIT_MQ);
    let fitOn = false;

    // atributos originais de cada svg, para voltar ao normal fora da faixa ate 1024
    const ATTRS = {
      svg: ["viewBox", "width", "height"],
      mask: ["x", "y", "width", "height"],
      path: ["d", "stroke-width", "stroke-dasharray", "stroke-linecap", "stroke-linejoin"],
    };
    const saved = new Map();
    const save = (el, names) => {
      if (saved.has(el)) return;
      saved.set(el, names.map((n) => [n, el.getAttribute(n)]));
    };
    const restore = () => {
      saved.forEach((list, el) => {
        list.forEach(([n, v]) => (v === null ? el.removeAttribute(n) : el.setAttribute(n, v)));
        el.style.removeProperty("vector-effect");
      });
      saved.clear();
    };
    const applyFit = (centers, W, H) => {
      const d = buildFitPath(centers);
      svgs.forEach((el) => {
        save(el, ATTRS.svg);
        el.setAttribute("viewBox", `0 0 ${f2(W)} ${f2(H)}`);
        el.setAttribute("width", f2(W));
        el.setAttribute("height", f2(H));
        const m = el.querySelector("mask");
        if (m) {
          save(m, ATTRS.mask);
          m.setAttribute("x", "-50");
          m.setAttribute("y", "-50");
          m.setAttribute("width", f2(W + 100));
          m.setAttribute("height", f2(H + 100));
        }
        el.querySelectorAll(".ut-path-guide, .ut-path-base, .ut-path-fill, .ut-path-mask").forEach((pa) => {
          save(pa, ATTRS.path);
          pa.setAttribute("d", d);
          if (pa.classList.contains("ut-path-base") || pa.classList.contains("ut-path-fill")) {
            pa.setAttribute("stroke-width", String(FIT_STROKE));
            pa.setAttribute("stroke-dasharray", `${FIT_DASH} ${FIT_DASH}`);
            pa.setAttribute("stroke-linecap", "round");
            pa.setAttribute("stroke-linejoin", "round");
          }
        });
      });
    };
    const f2 = (n) => Number(n.toFixed(2));
    let offX = 0;
    let offY = 0;
    let boxW = 1;
    let boxH = 1;
    let pillLens = [];
    let lastKey = "";
    let svgDocTop = 0; // posicao do svg/pill 1 no documento (cache: evita getBoundingClientRect a cada frame)
    let svgH = 1;
    let pill1DocTop = 0;
    let cur = 0; // comprimento suavizado (o que e desenhado)
    let primed = false; // primeiro frame: encaixa sem animar (ex.: recarregar a pagina no meio da secao)
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const clamp01 = (v) => Math.min(1, Math.max(0, v));

    const measure = () => {
      const wantFit = !!fitMq?.matches;
      if (wantFit) {
        // medidas dos cards em px, relativas ao .ut-timeline (o box do svg e o proprio .ut-timeline: 0,0,100%,100%)
        // referencia = box do svg visivel (pode ter inset em relacao ao .ut-timeline)
        const rr = pickSvg().getBoundingClientRect();
        const centers = pills.map((pill) => {
          const pr = pill.getBoundingClientRect();
          return { x: pr.left + pr.width / 2 - rr.left, y: pr.top + pr.height / 2 - rr.top };
        });
        applyFit(centers, rr.width, rr.height);
        fitOn = true;
      } else if (fitOn) {
        restore();
        fitOn = false;
      }
      const next = pickSvg();
      if (next !== svg) {
        if (mask) mask.style.strokeDasharray = "";
        svg = next;
        guide = svg.querySelector(".ut-path-guide, .ut-path-base");
        mask = svg.querySelector(".ut-path-mask");
        vb = svg.viewBox.baseVal;
      }
      guide = svg.querySelector(".ut-path-guide, .ut-path-base");
      mask = svg.querySelector(".ut-path-mask");
      vb = svg.viewBox.baseVal;
      total = guide.getTotalLength();
      const rootRect = root.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      offX = svgRect.left - rootRect.left;
      offY = svgRect.top - rootRect.top;
      boxW = svgRect.width;
      boxH = svgRect.height;
      svgDocTop = svgRect.top + window.scrollY;
      svgH = svgRect.height;
      pill1DocTop = pills[0] ? pills[0].getBoundingClientRect().top + window.scrollY : 0;

      // pontos da curva ja convertidos para o espaco do .ut-timeline
      const pts = [];
      for (let i = 0; i <= SAMPLES; i += 1) {
        const len = (i / SAMPLES) * total;
        const p = guide.getPointAtLength(len);
        pts.push({
          len,
          x: offX + (p.x / vb.width) * boxW,
          y: offY + (p.y / vb.height) * boxH,
        });
      }

      pillLens = pills.map((pill) => {
        const cs = getComputedStyle(pill);
        const pr = pill.getBoundingClientRect();
        // o centro do retangulo envolvente e o centro da pill, com ou sem rotacao/escala
        const cx = pr.left + pr.width / 2 - rootRect.left;
        const cy = pr.top + pr.height / 2 - rootRect.top;
        // tamanho de layout (sem escala/rotacao) e angulo atual
        const hw = pill.offsetWidth / 2;
        const hh = pill.offsetHeight / 2;
        let r = parseFloat(cs.borderTopLeftRadius);
        r = Number.isFinite(r) ? Math.min(r, hw, hh) : hh;
        let angle = 0;
        try {
          const m = new DOMMatrix(cs.transform === "none" ? undefined : cs.transform);
          angle = Math.atan2(m.b, m.a);
        } catch {
          angle = 0;
        }
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // primeiro ponto da curva (por ordem de comprimento) para cada nivel de tolerancia
        const entries = ENTRY_DEPTHS.map(() => null);
        let closest = pts[0];
        let closestSd = Infinity;
        for (let i = 0; i < pts.length; i += 1) {
          const dx = pts[i].x - cx;
          const dy = pts[i].y - cy;
          const sd = sdRoundBox(dx * cos + dy * sin, -dx * sin + dy * cos, hw, hh, r);
          for (let d = 0; d < ENTRY_DEPTHS.length; d += 1) {
            if (entries[d] === null && sd <= -ENTRY_DEPTHS[d]) entries[d] = pts[i].len;
          }
          if (sd < closestSd) {
            closestSd = sd;
            closest = pts[i];
          }
        }
        // usa a entrada mais exigente que existir; se a curva nunca chega perto, o ponto mais proximo
        const found = entries.find((e) => e !== null);
        const entry = found !== undefined ? found : closest.len;
        return Math.min(entry, total * LAST_REACH);
      });
      lastKey = "";
    };

    const update = (_time, deltaTime) => {
      if (!total) return;
      const vh = window.innerHeight;

      // pill 1: acende pela visibilidade, sem esperar a linha (ela comeca abaixo do card)
      if (pills[0]) {
        const on1 = pill1DocTop - window.scrollY < vh * FIRST_PILL_VIEW;
        if (on1 !== pills[0].classList.contains("is-on")) {
          pills[0].classList.toggle("is-on", on1);
          pills[0].classList.toggle("is-pinged", on1);
        }
      }

      // alvo vindo da rolagem
      const anchor = vh * 0.55;
      const p = clamp01((anchor - (svgDocTop - window.scrollY)) / (svgH * 0.92));
      const target = p * total;

      // suaviza em direcao ao alvo (independente do fps)
      if (!primed || reduceMotion) {
        cur = target;
        primed = true;
      } else {
        const dt = Math.min(Number(deltaTime) || 16.7, 100) / 1000;
        cur += (target - cur) * (1 - Math.exp(-dt * SMOOTH));
        if (Math.abs(target - cur) < 0.05) cur = target;
      }

      const len = cur;
      const key = len.toFixed(2);
      if (key === lastKey) return;
      lastKey = key;

      mask.style.strokeDasharray = `${len} ${total * 2}`;

      const pt = guide.getPointAtLength(len);
      const x = offX + (pt.x / vb.width) * boxW;
      const y = offY + (pt.y / vb.height) * boxH;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      dot.classList.toggle("is-on", len > 0.5 && len < total - 0.5);

      // pills 2..5: acendem quando a bolinha (ja suavizada) entra nelas
      for (let i = 1; i < pills.length; i += 1) {
        const on = len > 0.5 && len >= pillLens[i];
        pills[i].classList.toggle("is-on", on);
        pills[i].classList.toggle("is-pinged", on);
      }
    };

    measure();
    update();

    gsap.ticker.add(update);
    const onRefresh = () => {
      measure();
      update();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);
    window.addEventListener("resize", onRefresh);
    document.fonts?.ready?.then(onRefresh);
    // altura dos cards muda com a quebra de texto/fonte sem a janela mudar de tamanho
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      let first = true;
      ro = new ResizeObserver(() => {
        if (first) {
          first = false;
          return;
        }
        onRefresh();
      });
      ro.observe(root);
    }

    return () => {
      gsap.ticker.remove(update);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      window.removeEventListener("resize", onRefresh);
      ro?.disconnect();
      if (fitOn) restore();
    };
  }, [timelineRef]);
}