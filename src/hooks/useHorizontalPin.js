import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerStopZone, setTouchGateBypass } from "./scrollGate";

gsap.registerPlugin(ScrollTrigger);

// Section fixa na tela + rolagem horizontal dos cards.
//
// Enquanto a section ocupa a tela toda, o titulo (.pt-head) fica parado e a rolagem vertical
// vira deslocamento horizontal da faixa de cards, 1:1 (1px de rolagem = 1px de movimento),
// no mesmo ritmo do resto da pagina. Quando o ultimo card aparece por completo, a section
// solta e a pagina segue. Nao ha paradas nem freios: e so rolagem continua.
//
// Vale no desktop e no mobile, so sem "reduzir movimento". Com ele ligado, a faixa continua com a
// rolagem horizontal nativa (overflow-x).
export default function useHorizontalPin(sectionRef, viewportRef, trackRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return undefined;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      section.classList.add("pt-hpin");

      // quanto a faixa precisa andar para o ultimo card aparecer inteiro
      const distance = () => Math.max(0, track.offsetWidth - viewport.clientWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          // scrub: true = faixa 1:1 com a rolagem, sem atraso. Um scrub numerico (ex.: 0.45) faz a faixa
          // chegar atrasada na entrada (trava) e continuar deslizando depois da saida (pulada). A
          // suavidade ja vem do Lenis, que e quem move a rolagem.
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // chegada: um scroll longo nao atravessa a secao, so um gesto novo comeca a horizontal
      const st = tween.scrollTrigger;
      const unregister = registerStopZone(() => ({ start: st.start, end: st.end }));

      // Arrasto horizontal com o dedo na faixa (celular/tablet): 1px de arrasto = 1px de rolagem da pagina,
      // que o ScrollTrigger converte em deslocamento da faixa. Arrasto vertical segue a rolagem nativa.
      // Fica preso entre o inicio e o fim da section (nao "sai" dela arrastando de lado).
      const clampY = (y) => Math.min(st.end, Math.max(st.start, y));
      const setY = (y) => window.scrollTo({ top: clampY(y), behavior: "instant" });
      let drag = null;
      let inertia = null;
      let bypassTimer = 0;

      const stopInertia = () => {
        if (inertia) gsap.ticker.remove(inertia);
        inertia = null;
      };
      const endBypass = () => {
        clearTimeout(bypassTimer);
        bypassTimer = setTimeout(() => setTouchGateBypass(false), 60);
      };

      const onTouchStart = (e) => {
        stopInertia();
        drag = null;
        if (e.touches.length !== 1) return;
        const y = window.scrollY;
        if (y < st.start - 2 || y > st.end + 2) return; // fora da faixa fixa: nada a arrastar
        const t = e.touches[0];
        drag = { x0: t.clientX, y0: t.clientY, s0: y, mode: null, lastX: t.clientX, lastT: e.timeStamp, v: 0 };
      };

      const onTouchMove = (e) => {
        if (!drag) return;
        const t = e.touches[0];
        const dx = t.clientX - drag.x0;
        const dy = t.clientY - drag.y0;
        if (!drag.mode) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
          drag.mode = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
          if (drag.mode === "h") {
            clearTimeout(bypassTimer);
            setTouchGateBypass(true);
          }
        }
        if (drag.mode !== "h") return;
        setY(drag.s0 - dx);
        const dt = e.timeStamp - drag.lastT;
        if (dt > 0) drag.v = 0.8 * drag.v + 0.2 * ((drag.lastX - t.clientX) / dt); // px de rolagem por ms
        drag.lastX = t.clientX;
        drag.lastT = e.timeStamp;
      };

      const onTouchEnd = (e) => {
        if (!drag || drag.mode !== "h") {
          drag = null;
          return;
        }
        // soltou parado: sem inercia
        let v = e.timeStamp - drag.lastT > 80 ? 0 : drag.v;
        drag = null;
        if (Math.abs(v) < 0.05) {
          endBypass();
          return;
        }
        let pos = window.scrollY;
        let last = performance.now();
        inertia = () => {
          const now = performance.now();
          const dt = Math.min(48, now - last);
          last = now;
          pos = clampY(pos + v * dt);
          v *= Math.pow(0.94, dt / 16.67);
          window.scrollTo({ top: pos, behavior: "instant" });
          if (Math.abs(v) < 0.02 || pos <= st.start || pos >= st.end) {
            stopInertia();
            endBypass();
          }
        };
        gsap.ticker.add(inertia);
      };

      const tOpts = { passive: true };
      viewport.addEventListener("touchstart", onTouchStart, tOpts);
      viewport.addEventListener("touchmove", onTouchMove, tOpts);
      viewport.addEventListener("touchend", onTouchEnd, tOpts);
      viewport.addEventListener("touchcancel", onTouchEnd, tOpts);

      return () => {
        viewport.removeEventListener("touchstart", onTouchStart);
        viewport.removeEventListener("touchmove", onTouchMove);
        viewport.removeEventListener("touchend", onTouchEnd);
        viewport.removeEventListener("touchcancel", onTouchEnd);
        stopInertia();
        clearTimeout(bypassTimer);
        setTouchGateBypass(false);
        unregister();
        section.classList.remove("pt-hpin");
        gsap.set(track, { clearProps: "transform" });
      };
    });

    // fontes/imagens mudam alturas acima da section: recalcula as posicoes
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready?.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [sectionRef, viewportRef, trackRef]);
}