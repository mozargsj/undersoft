import { useEffect } from "react";

// Entrada dos cards (.ut-mini-card, .ut-modelo-card, .about-card): sobem de baixo com fade.
// - Anima quando o card entra na tela vindo de BAIXO (rolando para baixo).
// - Se o card sai pelo TOPO (voce passou dele), continua visivel: ao voltar nao repete.
// - Se o card sai por BAIXO (voce voltou para secoes anteriores), reseta e anima de novo
//   na proxima vez que descer ate ele.
const SELECTOR = ".ut-mini-card, .ut-modelo-card, .ut-logos-card, .about-card";
const STAGGER_MS = 110;

export default function useCardReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const cards = [...document.querySelectorAll(SELECTOR)];
    if (!cards.length) return undefined;

    // atraso escalonado por posicao dentro do grupo (cards irmaos)
    cards.forEach((el) => {
      const sibs = [...el.parentElement.children].filter((c) => c.matches(SELECTOR));
      const i = sibs.indexOf(el);
      // logos: escalonado por coluna (4 por linha) para a grade nao demorar demais
      const step = el.matches(".ut-logos-card") ? (i % 4) * 90 : i * STAGGER_MS;
      el.style.setProperty("--reveal-delay", `${step}ms`);
      el.classList.add("ut-reveal");
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target;
          if (e.isIntersecting) {
            el.classList.add("is-in");
          } else if (e.boundingClientRect.top > window.innerHeight / 2) {
            // saiu por baixo: volta ao estado inicial para repetir depois
            el.classList.remove("is-in");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    cards.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      cards.forEach((el) => {
        el.classList.remove("ut-reveal", "is-in");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, []);
}