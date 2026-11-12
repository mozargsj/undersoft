import { useEffect } from "react";
import { gsap } from "gsap";

// "Sticky suave": substitui o position:sticky de .ut-criterio-text e .ut-modelo-text (desktop).
// O sticky nativo para de forma seca ao chegar no fim do container. Aqui o bloco acompanha a
// rolagem com easing (lerp), entao a chegada no fim do container (descendo) e no topo (subindo)
// desacelera suavemente em vez de travar.
const SELECTOR = ".ut-criterio-text, .ut-modelo-text";
const TOP = 120; // mesma distancia do topo que o sticky antigo usava
const EASE = 0.15; // menor = mais suave/lento

export default function useSmoothSticky() {
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = [...document.querySelectorAll(SELECTOR)].map((el) => ({ el, y: 0 }));
    if (!items.length) return undefined;

    const reset = () => items.forEach((it) => { it.y = 0; it.el.style.transform = ""; });

    const tick = (_t, deltaMs) => {
      if (!mq.matches || reduce.matches) return;
      // easing independente de FPS
      const k = 1 - Math.pow(1 - EASE, (deltaMs || 16.7) / 16.7);
      for (const it of items) {
        const parent = it.el.parentElement;
        const pr = parent.getBoundingClientRect();
        const max = Math.max(0, parent.offsetHeight - it.el.offsetHeight);
        const target = Math.min(max, Math.max(0, TOP - pr.top));
        const next = it.y + (target - it.y) * k;
        it.y = Math.abs(target - next) < 0.05 ? target : next;
        it.el.style.transform = `translate3d(0, ${it.y.toFixed(2)}px, 0)`;
      }
    };

    gsap.ticker.add(tick);
    mq.addEventListener("change", reset);
    return () => {
      gsap.ticker.remove(tick);
      mq.removeEventListener("change", reset);
      reset();
    };
  }, []);
}
