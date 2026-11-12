import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import LangSwitch, { LANGS } from "./LangSwitch";
import { useI18n } from "../i18n/I18nContext";

// `key` aponta para as traducoes em i18n/translations.js (nav.*)
const NAV_LINKS = [
  { href: "#solucao", key: "solution" },
  { href: "#servicos", key: "services" },
  { href: "#processo", key: "process" },
  { href: "#avaliacoes", key: "reviews" },
  { href: "#sobre", key: "about" },
  { href: "#perguntas", key: "faq" },
];

export default function Header() {
  const { t, lang: selectedLang, setLang } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [activeHref, setActiveHref] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 });
  // menu mobile (<= 1024px): hamburguer -> X, o fundo do cabecalho cresce para baixo
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const navLinksRef = useRef(null);
  const anchorRefs = useRef({});

  const moveIndicatorTo = (href) => {
    const container = navLinksRef.current;
    const anchor = anchorRefs.current[href];
    if (!container || !anchor) return;

    const extraPadding = 12;
    requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      const linkRect = anchor.getBoundingClientRect();
      setIndicatorStyle({
        width: linkRect.width + extraPadding * 2,
        transform: `translateX(${linkRect.left - containerRect.left - extraPadding}px)`,
        opacity: 1,
      });
    });
    setActiveHref(href);
  };

  useEffect(() => {
    // Indicador por posicao de scroll (em vez de IntersectionObserver, que deixava passar secoes):
    // - antes da #solucao (hero, problema, etc.) o indicador fica ESCONDIDO;
    // - a partir da #solucao, ativa o ultimo link cuja secao ja passou da linha de leitura (40% da tela);
    // - secoes fora do menu (ex.: integracoes) mantem o ultimo link ativo.
    const LINE = 0.4;
    let current; // undefined = ainda nao calculado, null = escondido, string = href ativo
    let raf = 0;
    let lastY = window.scrollY;
    const desktopMq = window.matchMedia("(min-width: 1025px) and (max-width: 1700px)");

    const hideIndicator = () => {
      setActiveHref(null);
      setIndicatorStyle((st) => ({ ...st, opacity: 0 }));
    };

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setIsScrolled(y > 24);

      // cabecalho sempre fixo e visivel (inclusive em 1025-1700px)
      setNavHidden(false);
      if (Math.abs(y - lastY) > 4) lastY = y;

      const line = window.innerHeight * LINE;
      let next = null;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.href.slice(1));
        if (el && el.getBoundingClientRect().top <= line) next = link.href;
      }
      if (next === current) return;
      current = next;
      if (next) moveIndicatorTo(next);
      else hideIndicator();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      current = undefined; // forca recalcular posicao/largura
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ao trocar de idioma a largura dos links muda: recalcula a posicao/largura do indicador.
  useEffect(() => {
    if (activeHref) moveIndicatorTo(activeHref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLang]);

  // Menu mobile: fecha com Esc, com toque fora do cabecalho e ao passar para o layout desktop.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1025px)");
    const onMq = () => mq.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className={`nav${isScrolled ? " nav-fixed nav-scrolled" : ""}${navHidden ? " nav-hidden" : ""}${menuOpen ? " nav-open" : ""}`}
    >
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label="Undersoft">
          <Logo className="logounder" />
        </a>

        <nav className="nav-links" aria-label={t("header.mainNav")} ref={navLinksRef}>
          <span
            className={`nav-indicator${indicatorStyle.opacity ? " is-visible" : ""}`}
            style={{
              width: indicatorStyle.width,
              transform: indicatorStyle.transform,
            }}
          />
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => (anchorRefs.current[link.href] = el)}
              className={activeHref === link.href ? "active" : ""}
              onClick={() => moveIndicatorTo(link.href)}
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </nav>

        <div className="btnidm">
          <LangSwitch />

          <a className="bntcnheader" href="#contacto">
            {t("header.cta")}
            <span className="stcntt">
              <i className="fa-solid fa-arrow-left" style={{ transform: "rotate(140deg)" }}></i>
            </span>
          </a>
        </div>

        {/* ===== Menu mobile (<= 1024px) =====
            Botao de 3 riscos que vira X + painel que expande DENTRO da pilula do cabecalho
            (o fundo branco cresce em altura). No desktop ambos ficam escondidos pelo CSS. */}
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bars" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className="nav-mobile" id="mobile-menu" inert={!menuOpen}>
          <div className="nav-mobile-inner">
            <nav className="nav-mobile-links" aria-label={t("header.mainNav")}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={activeHref === link.href ? "active" : ""}
                  onClick={closeMenu}
                >
                  {t(`nav.${link.key}`)}
                </a>
              ))}
            </nav>

            <div className="nav-mobile-actions">
              <a className="bntcnheader nav-mobile-cta" href="#contacto" onClick={closeMenu}>
                {t("header.cta")}
                <span className="stcntt">
                  <i className="fa-solid fa-arrow-left" style={{ transform: "rotate(140deg)" }}></i>
                </span>
              </a>

              <div className="nav-mobile-langs" role="group" aria-label={t("header.language")}>
                {LANGS.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    className={`nav-mobile-lang${selectedLang === lang.code ? " is-selected" : ""}`}
                    aria-pressed={selectedLang === lang.code}
                    onClick={() => setLang(lang.code)}
                  >
                    <span className="lang-flag">
                      <img loading="lazy" decoding="async" src={lang.flag} alt="" draggable="false" />
                    </span>
                    <span>{lang.short}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}