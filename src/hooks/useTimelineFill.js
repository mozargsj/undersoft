import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Preenchimento da linha do tempo (.pt-cards) conforme a rolagem.
//
// O progresso e lido da POSICAO REAL da faixa (rect), entao funciona igual com o pin horizontal do
// desktop (transform do GSAP) e com a rolagem nativa do mobile (scrollLeft), sem depender do
// useHorizontalPin.
//
//  fase 1 (a section entra na tela): a linha preenche ate o centro do 1o icone
//  fase 2 (a faixa anda):            a linha segue ate o centro do ultimo icone (90% do trajeto)
//                                     e termina de preencher o restante nos 10% finais
//
// Cada card recebe `is-on` quando a linha passa pelo centro do seu icone (e perde ao voltar), e
// `is-pinged` uma unica vez, que dispara o radar (nunca mais repete).
export default function useTimelineFill(sectionRef, scrollRef, trackRef, cardsRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const viewport = scrollRef.current;
    const track = trackRef.current;
    const cards = cardsRef.current;
    if (!section || !viewport || !track || !cards) return undefined;

    const cardEls = Array.from(cards.querySelectorAll(".pt-card"));
    // --pt-fill so nos 2 elementos que usam (e nao em .pt-cards): evita recalcular o estilo de todos os cards a cada frame
    const fillEl = cards.querySelector(".pt-connector-fill");
    const dotEl = cards.querySelector(".pt-dot");
    const fillTargets = [fillEl, dotEl].filter(Boolean);
    // nao roda (nem le layout) enquanto a section esta longe da tela
    let active = true;
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; if (active) { lastKey = ""; update(); } }, { rootMargin: "60% 0px" });
    io.observe(section);
    // pre-aquecimento: classe so enquanto a section esta a ate ~2 telas (o css promove os cards a camada
    // antes do gesto; sai ao longe para nao manter camadas desnecessarias)
    const warmIo = new IntersectionObserver(([e]) => section.classList.toggle("pt-warm", e.isIntersecting), { rootMargin: "200% 0px" });
    warmIo.observe(section);
    let centers = [];
    let fullWidth = 0;
    let lastKey = "";

    const measure = () => {
      centers = cardEls.map((card) => {
        const icon = card.querySelector(".pt-icon");
        return card.offsetLeft + icon.offsetLeft + icon.offsetWidth / 2;
      });
      // a linha termina no centro do ultimo icone (antes era 90% fixo da largura, que deixava o
      // ultimo icone fora da linha quando o espacamento entre cards aumentava)
      const lastCenter = centers[centers.length - 1];
      cards.style.setProperty("--pt-line-end", `${lastCenter}px`);
      fullWidth = lastCenter;
      lastKey = "";
    };

    const clamp01 = (v) => Math.min(1, Math.max(0, v));

    const update = () => {
      if (!centers.length || !active) return;
      const vh = window.innerHeight;
      const pinned = section.classList.contains("pt-hpin");

      // fase 2: deslocamento da faixa. Com pin vem direto do x do GSAP (sem ler layout); sem pin, do scrollLeft
      const travel = Math.max(1, track.offsetWidth - viewport.clientWidth);
      const moved = pinned ? -Number(gsap.getProperty(track, "x")) || 0 : viewport.scrollLeft;
      const t = clamp01(moved / travel);

      // fase 1: entrada da section (so le o rect enquanto a faixa ainda nao andou)
      let pre = 1;
      if (t <= 0) {
        const top = section.getBoundingClientRect().top;
        const preStart = vh * 0.7;
        const preEnd = pinned ? 0 : vh * 0.25;
        pre = clamp01((preStart - top) / (preStart - preEnd));
      }

      const first = centers[0];
      const last = centers[centers.length - 1];
      let front;
      if (t <= 0) {
        front = first * pre;
      } else {
        const main = clamp01(t / 0.9);
        front = first + main * (last - first);
        if (t > 0.9) front += ((t - 0.9) / 0.1) * (fullWidth - last);
      }
      front = Math.min(front, fullWidth);

      const key = front.toFixed(1);
      if (key === lastKey) return;
      lastKey = key;

      fillTargets.forEach((el) => el.style.setProperty("--pt-fill", `${front}px`));
      // bolinha: invisivel antes de a linha comecar a preencher e ao chegar no fim da linha
      const dotOn = front > 0.5 && front < fullWidth - 0.5 ? 1 : 0;
      dotEl?.style.setProperty("--pt-fill-n", String(dotOn));
      cardEls.forEach((card, i) => {
        const on = front >= centers[i] - 1;
        card.classList.toggle("is-on", on);
        card.classList.toggle("is-pinged", on);
      });
    };

    measure();
    update();

    // ticker do gsap roda todo frame, depois do Lenis/ScrollTrigger: acompanha o pin sem atraso
    gsap.ticker.add(update);
    const onRefresh = () => {
      measure();
      update();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);
    window.addEventListener("resize", onRefresh);
    document.fonts?.ready?.then(onRefresh);

    return () => {
      io.disconnect();
      warmIo.disconnect();
      section.classList.remove("pt-warm");
      gsap.ticker.remove(update);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      window.removeEventListener("resize", onRefresh);
    };
  }, [sectionRef, scrollRef, trackRef, cardsRef]);
}