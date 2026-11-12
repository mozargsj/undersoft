import { useEffect, useLayoutEffect, useRef } from "react";

// Hairline Loader (Originkit), convertido de Framer/TSX para JSX puro.
// Uma linha fina enche de 0 a 100%, com regua de marcas e contador grande. Ao terminar, as duas
// metades do painel abrem (cima sobe, baixo desce) e revelam a pagina.
//
// Props:
//   minTime      segundos minimos ate chegar a 100% (a curva de carregamento dura esse tempo)
//   maxTime      segundos TETO desde o inicio da navegacao: passou disso, o loader e forcado a terminar
//   getRealLoad  () => 0..1, quanto do que e critico ja carregou (a barra nunca passa disso)
//   hold         (opcional) true: carrega normal ate 100%, mas NAO abre nem sai. Serve para editar
//   freeze       (opcional) numero 0..1: congela o loader nesse progresso e nunca abre. Serve para editar
//   onReveal     chamado quando os paineis comecam a abrir (libera scroll e animacoes do site)
//   onComplete   chamado quando tudo terminou (fade fora); desmonte o loader aqui

const REVEAL_S = 1.3;
const FADE_S = 0.35;
const INSET = 6;
const TICKS = 11;

function rand(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Curva "orgânica": o progresso avanca aos trancos, como um carregamento de verdade.
function loadCurve(seed, loadS) {
  const r = rand(seed);
  const k = Math.min(1, loadS / 4.4);
  const chunks = [];
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const size = 0.4 + r() * 1.2;
    chunks.push({
      size,
      start: r() * 0.78 * loadS,
      len: (0.25 + r() * 0.9) * k,
    });
    total += size;
  }
  chunks.push({ size: total * 0.12, start: loadS - 0.45 * k, len: 0.45 * k });
  total *= 1.12;
  return (t) => {
    if (t >= loadS) return 1;
    let p = 0;
    for (const c of chunks) {
      const x = Math.min(1, Math.max(0, (t - c.start) / Math.max(1e-3, c.len)));
      p += c.size * x * x * (3 - 2 * x);
    }
    return Math.min(0.999, p / total);
  };
}

const clamp = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const seg = (x, a, b) => clamp((x - a) / Math.max(1e-6, b - a));
const outCubic = (x) => 1 - Math.pow(1 - x, 3);
const inOutQuart = (x) =>
  x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;

const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function HairlineLoader({
  className = "",
  minTime = 3,
  maxTime = 8,
  getRealLoad,
  freeze,
  hold,
  onReveal,
  onComplete,
  background = "#2b0f03",
  textColor = "#FFFFFF",
  fontFamily = '"Geist", ui-sans-serif, system-ui, sans-serif',
}) {
  const rootRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const scaleRef = useRef(null);
  const ruleRef = useRef(null);
  const countRef = useRef(null);
  const numRef = useRef(null);
  const tickRefs = useRef([]);

  // Sempre a versao mais recente das props, sem reiniciar a animacao
  const optsRef = useRef({
    minTime,
    maxTime,
    getRealLoad,
    freeze,
    hold,
    onReveal,
    onComplete,
  });
  useIsoLayoutEffect(() => {
    optsRef.current = {
      minTime,
      maxTime,
      getRealLoad,
      freeze,
      hold,
      onReveal,
      onComplete,
    };
  });

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const loadS = reduced ? 0.6 : Math.max(0.5, optsRef.current.minTime);
    const curve = loadCurve(7, loadS);
    const revealS = reduced ? 0.4 : REVEAL_S;

    let t = 0;
    let progress = 0;
    let revealAt = -1;
    let raf = 0;
    let last = -1;

    const draw = () => {
      const reveal = revealAt < 0 ? 0 : clamp((t - revealAt) / revealS);

      if (scaleRef.current)
        scaleRef.current.style.opacity = String(
          outCubic(seg(t, 0.05, 0.7)) * (1 - seg(reveal, 0, 0.18)),
        );
      if (ruleRef.current)
        ruleRef.current.style.transform = `scaleX(${progress})`;
      if (countRef.current) {
        countRef.current.style.left = `${progress * 100}%`;
        countRef.current.style.transform = `translateX(-${progress * 100}%)`;
      }

      const digits = String(Math.round(progress * 100));
      if (numRef.current && numRef.current.textContent !== digits)
        numRef.current.textContent = digits;

      for (let k = 0; k < TICKS; k++) {
        const tick = tickRefs.current[k];
        if (tick)
          tick.style.opacity = String(
            0.25 +
              0.75 * seg(progress, k / (TICKS - 1) - 0.02, k / (TICKS - 1)),
          );
      }

      const part = inOutQuart(seg(reveal, 0.1, 1));
      if (topRef.current)
        topRef.current.style.transform = `translateY(${-100 * part}%)`;
      if (bottomRef.current)
        bottomRef.current.style.transform = `translateY(${100 * part}%)`;
    };

    draw();

    const tick = (now) => {
      // dt limitado a 0.1s por frame: se o site travar por baixo, o loader desacelera em vez de dar
      // saltos (isso e o que deixa a animacao "travada"). Abaixo de 10fps ele passa a andar mais
      // devagar que o relogio; o teto `maxTime` continua valendo pelo relogio real.
      const dt = last < 0 ? 0 : Math.min(0.1, (now - last) / 1000);
      last = now;
      t += dt;

      if (optsRef.current.freeze != null) {
        progress = clamp(optsRef.current.freeze); // modo edicao: fica parado aqui, nunca abre
      } else if (revealAt < 0) {
        const { getRealLoad: real, maxTime: cap } = optsRef.current;
        // performance.now() conta desde o inicio da navegacao, entao o teto inclui o download do JS
        const forced = performance.now() / 1000 >= cap;
        const realLoad = real ? clamp(real()) : 1;
        const target = forced ? 1 : Math.min(curve(t), realLoad);
        progress = target >= 1 ? 1 : Math.min(target, progress + dt * 1.5);
        if (progress >= 1 && (t >= loadS || forced) && !optsRef.current.hold) {
          revealAt = t;
          optsRef.current.onReveal?.();
        }
      }

      draw();

      if (revealAt >= 0 && t - revealAt >= revealS) {
        root.style.transition = `opacity ${FADE_S}s ease`;
        root.style.opacity = "0";
        root.style.pointerEvents = "none";
        window.setTimeout(() => optsRef.current.onComplete?.(), FADE_S * 1000);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  const small = {
    fontFamily,
    fontSize: "max(10px, 1.3cqh)",
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
  };
  const line = {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    height: 1,
    background: textColor,
  };

  return (
    <div
      ref={rootRef}
      className={`hairline-loader${className ? ` ${className}` : ""}`}
      role="progressbar"
      aria-label="Carregando"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        containerType: "size",
        isolation: "isolate",
      }}
    >
      <div
        ref={topRef}
        className="hairline-loader__panel hairline-loader__panel--top"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "calc(50% + 1px)",
          background,
        }}
      />
      <div
        ref={bottomRef}
        className="hairline-loader__panel hairline-loader__panel--bottom"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          bottom: 0,
          background,
        }}
      />

      <div
        ref={scaleRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, color: textColor, opacity: 0 }}
      >
        {/* `container` e a classe do site (max-width 1300px, centralizado); `hairline-loader__container` e para voce estilizar */}
        <div
          className="container hairline-loader__container"
          style={{
            position: "relative",
            height: "100%",
            boxSizing: "border-box",
            paddingInline: `${INSET}cqw`,
          }}
        >
          <div
            className="hairline-loader__track"
            style={{ position: "relative", height: "100%" }}
          >
            <div style={{ ...line, opacity: 0.18 }} />
            <div
              ref={ruleRef}
              style={{
                ...line,
                transformOrigin: "0 50%",
                transform: "scaleX(0)",
              }}
            />

            {Array.from({ length: TICKS }, (_, k) => (
              <div
                key={k}
                ref={(el) => {
                  tickRefs.current[k] = el;
                }}
                style={{
                  position: "absolute",
                  top: "calc(50% + 0.9cqh)",
                  left: `${(k * 100) / (TICKS - 1)}%`,
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: 0.25,
                  ...small,
                }}
              >
                <div
                  style={{
                    width: 1,
                    height: k % 5 === 0 ? "1.8cqh" : "0.9cqh",
                    background: textColor,
                  }}
                />
                <div style={{ marginTop: "0.9cqh" }}>{k * 10}</div>
              </div>
            ))}

            <div
              ref={countRef}
              style={{
                position: "absolute",
                left: 0,
                bottom: "calc(50% + 1.8cqh)",
                display: "flex",
                alignItems: "flex-start",
                whiteSpace: "nowrap",
                fontFamily,
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                fontSize: "14cqh",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span ref={numRef} />
              <span
                style={{
                  fontSize: "0.3em",
                  fontStyle: "italic",
                  marginTop: "0.2em",
                  marginLeft: "0.08em",
                }}
              >
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}