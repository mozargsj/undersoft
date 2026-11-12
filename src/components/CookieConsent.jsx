import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { LEGAL_PAGES } from "../legal/company";
import { CATEGORIES, onOpenCookieSettings, readConsent, saveConsent } from "../lib/consent";
import "./cookie-consent.css";

const ALL_ON = { necessary: true, preferences: true, analytics: true, marketing: true };
const ALL_OFF = { necessary: true, preferences: false, analytics: false, marketing: false };

// Popup de consentimento de cookies. Aparece na primeira visita (e quando a escolha expira)
// e pode ser reaberto pelo link "Definições de cookies" do rodapé.
export default function CookieConsent() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("simple"); // "simple" | "details"
  const [draft, setDraft] = useState(ALL_OFF);
  const cardRef = useRef(null);
  const returnFocusRef = useRef(null);
  const reopenedRef = useRef(false); // aberto manualmente => foco no painel e Esc fecha
  const prevHeightRef = useRef(null); // altura do cartão antes de trocar de vista (para animar)

  // Primeira visita: mostra o popup pouco depois de a página carregar.
  useEffect(() => {
    if (readConsent()) return undefined;
    const timer = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(timer);
  }, []);

  // Reabertura pelo rodapé.
  useEffect(
    () =>
      onOpenCookieSettings(() => {
        returnFocusRef.current = document.activeElement;
        reopenedRef.current = true;
        setDraft(readConsent()?.choices ?? ALL_OFF);
        setView("details");
        setOpen(true);
      }),
    [],
  );

  // Foco no painel quando é aberto pelo utilizador.
  useEffect(() => {
    if (open && reopenedRef.current) cardRef.current?.focus();
  }, [open]);

  // Troca de vista com animação: o conteúdo entra com fade/slide (CSS, via key) e a altura do cartão
  // passa suavemente da altura anterior para a nova.
  const goTo = (next) => {
    prevHeightRef.current = cardRef.current ? cardRef.current.offsetHeight : null;
    setView(next);
  };

  useLayoutEffect(() => {
    const el = cardRef.current;
    const from = prevHeightRef.current;
    prevHeightRef.current = null;
    if (!el || from == null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    el.style.height = "auto";
    const to = el.offsetHeight;
    if (Math.abs(to - from) < 2) {
      el.style.height = "";
      return undefined;
    }
    el.style.height = `${from}px`;
    el.style.overflow = "hidden";
    void el.offsetHeight; // força o reflow antes de iniciar a transição
    el.style.transition = "height 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)";
    el.style.height = `${to}px`;
    const done = () => {
      el.style.height = "";
      el.style.overflow = "";
      el.style.transition = "";
      el.removeEventListener("transitionend", onEnd);
      clearTimeout(timer);
    };
    const onEnd = (e) => e.target === el && e.propertyName === "height" && done();
    el.addEventListener("transitionend", onEnd);
    const timer = setTimeout(done, 600);
    return done;
  }, [view]);

  const close = useCallback(() => {
    setOpen(false);
    setView("simple");
    reopenedRef.current = false;
    returnFocusRef.current?.focus?.();
    returnFocusRef.current = null;
  }, []);

  const decide = (choices) => {
    saveConsent(choices);
    close();
  };

  // Esc fecha apenas quando o painel foi aberto manualmente (já existe uma escolha guardada).
  // Na primeira visita, Esc não equivale a rejeitar nem a aceitar.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape" && reopenedRef.current && readConsent()) close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  const policyHref = LEGAL_PAGES["politica-de-cookies"];

  return (
    <div className="ut-cc-wrap">
      <div
        ref={cardRef}
        className={`ut-cc${view === "details" ? " is-details" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-labelledby="ut-cc-title"
        aria-describedby="ut-cc-desc"
        aria-label={t("cookieConsent.regionLabel")}
        tabIndex={-1}
      >
        <div className="ut-cc-view" key={view}>
        {view === "simple" ? (
          <>
            <h2 id="ut-cc-title" className="ut-cc-title">{t("cookieConsent.title")}</h2>
            <p id="ut-cc-desc" className="ut-cc-text">
              {t("cookieConsent.text")}{" "}
              {t("cookieConsent.policyPrefix")}{" "}
              <a href={policyHref}>{t("cookieConsent.policyLink")}</a>.
            </p>

            <div className="ut-cc-actions">
              <button type="button" className="ut-cc-btn ut-cc-btn-reject" onClick={() => decide(ALL_OFF)}>
                {t("cookieConsent.rejectAll")}
              </button>
              <button type="button" className="ut-cc-btn ut-cc-btn-accept" onClick={() => decide(ALL_ON)}>
                {t("cookieConsent.acceptAll")}
              </button>
            </div>
            <button
              type="button"
              className="ut-cc-link"
              onClick={() => {
                setDraft(readConsent()?.choices ?? ALL_OFF);
                goTo("details");
              }}
            >
              {t("cookieConsent.customize")}
            </button>
          </>
        ) : (
          <>
            <h2 id="ut-cc-title" className="ut-cc-title">{t("cookieConsent.detailsTitle")}</h2>
            <p id="ut-cc-desc" className="ut-cc-text">
              {t("cookieConsent.detailsText")}{" "}
              <a href={policyHref}>{t("cookieConsent.policyLink")}</a>.
            </p>

            <div className="ut-cc-list" data-lenis-prevent>
              {CATEGORIES.map((id) => {
                const locked = id === "necessary";
                const inputId = `ut-cc-${id}`;
                return (
                  <div className="ut-cc-item" key={id}>
                    <div className="ut-cc-item-head">
                      <label className="ut-cc-item-title" htmlFor={inputId}>
                        {t(`cookieConsent.categories.${id}.title`)}
                      </label>
                      {locked ? (
                        <span className="ut-cc-always">{t("cookieConsent.alwaysActive")}</span>
                      ) : null}
                      <span className="ut-cc-switch">
                        <input
                          id={inputId}
                          type="checkbox"
                          checked={locked ? true : !!draft[id]}
                          disabled={locked}
                          onChange={(e) => setDraft((d) => ({ ...d, [id]: e.target.checked }))}
                        />
                        <span className="ut-cc-slider" aria-hidden="true"></span>
                      </span>
                    </div>
                    <p className="ut-cc-item-text">{t(`cookieConsent.categories.${id}.text`)}</p>
                  </div>
                );
              })}
            </div>

            <div className="ut-cc-actions ut-cc-actions-3">
              <button type="button" className="ut-cc-btn ut-cc-btn-reject" onClick={() => decide(ALL_OFF)}>
                {t("cookieConsent.rejectAll")}
              </button>
              <button type="button" className="ut-cc-btn ut-cc-btn-accept" onClick={() => decide(ALL_ON)}>
                {t("cookieConsent.acceptAll")}
              </button>
              <button type="button" className="ut-cc-btn ut-cc-btn-save" onClick={() => decide(draft)}>
                {t("cookieConsent.save")}
              </button>
            </div>
            {readConsent() ? null : (
              <button type="button" className="ut-cc-link" onClick={() => goTo("simple")}>
                {t("cookieConsent.back")}
              </button>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
}
