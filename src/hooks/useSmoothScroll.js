import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createStopGate, createTouchGate } from "./scrollGate";
import { emitScroll } from "./scrollBus";

gsap.registerPlugin(ScrollTrigger);

// UNICA fonte de rolagem do site. Todas as animacoes (hero, scroll horizontal, pilha de paineis)
// andam 1:1 com ela, entao a velocidade e o "peso" da rolagem sao os mesmos do topo ao rodape.
// Unica excecao: a parada de CHEGADA na secao de scroll horizontal (scrollGate.js).
//
// lerp: quanto menor, mais "deslizante". 0.1 e suave sem dar sensacao de atraso.
const LERP = 0.1;

// Rolagem por clique em links internos: duracao (s) = 0.6 + raiz(distancia)/40, entre MIN e MAX.
// Ex.: ~1000px = 1.4s, ~5000px = 2.4s, rodape -> topo = MAX. Aumente MAX para ficar ainda mais lento.
const ANCHOR_MIN = 1;
const ANCHOR_MAX = 4;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function useSmoothScroll() {
  useEffect(() => {
    // Links internos (#solucao, #servicos...): rola ate a secao SEM escrever o #hash na URL.
    // `lenis` fica null com movimento reduzido, e ai usa a rolagem nativa.
    let lenis = null;
    const onAnchorClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      e.preventDefault(); // nunca deixa o navegador mexer na URL
      if (!id) return; // href="#" solto: nao faz nada
      const target = id === "top" ? 0 : document.getElementById(id);
      if (target === null) return;
      if (lenis) {
        // Rolagem por clique (logo, menu, botoes): duracao proporcional a distancia, com easing
        // de entrada e saida. O lerp padrao anda uma fracao fixa por quadro, entao em distancias
        // longas (rodape -> topo) ficava rapido demais. A roda do mouse nao passa por aqui.
        const toY = target === 0 ? 0 : target.getBoundingClientRect().top + lenis.scroll;
        const dist = Math.abs(toY - lenis.scroll);
        const duration = Math.min(ANCHOR_MAX, Math.max(ANCHOR_MIN, 0.6 + Math.sqrt(dist) / 40));
        lenis.scrollTo(target, { duration, easing: easeInOutCubic });
      }
      else if (target === 0) window.scrollTo({ top: 0, behavior: "smooth" });
      else target.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onAnchorClick);
    const removeAnchor = () => document.removeEventListener("click", onAnchorClick);

    // Reload: o navegador restaura com a pagina ainda curta (pins, fontes e imagens ainda nao
    // entraram) e cai no topo. Entao salvamos o scrollY, escondemos a pagina (html.is-restoring, ver index.html), pulamos 1 vez
    // quando tudo carregou e so entao mostramos: nada de ver o hero e depois o corte.
    const KEY = "undersoft:scrollY";
    history.scrollRestoration = "manual";
    const navType = performance.getEntriesByType("navigation")[0]?.type;
    const saved = navType === "reload" || navType === "back_forward" ? Number(sessionStorage.getItem(KEY)) || 0 : 0;
    // Chegada vinda das paginas legais (ex.: /#contacto): vai ate a secao apos o carregamento
    const hashId = !saved && location.hash.length > 1 ? decodeURIComponent(location.hash.slice(1)) : "";
    let canSave = !saved && !hashId; // so salva depois de restaurar, senao o 0 do load apagaria o valor
    let cancelled = false;
    const reveal = () =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => document.documentElement.classList.remove("is-restoring")),
      );
    const restore = () => {
      if (cancelled) return;
      canSave = true;
      if (hashId) {
        const target = hashId === "top" ? 0 : document.getElementById(hashId);
        if (target !== null) {
          ScrollTrigger.refresh();
          const y = target === 0 ? 0 : target.getBoundingClientRect().top + (lenis ? lenis.scroll : window.scrollY);
          if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
          else window.scrollTo({ top: y, behavior: "instant" });
        }
        history.replaceState(null, "", location.pathname + location.search); // sem #hash na URL
      } else if (saved && window.scrollY <= 4) {
        ScrollTrigger.refresh();
        const y = Math.min(saved, document.documentElement.scrollHeight - window.innerHeight);
        if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
        else window.scrollTo({ top: y, behavior: "instant" });
      }
      reveal(); // a pagina so aparece (fade) depois de estar na posicao certa
    };
    const onLoad = () => document.fonts.ready.then(restore);
    if (saved || hashId) {
      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad, { once: true });
    }
    const save = () => canSave && sessionStorage.setItem(KEY, Math.round(window.scrollY));
    window.addEventListener("pagehide", save);
    document.addEventListener("visibilitychange", save);
    const stopRestore = () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      window.removeEventListener("pagehide", save);
      document.removeEventListener("visibilitychange", save);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        removeAnchor();
        stopRestore();
      };
    }

    const stopGate = createStopGate({ getLenis: () => lenis, lerp: LERP });

    lenis = new Lenis({
      lerp: LERP,
      // parada de chegada nas secoes fixas (ver scrollGate.js)
      virtualScroll: stopGate,
      smoothWheel: true,
      // enquanto carrega e dentro de dialogos abertos, quem rola e o navegador
      prevent: (node) =>
        document.documentElement.classList.contains("is-loading") || !!node.closest?.("dialog"),
    });

    lenis.on("scroll", (l) => {
      ScrollTrigger.update();
      emitScroll(l.scroll);
    });
    // mesma parada de chegada/saida para o DEDO (no toque a rolagem e nativa e nao passa pelo virtualScroll)
    const stopTouchGate = createTouchGate({ getLenis: () => lenis });

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      removeAnchor();
      stopRestore();
      stopTouchGate();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
    };
  }, []);
}