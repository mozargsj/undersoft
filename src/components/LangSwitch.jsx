import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { LANGS } from "../i18n/translations";

export { LANGS };

// Seletor de idioma (bandeira + popup). Usado no cabecalho principal e no das paginas legais/obrigado.
// O idioma vem do contexto global (useI18n), por isso cabecalho, rodape e paginas legais ficam sempre sincronizados.
export default function LangSwitch() {
  const { lang: selected, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGS.find((l) => l.code === selected) ?? LANGS[0];

  const select = (code) => {
    setLang(code);
    setOpen(false);
  };

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="lang-switch" ref={ref}>
      <button
        type="button"
        className="lang-btn"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <span className="lang-flag">
          <img loading="lazy" decoding="async" src={current.flag} alt={current.label} draggable="false" />
        </span>
        <i className="fa-solid fa-chevron-down lang-chevron"></i>
      </button>

      <div className={`lang-popup${open ? " is-open" : ""}`} role="menu">
        {LANGS.map((lang) => (
          <button
            key={lang.code}
            type="button"
            className={`lang-option${selected === lang.code ? " is-selected" : ""}`}
            data-lang={lang.code}
            role="menuitem"
            onClick={() => select(lang.code)}
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
  );
}
