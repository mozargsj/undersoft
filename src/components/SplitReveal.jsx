import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Animacao de texto extraida da pagina de manutencao: o texto e dividido em letras e cada
// uma sobe (y 40 -> 0) com fade, em cascata (power3.out). Aqui ela dispara ao entrar na tela.
//
// Uso: <SplitReveal as="h2" className="pt-title">Meu titulo</SplitReveal>
//  - children podem ter spans/<br/> (ex.: .pt-highlight); so o texto e dividido.
//  - elementos dentro de `ignore` (padrao .rotator) nao sao divididos, mas entram animados
//    como um bloco (o texto deles e controlado pelo React, entao nao pode ser reescrito).
//  - subtitulos longos: o intervalo entre letras diminui para a cascata nao passar de maxStagger.
const SplitReveal = ({
  as: Tag = "p",
  className = "",
  children,
  delay = 40, // ms entre letras
  startDelay = 0, // s antes de comecar
  duration = 1.1,
  ease = "power3.out",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  start = "top 92%",
  maxStagger = 1.2, // s: duracao maxima da cascata
  ignore = ".rotator",
  ...rest
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const show = () => el.classList.add("split-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return undefined;
    }

    let split = null;
    let tween = null;
    let cancelled = false;
    let observer = null;

    const run = () => {
      if (cancelled) return;
      try {
        split = new SplitText(el, {
          type: "chars",
          tag: "span",
          smartWrap: true,
          charsClass: "split-char",
          wordsClass: "split-word",
          reduceWhiteSpace: false,
          ignore,
        });
        const extras = ignore ? Array.from(el.querySelectorAll(ignore)) : [];
        const targets = [...extras, ...split.chars];
        const stagger = Math.min(delay / 1000, maxStagger / Math.max(targets.length, 1));
        tween = gsap.fromTo(targets, { ...from }, {
          ...to,
          duration,
          ease,
          delay: startDelay,
          stagger,
          willChange: "transform, opacity",
          force3D: true,
          scrollTrigger: { trigger: el, start, once: true },
        });
        show(); // chars ja estao no estado inicial (opacity 0): pode revelar o elemento
      } catch (_) {
        show();
      }
    };

    // espera fontes e o loader da pagina (html.is-loading) antes de medir/dividir
    const root = document.documentElement;
    const whenReady = () => {
      if (cancelled) return;
      if (root.classList.contains("is-loading")) {
        observer = new MutationObserver(() => {
          if (!root.classList.contains("is-loading")) {
            observer.disconnect();
            observer = null;
            run();
          }
        });
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });
      } else {
        run();
      }
    };
    // setTimeout 0: o App adiciona a classe is-loading num effect que roda depois dos filhos
    const timer = setTimeout(() => {
      (document.fonts?.ready ?? Promise.resolve()).then(whenReady);
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer?.disconnect();
      tween?.scrollTrigger?.kill();
      tween?.kill();
      try {
        split?.revert();
      } catch (_) {
        /* noop */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={`split-reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};

export default SplitReveal;
