import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";

// PLACEHOLDER: textos, nomes e cargos abaixo são provisórios.
// Substituir por avaliações reais (com autorização do cliente) antes de publicar.
// `image`: caminho da foto de perfil (ex.: "/avaliacoes/maria.webp", na pasta /public).
// Se for null/omitido, aparece só a sigla (iniciais do nome).
const REVIEWS = [
  {
    image: "public/avaliacoes/geocatia.webp",
  },
  {
    image: "public/avaliacoes/karol.webp",
  },
  {
    image: "public/avaliacoes/lucas.webp",
  },
  {
     image: "public/avaliacoes/robert.webp",
  },
  {
    image: null,
  },
  {
    image: "public/avaliacoes/tomas.webp",
  },
];

const AUTOPLAY_MS = 5000;

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Quantos cards aparecem de cada vez, conforme a largura da tela.
// Mobile/tablet (ate 1024px): UM card por vez, com setas + dots embaixo. Desktop: dois.
function getPerView() {
  if (typeof window === "undefined") return 2;
  if (window.matchMedia("(max-width: 1024px)").matches) return 1;
  return 2;
}

export default function ReviewsSection() {
  const { t } = useI18n();
  const texts = t("reviews.items");
  const [perView, setPerView] = useState(getPerView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sliderRef = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const viewportRef = useRef(null);
  const dragStart = useRef(null);

  const maxIndex = Math.max(0, REVIEWS.length - perView);
  // Se a tela mudar e o índice passar do limite, limita na hora de renderizar.
  const current = Math.min(index, maxIndex);

  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Só liga o rolamento automático quando o slide está visível na tela.
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const next = useCallback(
    () => setIndex((i) => (Math.min(i, maxIndex) >= maxIndex ? 0 : Math.min(i, maxIndex) + 1)),
    [maxIndex]
  );
  const prev = useCallback(
    () => setIndex((i) => (Math.min(i, maxIndex) <= 0 ? maxIndex : Math.min(i, maxIndex) - 1)),
    [maxIndex]
  );

  // Rolamento automático (reinicia a contagem a cada mudança de slide).
  useEffect(() => {
    if (!inView || paused || dragging) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [current, inView, paused, dragging, next]);

  // Arrastar / deslizar com o dedo ou o rato.
  const onPointerDown = (event) => {
    if (event.target.closest("button")) return;
    dragStart.current = event.clientX;
    setDragging(true);
    viewportRef.current?.setPointerCapture?.(event.pointerId);
  };
  const onPointerMove = (event) => {
    if (dragStart.current === null) return;
    setDragOffset(event.clientX - dragStart.current);
  };
  const endDrag = () => {
    if (dragStart.current === null) return;
    const width = viewportRef.current?.offsetWidth || 1;
    const threshold = Math.min(80, width * 0.12);
    if (dragOffset <= -threshold) next();
    else if (dragOffset >= threshold) prev();
    dragStart.current = null;
    setDragOffset(0);
    setDragging(false);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") prev();
  };

  const trackStyle = {
    "--per-view": perView,
    transform: `translateX(calc(${current} * (100% + var(--gap)) / var(--per-view) * -1 + ${dragOffset}px))`,
  };

  return (
    <section id="avaliacoes" className="ut-scope">
      <div className="container">
        <div className="ut-escopo-head">
          <div className="pt-eyebrow">
            <span className="pt-eyebrow-arrow"><i className="fa-solid fa-play"></i></span>
            {t("reviews.eyebrow")}
          </div>
          <h2 className="pt-title">{t("reviews.title")}</h2>
          <p className="sbttl">{t("reviews.text")}</p>
        </div>

        <div
          className="ut-review-slider"
          ref={sliderRef}
          role="region"
          aria-roledescription={t("reviews.carousel")}
          aria-label={t("reviews.regionLabel")}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          

          <div
            className={`ut-review-viewport${dragging ? " is-dragging" : ""}`}
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div className="ut-review-track" style={trackStyle}>
              {REVIEWS.map((review, i) => {
                const visible = i >= current && i < current + perView;
                return (
                  <figure
                    className="ut-mini-card ut-review-card"
                    key={i}
                    aria-hidden={!visible}
                  >
                    <div className="ut-review-stars" aria-label={t("reviews.stars")}>
                      {[0, 1, 2, 3, 4].map((star) => (
                        <i className="fa-solid fa-star" key={star} aria-hidden="true"></i>
                      ))}
                    </div>
                    <blockquote>
                      <p>{texts[i].quote}</p>
                    </blockquote>
                    <figcaption className="ut-review-author">
                      <span className="ut-mini-icon ut-review-avatar">
                        {review.image ? (
                          <img
                            src={review.image}
                            alt={texts[i].name}
                            loading="lazy"
                            decoding="async"
                            draggable="false"
                          />
                        ) : (
                          getInitials(texts[i].name)
                        )}
                      </span>
                      <span className="ut-review-meta">
                        <strong>{texts[i].name}</strong>
                        <span>{texts[i].role}</span>
                      </span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>

          
        </div>

        {/* Controles: no desktop so os dots aparecem (setas ficam nas laterais do slider).
            No mobile: seta esquerda | dots | seta direita, numa linha embaixo do card. */}
        <div className="ut-review-controls">
          <button
            type="button"
            className="ut-review-arrow ut-review-arrow--ctrl"
            onClick={prev}
            aria-label={t("reviews.prev")}
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>

          <div className="ut-review-dots" role="tablist" aria-label={t("reviews.pickLabel")}>
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                type="button"
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={t("reviews.goTo", { n: i + 1 })}
                className={`ut-review-dot${i === current ? " is-active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="ut-review-arrow ut-review-arrow--ctrl"
            onClick={next}
            aria-label={t("reviews.next")}
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>
  );
}