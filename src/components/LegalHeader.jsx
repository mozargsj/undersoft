import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import LangSwitch, { LANGS } from "./LangSwitch";
import { useI18n } from "../i18n/I18nContext";

// Cabecalho das paginas legais e de obrigado.
// Usa a MESMA estrutura e as MESMAS classes do cabecalho da home (Header.jsx), sempre no estado "rolado"
// (pilula branca), mas sem os links de ancora: no desktop mostra o seletor de idioma + botao "Voltar";
// no mobile (<= 1024px) mostra o hamburguer, e o menu tem os idiomas + botao "Voltar".
export default function LegalHeader() {
  const { t, lang: selectedLang, setLang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

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

  return (
    <header
      ref={headerRef}
      className={`nav nav-fixed nav-scrolled lg-nav${menuOpen ? " nav-open" : ""}`}
    >
      <div className="container nav-inner">
        <a href="/" className="brand" aria-label={t("header.backHomeAria")}>
          <Logo className="logounder" />
        </a>

        <div className="btnidm">
          <LangSwitch />

          <a className="bntcnheader lg-nav-back" href="/">
            <i className="fa-solid fa-arrow-left lg-nav-back-icon"></i>
            {t("header.backHome")}
          </a>
        </div>

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
            <div className="nav-mobile-actions">
              <a className="bntcnheader nav-mobile-cta lg-nav-back" href="/">
                <i className="fa-solid fa-arrow-left lg-nav-back-icon"></i>
                {t("header.backHome")}
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