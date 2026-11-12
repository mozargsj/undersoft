import { useEffect, useRef, useState } from "react";
import { EMAIL, PHONE, SOCIALS, WHATSAPP } from "./socials";
import TermsDialog from "./TermsDialog";
import { politicaPrivacidade } from "../legal/content";
import { useI18n } from "../i18n/I18nContext";
import { TURNSTILE_SITE_KEY, getTurnstileToken, loadTurnstile } from "../lib/turnstile";

// Com VITE_CONTACT_ENDPOINT definido, o pedido vai para o Worker (valida o Turnstile e reencaminha).
const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "https://formspree.io/f/xojgbwqj";
const THANKS_URL = "/obrigado/";

export default function ContactSection() {
  const { t } = useI18n();
  const BUTTON_LABEL = t("contact.form.button");
  const [status, setStatus] = useState({ visible: false, message: "" });
  const [phase, setPhase] = useState("idle"); // idle | validating | sending
  const isSubmitting = phase !== "idle";
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const formRef = useRef(null);
  const turnstileRef = useRef(null);

  // Voltar atras (cache do navegador) nao deve deixar o botao preso a "A enviar..."
  useEffect(() => {
    const onPageShow = (e) => e.persisted && setPhase("idle");
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // Pre-carrega o script do Turnstile quando a pessoa comeca a preencher (nao pesa no carregamento inicial)
  function preloadCaptcha() {
    if (TURNSTILE_SITE_KEY) loadTurnstile().catch(() => {});
  }

  // "Li e aceito" no popup marca a caixa do formulario
  function acceptTerms() {
    const box = formRef.current?.elements.terms;
    if (box) box.checked = true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = formRef.current;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // honeypot
    if (form.elements.website.value) {
      return;
    }

    setStatus({ visible: false, message: "" });

    try {
      const data = new FormData(form);

      if (TURNSTILE_SITE_KEY) {
        setPhase("validating");
        let token;
        try {
          token = await getTurnstileToken(turnstileRef.current);
        } catch {
          setStatus({
            visible: true,
            message:
              t("contact.form.errorValidate"),
          });
          setPhase("idle");
          return;
        }
        data.set("cf-turnstile-response", token);
      }

      setPhase("sending");
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Falha no envio");

      form.reset();
      // O botao fica bloqueado ate a navegacao terminar (evita duplo envio)
      window.location.assign(THANKS_URL);
    } catch (error) {
      setStatus({
        visible: true,
        message:
          t("contact.form.errorSend"),
      });
      setPhase("idle");
    }
  }

  return (
    <>
    <section id="contacto" className="ut-scope">
      <div className="container">
        <div className="ut-contato-wrap">
          <div className="ut-contato-info">
            <div className="ut-contato-head">
              <div className="pt-eyebrow">
                <span className="pt-eyebrow-arrow"><i className="fa-solid fa-play"></i></span>
                {t("contact.eyebrow")}
              </div>
              <h2 className="pt-title">{t("contact.title")}</h2>
              <p className="ut-contato-text">{t("contact.p1")}</p>
              <p className="ut-contato-text">{t("contact.p2")}</p>
            </div>

            <div className="ut-contact-list">
              <a
                className="ut-contact-item ut-contact-item--whatsapp"
                href={WHATSAPP.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ut-contact-icon"><i className="fa-brands fa-whatsapp"></i></span>
                {t("contact.whatsapp")}
              </a>
              <a className="ut-contact-item ut-contact-item--phone" href={PHONE.href}>
                <span className="ut-contact-icon"><i className="fa-solid fa-phone-volume"></i></span>
                {PHONE.label}
              </a>
              <a className="ut-contact-item ut-conttemailbtn" href={EMAIL.href}>
                <span className="ut-contact-icon"><i className="fa-solid fa-envelope"></i></span>
                {EMAIL.label}
              </a>
            </div>

            <div className="ut-contato-social">
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

          <form
            id="contactForm"
            className="ut-contato-form"
            ref={formRef}
            onSubmit={handleSubmit}
            onFocus={preloadCaptcha}
          >
            <div className="ut-form-group">
              <label htmlFor="nome">{t("contact.form.name")}</label>
              <input
                id="nome"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t("contact.form.namePlaceholder")}
                required
              />
            </div>

            <div className="ut-form-group">
              <label htmlFor="email">{t("contact.form.email")}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t("contact.form.emailPlaceholder")}
                required
              />
            </div>

            <div className="ut-form-group">
              <label htmlFor="mensagem">{t("contact.form.message")}</label>
              <textarea
                id="mensagem"
                name="message"
                placeholder={t("contact.form.messagePlaceholder")}
                required
              ></textarea>
            </div>

            <label className="ut-form-check">
              <input type="checkbox" name="terms" required />
              <span>
                {t("contact.form.acceptPrefix")}{" "}
                <button type="button" className="ut-link-btn" onClick={() => setTermsOpen(true)}>
                  {t("contact.form.terms")}
                </button>{" "}
                {t("contact.form.and")}{" "}
                <button type="button" className="ut-link-btn" onClick={() => setPrivacyOpen(true)}>
                  {t("contact.form.privacy")}
                </button>
              </span>
            </label>

            <input type="hidden" name="_subject" value={t("contact.form.subject")} />
            <input type="hidden" name="_source" value="undersoft.pt" />

            <div className="ut-honeypot" aria-hidden="true">
              <label htmlFor="website">{t("contact.form.honeypot")}</label>
              <input id="website" name="website" type="text" tabIndex="-1" autoComplete="off" />
            </div>

            {status.visible && (
              <div
                id="formStatus"
                className="ut-form-status"
                role="alert"
                aria-live="assertive"
              >
                {status.message}
              </div>
            )}

            {/* Turnstile invisivel: o widget e renderizado aqui, mas o visitante nao o ve */}
            <div ref={turnstileRef} className="ut-turnstile" aria-hidden="true"></div>

            <button
              className={`ut-btn ut-btn-primary${isSubmitting ? " is-loading" : ""}`}
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting && <span className="ut-spinner" aria-hidden="true"></span>}
              <span>{BUTTON_LABEL[phase]}</span>
            </button>
            <span className="ut-sr-only" role="status" aria-live="polite">
              {isSubmitting ? BUTTON_LABEL[phase] : ""}
            </span>
          </form>
        </div>
      </div>
    </section>

    <TermsDialog isOpen={termsOpen} onClose={() => setTermsOpen(false)} onAccept={acceptTerms} />
    <TermsDialog id="privacyDialog" doc={politicaPrivacidade} isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} onAccept={acceptTerms} />
    </>
  );
}