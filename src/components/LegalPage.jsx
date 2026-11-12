import { useEffect, useMemo, useRef, useState } from "react";
import LegalHeader from "./LegalHeader";
import Footer from "./Footer";
import LegalDocument from "../legal/LegalDocument";
import { getDoc, getDocList } from "../legal/content";
import { useI18n } from "../i18n/I18nContext";

function Toc({ doc, activeId }) {
  return (
    <ol className="lg-toc-list">
      {doc.sections.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className={activeId === s.id ? "is-active" : ""}>
            <span>{i + 1}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

// Indice "sticky" maior que a tela: acompanha o scroll ate mostrar o fim,
// e ao rolar para cima volta a mostrar o topo (sem scroll proprio).
function useSmartSticky(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const gap = 24; // folga inferior
    let offsetTop = parseFloat(getComputedStyle(el).top) || 120;
    let top = offsetTop;
    let lastY = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const d = y - lastY;
      lastY = y;
      const min = Math.min(offsetTop, window.innerHeight - el.offsetHeight - gap);
      top = y <= 0 ? offsetTop : Math.max(min, Math.min(offsetTop, top - d));
      el.style.top = `${top}px`;
    };
    const onResize = () => {
      el.style.top = "";
      offsetTop = parseFloat(getComputedStyle(el).top) || 120;
      top = offsetTop;
      lastY = window.scrollY;
      update();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      el.style.top = "";
    };
  }, [ref]);
}

export default function LegalPage({ doc: baseDoc }) {
  const { t, lang } = useI18n();
  const doc = useMemo(() => getDoc(baseDoc.id, lang), [baseDoc.id, lang]);
  const tocRef = useRef(null);
  useSmartSticky(tocRef);
  const [activeId, setActiveId] = useState(doc.sections[0].id);

  useEffect(() => {
    document.title = `${doc.title} | Undersoft`;
  }, [doc]);

  // destaca no indice a secao que esta a ser lida
  useEffect(() => {
    const els = doc.sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!("IntersectionObserver" in window) || !els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [doc]);

  const others = getDocList(lang).filter((d) => d.id !== doc.id);

  return (
    <>
      <LegalHeader />

      <main className="lg-page">
        <div className="container">
          <div className="lg-hero">
            
            <h2 className="pt-title">{doc.title}</h2>
            <p className="lg-hero-sub">{doc.subtitle}</p>
            <p className="lg-hero-meta">{t("termsDialog.lastUpdated")} {doc.updated}</p>
          </div>

          <div className="lg-layout">
            <aside className="lg-toc" ref={tocRef} aria-label={t("legalPage.tocAria")}>
              <p className="lg-toc-title">{t("legalPage.toc")}</p>
              <Toc doc={doc} activeId={activeId} />
            </aside>

            <div className="lg-main">
              <details className="lg-toc-mobile">
                <summary>{t("legalPage.toc")}</summary>
                <Toc doc={doc} activeId={activeId} />
              </details>

              <article className="lg-card">
                <LegalDocument doc={doc} />
              </article>

              <nav className="lg-others" aria-label={t("legalPage.othersAria")}>
                <p className="lg-toc-title">{t("legalPage.others")}</p>
                <div className="lg-others-grid">
                  {others.map((d) => (
                    <a key={d.id} href={d.path} className="lg-other">
                      <span>{d.short}</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </main>

      <Footer home={false} />
    </>
  );
}