import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Distancia de rolagem (em telas) em que o hero-grid some 100%.
// Menor = some mais rapido.
const GRID_DIST_VH = 0.55;
// Quanto do hero-grid ja sumiu quando o #problema comeca a entrar (0 a 1).
const GRID_FADE_AT_REVEAL = 0.35;
// Escala final do hero-grid (1 = tamanho original).
const GRID_END_SCALE = 0.5;
// Fracao da distancia do hero-grid em que a OPACIDADE chega a 0 (0 a 1). Menor = some mais rapido,
// enquanto sobe/encolhe continua na distancia normal. 1 = some junto com o movimento.
const GRID_OPACITY_FRACTION = 0.7;

// ---- MOBILE (<= 1024px) ----
// Rolagem do hero-intro mais longa: antes ele sumia em ~0.4 tela e o #problema ja subia por cima.
// GRID_DIST_VH_MOBILE: distancia (em telas) ate o hero-grid terminar de subir/encolher/sumir. Maior = mais lento.
// GRID_FADE_AT_REVEAL_MOBILE: quando o #problema comeca a entrar, como fracao da distancia acima.
// Precisa ser >= GRID_OPACITY_FRACTION (0.7) para o hero-intro ja estar invisivel quando o #problema chegar.
const GRID_DIST_VH_MOBILE = 0.12;
// Mobile: quanto o hero-grid sobe ALEM do scroll nativo (em telas) e escala final (1 = sem encolher).
// Manter igual ao translateY/scale do keyframe hero-grid-out em mobile.css (-35lvh / 0.5).
const GRID_RISE_VH_MOBILE = 0.35;
const GRID_END_SCALE_MOBILE = 0.5;
const GRID_FADE_AT_REVEAL_MOBILE = 0.75;
const MOBILE_MQ = "(max-width: 1024px)";

// Blur final do hero-grid (px). Vai de 0 ate esse valor junto com a opacidade. Maior = mais borrado.
// Fica leve porque so roda no hero-grid (nao na imagem de fundo) e termina com o elemento ja invisivel.
const GRID_END_BLUR = 8;
// Em que ponto o blur COMECA, como fracao da distancia de sumico da opacidade (0 a 1).
// 0 = comeca logo no inicio da rolagem; 0.5 = so comeca na metade; maior = comeca mais tarde.
const GRID_BLUR_START = 0.4;

const BG_ROTATION = 0; // graus, sentido horario (0 = sem giro)
const BG_SCALE = 1; // 1 = sem zoom: o fundo nao cresce, so encolhe
// O "fill" vai de 0 a 1 com a rolagem e as barras DIMINUEM ate sumir, como se a #problema (que sobe
// por cima) estivesse cobrindo o fundo. Comeca quando a #problema entra na tela e termina quando ela
// cobre tudo. Distancia de rolagem (em telas) desse trecho. Menor = some mais rapido.
const BG_FILL_DIST_VH = 1;

// Mobile: a barra de enderecos que some/aparece muda o innerHeight; sem isso o ScrollTrigger recalcula
// tudo no meio da rolagem e o hero "pula/trava".
ScrollTrigger.config({ ignoreMobileResize: true });

export default function useParallaxReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const wrap = document.querySelector(".hero-wrap");
    const bg = document.querySelector(".hero .bg-wrapper");
    const grid = document.querySelector(".hero-grid");
    if (!wrap || !bg || !grid) return;

    const hero = wrap.querySelector(".hero");
    const isMobile = () => window.matchMedia(MOBILE_MQ).matches;
    // Mobile: usa a altura REAL da .hero (100svh no CSS), que NAO muda quando a barra de enderecos
    // some/aparece. window.innerHeight muda nessa hora; se um refresh do ScrollTrigger acontecesse no
    // meio da rolagem, a distancia era recalculada com outro valor e o hero-intro "voltava um pouco".
    const vh = () => (isMobile() && hero?.offsetHeight) || window.innerHeight;
    const gridDist = () => vh() * (isMobile() ? GRID_DIST_VH_MOBILE : GRID_DIST_VH);
    // rolagem extra so com a hero = ponto em que o #problema comeca a entrar
    const extra = () => gridDist() * (isMobile() ? GRID_FADE_AT_REVEAL_MOBILE : GRID_FADE_AT_REVEAL);

    // ---------------------------------------------------------------------------------------
    // MOBILE / TABLET: sem ScrollTrigger, sem scrub, sem canvas redesenhando na rolagem.
    // O hero-intro vira uma funcao PURA de window.scrollY (clamp 0..1): mesmo scrollY = mesma posicao,
    // sempre. Nao existe refresh, recalculo de distancia nem estado acumulado, entao ele nunca
    // "volta" por causa de layout/barra de enderecos. As distancias sao medidas UMA vez (e so
    // remedidas se a LARGURA mudar, ex.: girar o aparelho).
    // O #problema (opaco, z-index maior) cobre o fundo da hero sozinho: nao precisa animar o canvas.
    // ---------------------------------------------------------------------------------------
    if (isMobile()) {
      let dist = 0;
      let rise = 0;
      let coverAt = Infinity;
      let lastHidden = false;
      let lastW = window.innerWidth;
      let lastP = -1;
      let raf = 0;

      const measure = () => {
        // o wrap mede (1 + 0.9075) telas (CSS); a hero e 100lvh, entao nao serve de referencia
        const h = wrap.offsetHeight / (1 + GRID_DIST_VH_MOBILE * GRID_FADE_AT_REVEAL_MOBILE) || window.innerHeight;
        dist = h * GRID_DIST_VH_MOBILE;
        rise = h * GRID_RISE_VH_MOBILE;
        // a partir daqui o #problema ja cobriu a hero inteira: esconde (para de pintar o canvas)
        coverAt = wrap.offsetHeight - 2;
        lastP = -1;
        render();
      };

      // Fade/escala do grid via CSS scroll-driven animation (mobile.css): roda no compositor, sem JS,
      // entao nao atrasa nem "volta" durante a inercia do toque. JS so como fallback.
      const cssDriven = CSS.supports?.("animation-timeline: scroll()");
      if (cssDriven) grid.classList.add("is-css-driven");

      const render = () => {
        raf = 0;
        const hide = window.scrollY >= coverAt;
        if (hide !== lastHidden) {
          lastHidden = hide;
          if (hero) hero.style.visibility = hide ? "hidden" : "";
        }
        if (cssDriven) return;
        const p = Math.min(1, Math.max(0, window.scrollY / dist));
        if (p === lastP) return;
        lastP = p;
        // O scroll vertical base e NATIVO (a .hero rola com a pagina, ver mobile.css); aqui soma o
        // translateY extra (sobe mais rapido que a pagina), alem de
        // opacidade e escala, que nao dependem de sincronia perfeita com o scroll.
        const o = Math.max(0, 1 - p / GRID_OPACITY_FRACTION);
        if (o <= 0) {
          grid.style.opacity = "0";
          grid.style.visibility = "hidden";
          return;
        }
        const sc = 1 - (1 - GRID_END_SCALE_MOBILE) * p;
        grid.style.visibility = "";
        grid.style.opacity = o.toFixed(3);
        grid.style.transform = `translateY(${(-rise * p).toFixed(1)}px) scale(${sc.toFixed(4)})`;
      };

      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(render);
      };
      const onResize = () => {
        if (window.innerWidth !== lastW) {
          lastW = window.innerWidth;
          measure();
        }
      };

      measure();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      window.addEventListener("load", measure);

      return () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", measure);
        grid.classList.remove("is-css-driven");
        grid.style.opacity = "";
        grid.style.visibility = "";
        grid.style.transform = "";
        if (hero) hero.style.visibility = "";
      };
    }

    // mantem o CSS (altura do .hero-wrap) sincronizado com o calculo acima
    const syncWrap = () => wrap.style.setProperty("--hero-extra", `${extra()}px`);
    syncWrap();
    ScrollTrigger.addEventListener("refreshInit", syncWrap);

    const ctx = gsap.context(() => {
      // Fundo: rotacao, escala e fill sao desenhados DENTRO do canvas (resolucao nativa, sem blur).
      // O hook so avisa o estado atual; GradientBarsBackground escuta o evento "gbb-scroll".
      const state = { fill: 0, rotation: 0, scale: 1 };
      const emit = () => window.dispatchEvent(new CustomEvent("gbb-scroll", { detail: { ...state } }));
      emit();

      // giro + escala (mesmo trecho de scroll de antes)
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: () => `+=${extra() + vh()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          state.rotation = BG_ROTATION * self.progress;
          state.scale = 1 + (BG_SCALE - 1) * self.progress;
          emit();
        },
        onRefresh: (self) => {
          state.rotation = BG_ROTATION * self.progress;
          state.scale = 1 + (BG_SCALE - 1) * self.progress;
          emit();
        },
      });

      // fill: as barras diminuem em altura ate sumir, junto com a #problema subindo por cima
      ScrollTrigger.create({
        trigger: wrap,
        start: () => `top+=${extra()} top`,
        end: () => `+=${vh() * BG_FILL_DIST_VH}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          state.fill = self.progress;
          emit();
        },
        onRefresh: (self) => {
          state.fill = self.progress;
          emit();
        },
      });

      // hero-grid: sobe, encolhe e some. UM unico ScrollTrigger/timeline (antes eram 2 scrubs no mesmo
      // elemento, que brigavam no mobile). So transform + opacity: roda na GPU.
      const gridTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${gridDist()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      gridTl.fromTo(
        grid,
        { y: 0, scale: 1 },
        { y: () => -gridDist(), scale: GRID_END_SCALE, duration: 1 },
        0
      );
      // opacidade some mais rapido que o movimento (autoAlpha = opacity + visibility:hidden no fim)
      gridTl.fromTo(grid, { autoAlpha: 1 }, { autoAlpha: 0, duration: GRID_OPACITY_FRACTION }, 0);

      // blur em tween proprio (desligado no mobile: filter em rolagem derruba o fps): comeca mais tarde (GRID_BLUR_START) e termina junto com a opacidade
      if (!window.matchMedia("(max-width: 1024px)").matches) gsap.fromTo(
        grid,
        { filter: "blur(0px)" },
        {
          filter: `blur(${GRID_END_BLUR}px)`,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: () => `top+=${gridDist() * GRID_OPACITY_FRACTION * GRID_BLUR_START} top`,
            end: () => `top+=${gridDist() * GRID_OPACITY_FRACTION} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, wrap);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ScrollTrigger.removeEventListener("refreshInit", syncWrap);
      ctx.revert();
      window.dispatchEvent(new CustomEvent("gbb-scroll", { detail: { fill: 0, rotation: 0, scale: 1 } }));
    };
  }, []);
}