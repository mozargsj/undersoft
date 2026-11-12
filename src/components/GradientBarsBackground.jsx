import { useEffect, useRef, useState } from "react";

// Barras do fundo da hero em CSS puro (mobile e desktop). A entrada (onda) e o pulso sao animacoes de
// transform, que rodam no compositor: comecam no instante em que a hero monta, sem depender da thread
// principal (ocupada montando a pagina). Estilos em undersoft.css (".gbb-*").
// A rolagem (barras que diminuem ate sumir) continua vindo do evento "gbb-scroll" (useParallaxReveal.js).

const MOBILE_MQ = "(max-width: 1024px)";

// mesma formula de altura usada desde o canvas
const barHeight = (index, total, minHeight) => {
  const position = total > 1 ? index / (total - 1) : 0.5;
  const d = Math.abs(position - 0.5);
  return (minHeight + (100 - minHeight) * Math.pow(d * 2, 1.2)).toFixed(2);
};

export default function GradientBarsBackground({
  color = "rgb(255, 60, 0)",
  backgroundColor = "#1a1410",
  numBars: numBarsDesktop = 15,
  mobileNumBars = 8, // so no mobile (<= 1024px)
  minHeight = 30,
  duration = 1.7, // periodo do pulso (s)
  stagger = 0.1, // atraso do pulso entre barras (s)
  desktopDelay = 0.3, // pequeno atraso (s) antes do fundo aparecer no desktop; no mobile e 0
}) {
  const barsRef = useRef(null);
  const rowRef = useRef(null);

  // quantidade de barras: 15 no desktop, 8 no mobile (acompanha a mudanca de breakpoint)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_MQ).matches);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const numBars = isMobile ? mobileNumBars : numBarsDesktop;

  // Rolagem: as barras diminuem ate sumir (fill 0 a 1). Como todas ancoram embaixo, basta escalar a
  // linha inteira em Y. rotation/scale (se usados no hook) viram transform do container.
  useEffect(() => {
    const onScrollState = (e) => {
      const d = e.detail || {};
      const fill = Math.min(1, Math.max(0, d.fill ?? 0));
      const rot = d.rotation ?? 0;
      const sc = d.scale ?? 1;
      if (barsRef.current) barsRef.current.classList.toggle("gbb-paused", fill >= 1);
      if (rowRef.current) rowRef.current.style.transform = fill ? `scaleY(${1 - fill})` : "";
      if (barsRef.current) barsRef.current.style.transform = rot || sc !== 1 ? `rotate(${rot}deg) scale(${sc})` : "";
    };
    window.addEventListener("gbb-scroll", onScrollState);
    return () => window.removeEventListener("gbb-scroll", onScrollState);
  }, []);

  return (
    <div aria-hidden="true" style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <div
        ref={barsRef}
        className="gbb-bars"
        style={{
          "--gbb-bg": backgroundColor,
          "--gbb-color": color,
          "--gbb-d": `${isMobile ? 0 : desktopDelay}s`,
          "--gbb-pdur": `${duration}s`,
          "--gbb-pstag": `${stagger}s`,
        }}
      >
        <div ref={rowRef} className="gbb-row">
          {Array.from({ length: numBars }, (_, i) => (
            <div
              key={i}
              className="gbb-bar"
              style={{ "--i": i, "--h": `${barHeight(i, numBars, minHeight)}%` }}
            >
              <i />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}