import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { LANGS } from "../i18n/translations";
import Logo from "./Logo";
import { EMAIL, PHONE, SOCIALS } from "./socials";
import { COMPLAINTS_URL, LEGAL_PAGES } from "../legal/company";
import { openCookieSettings } from "../lib/consent";

const NAV_LINKS = [
  { href: "#top", key: "home" },
  { href: "#solucao", key: "solution" },
  { href: "#servicos", key: "services" },
  { href: "#processo", key: "process" },
  { href: "#sobre", key: "about" },
  { href: "#perguntas", key: "faq" },
  { href: "#contacto", key: "contact" },
];

// home=false (paginas legais): os links de ancora apontam para a pagina inicial ("/#secao")
export default function Footer({ home = true }) {
  const anchor = (href) => (home ? href : `/${href}`);
  const year = new Date().getFullYear();
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang: selectedLang, setLang } = useI18n();
  const langRef = useRef(null);
  const giantRef = useRef(null);
  const currentLang = LANGS.find((l) => l.code === selectedLang);

  // Mobile: ajusta o tamanho da fonte para o "UNDERSOFT" ocupar sempre 100% da largura
  useEffect(() => {
    const box = giantRef.current;
    const span = box && box.firstElementChild;
    if (!box || !span) return;
    const mq = window.matchMedia("(max-width: 1024px)");
    const fit = () => {
      if (!mq.matches) { span.style.fontSize = ""; return; }
      span.style.fontSize = "100px";
      const w = span.scrollWidth;
      if (w > 0) span.style.fontSize = (100 * box.clientWidth / w) + "px";
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts && document.fonts.ready.then(fit);
    mq.addEventListener("change", fit);
    return () => { ro.disconnect(); mq.removeEventListener("change", fit); };
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <footer className="ut-footer">
      <div className="container">
        <div className="ut-footer-head">
          <Logo className="ut-footer-logo" />
          <p className="ut-footer-tagline">{t("footer.tagline")}</p>
        </div>

        <div className="ut-footer-main">
          <div className="ut-footer-cols">
            <div className="ut-footer-col">
              <h5>{t("footer.navigation")}</h5>
              <div className="ut-footer-links">
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={anchor(link.href)}>{t(`nav.${link.key}`)}</a>
                ))}
              </div>
            </div>

            <div className="ut-footer-col">
              <h5>{t("footer.institutional")}</h5>
              <div className="ut-footer-links">
                <a href={anchor("#sobre")}>{t("nav.about")}</a>
                
              </div>
            </div>

            <div className="ut-footer-col">
              <h5>{t("footer.contact")}</h5>
              <div className="ut-footer-contact-body">
                <div className="ut-footer-contact-lines">
                  <a className="ut-contact-line" href={EMAIL.href}>
                    <span className="ut-contact-line-icon"><i className="fa-solid fa-envelope"></i></span>
                    {EMAIL.label}
                  </a>
                  <a className="ut-contact-line" href={PHONE.href}>
                    <span className="ut-contact-line-icon"><i className="fa-solid fa-phone-volume"></i></span>
                    {PHONE.label}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="ut-footer-side">
            <div className="lang-switch ut-footer-lang-wrap" ref={langRef}>
              <button
                type="button"
                className="ut-footer-lang"
                aria-haspopup="true"
                aria-expanded={langOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen((o) => !o);
                }}
              >
                <img loading="lazy" decoding="async" src={currentLang.flag} alt="" draggable="false" />
                <span>{currentLang.label}</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>

              <div className={`lang-popup${langOpen ? " is-open" : ""}`} role="menu">
                {LANGS.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    className={`lang-option${selectedLang === lang.code ? " is-selected" : ""}`}
                    role="menuitem"
                    onClick={() => {
                      setLang(lang.code);
                      setLangOpen(false);
                    }}
                  >
                    <span className="lang-flag">
                      <img loading="lazy" decoding="async" src={lang.flag} alt={lang.label} draggable="false" />
                    </span>
                    <span>{lang.label}</span>
                    <i className="fa-solid fa-check lang-check"></i>
                  </button>
                ))}
              </div>
            </div>
            <div className="ut-footer-social">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  {...(social.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ut-footer-bottom is-flat">
          <div className="ut-footer-bottom-left">
            <span>© {year} Undersoft LDA. {t("footer.rights")}</span>
          </div>
          <div className="ut-footer-bottom-right">
            <a href={LEGAL_PAGES["termos-e-condicoes"]}>{t("footer.terms")}</a>
            <a href={LEGAL_PAGES["termos-de-servico"]}>{t("footer.service")}</a>
            <a href={LEGAL_PAGES["politica-de-privacidade"]}>{t("footer.privacy")}</a>
            <a href={LEGAL_PAGES["politica-de-cookies"]}>{t("footer.cookies")}</a>
            <button type="button" className="ut-cc-reopen" onClick={openCookieSettings}>{t("footer.cookieSettings")}</button>
          </div>
        </div>

        <div className="ut-footer-giant" aria-hidden="true" ref={giantRef}>
          <span>UNDERSOFT</span>
        </div>
      </div>
    </footer>
  );
}