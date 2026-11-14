import { useEffect, useRef, useState } from "react";
import { EMAIL, PHONE, SOCIALS, WHATSAPP } from "./socials";
import TermsDialog from "./TermsDialog";
import { politicaPrivacidade } from "../legal/content";
import { useI18n } from "../i18n/I18nContext";
import { TURNSTILE_SITE_KEY, renderTurnstile, resetTurnstile } from "../lib/turnstile";

// O pedido vai para o Worker `undersoft-contact` (valida o Turnstile e envia o e-mail pela Cloudflare).
// VITE_CONTACT_ENDPOINT so serve para apontar outro Worker (ex.: dev local); o padrao e o de producao.
const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "https://undersoft-contact.mozargsj.workers.dev";
const THANKS_URL = "/pages/obrigado";

// Select personalizado (o <option> nativo nao aceita estilo). Mantem um input escondido com o
// valor, entao o FormData, o "required" e o reset do formulario continuam a funcionar.
function ContactSelect({ id, name, placeholder, options, required }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];
  const listId = `${id}-list`;

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    const form = wrapRef.current?.closest("form");
    if (!form) return undefined;
    const onReset = () => { setValue(""); setOpen(false); };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  function openMenu() {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function choose(index) {
    const option = options[index];
    if (!option) return;
    setValue(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onKeyDown(e) {
    const last = options.length - 1;
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); setActive((i) => Math.min(i + 1, last)); break;
      case "ArrowUp": e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); break;
      case "Home": e.preventDefault(); setActive(0); break;
      case "End": e.preventDefault(); setActive(last); break;
      case "Enter":
      case " ": e.preventDefault(); choose(active); break;
      case "Escape": e.preventDefault(); setOpen(false); break;
      case "Tab": setOpen(false); break;
      default:
    }
  }

  return (
    <div className={`ut-select${open ? " is-open" : ""}`} ref={wrapRef}>
      <button
        type="button"
        id={id}
        ref={triggerRef}
        className={`ut-select-trigger${selected ? "" : " is-placeholder"}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        onKeyUp={(e) => e.key === " " && e.preventDefault()}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <i className="fa-solid fa-chevron-down ut-select-chevron" aria-hidden="true"></i>
      </button>

      <ul id={listId} className="ut-select-menu" role="listbox" aria-labelledby={`${id}-label`}>
        {options.map((option, index) => (
          <li
            key={option.value}
            id={`${id}-opt-${index}`}
            role="option"
            aria-selected={option.value === value}
            className={`ut-select-option${index === active ? " is-active" : ""}${option.value === value ? " is-selected" : ""}`}
            onPointerEnter={() => setActive(index)}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => choose(index)}
          >
            <span>{option.label}</span>
            <i className="fa-solid fa-check ut-select-check" aria-hidden="true"></i>
          </li>
        ))}
      </ul>

      <input
        className="ut-select-native"
        type="text"
        name={name}
        value={value}
        onChange={() => {}}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />
    </div>
  );
}

export default function ContactSection() {
  const { t } = useI18n();
  const BUTTON_LABEL = t("contact.form.button");
  const [status, setStatus] = useState({ visible: false, message: "" });
  const [phase, setPhase] = useState("idle"); // idle | sending
  const isSubmitting = phase !== "idle";
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const formRef = useRef(null);
  const turnstileRef = useRef(null);
  const captchaDialogRef = useRef(null);
  const widgetId = useRef(null);
  const captchaStarted = useRef(false);
  const captchaToken = useRef("");

  // Voltar atras (cache do navegador) nao deve deixar o botao preso a "A enviar..."
  useEffect(() => {
    const onPageShow = (e) => e.persisted && setPhase("idle");
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  function openCaptchaDialog() {
    const dialog = captchaDialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    setCaptchaOpen(true);
  }

  function closeCaptchaDialog() {
    const dialog = captchaDialogRef.current;
    if (dialog?.open) dialog.close();
    setCaptchaOpen(false);
  }

  function cancelCaptcha() {
    captchaToken.current = "";
    resetTurnstile(widgetId.current);
    setPhase("idle");
    closeCaptchaDialog();
  }

  function handleCaptchaToken(token) {
    if (!token) {
      captchaToken.current = "";
      setStatus({ visible: true, message: t("contact.form.errorCaptcha") });
      setPhase("idle");
      closeCaptchaDialog();
      return;
    }

    captchaToken.current = token;
    setStatus({ visible: false, message: "" });
    closeCaptchaDialog();
    setPhase("idle");
    formRef.current?.requestSubmit();
  }

  // Renderiza o widget no primeiro envio. O modo interaction-only mantém-no oculto
  // quando a validação automática passa; o diálogo só abre se o Turnstile pedir ação.
  function mountCaptcha() {
    setPhase("validating");

    if (widgetId.current !== null) {
      resetTurnstile(widgetId.current);
      return;
    }

    if (!TURNSTILE_SITE_KEY || captchaStarted.current || !turnstileRef.current) return;
    captchaStarted.current = true;
    renderTurnstile(turnstileRef.current, handleCaptchaToken, openCaptchaDialog)
      .then((id) => (widgetId.current = id))
      .catch(() => {
        captchaStarted.current = false;
        setStatus({ visible: true, message: t("contact.form.errorCaptcha") });
        setPhase("idle");
      });
  }

  useEffect(() => {
    const dialog = captchaDialogRef.current;
    if (!dialog) return;
    if (captchaOpen && !dialog.open) {
      dialog.showModal();
    } else if (!captchaOpen && dialog.open) {
      dialog.close();
    }
  }, [captchaOpen]);

  useEffect(() => {
    const dialog = captchaDialogRef.current;
    if (!dialog) return undefined;
    const close = () => cancelCaptcha();
    dialog.addEventListener("cancel", close);
    return () => dialog.removeEventListener("cancel", close);
  }, []);

  // Token de uso unico: renova depois de cada envio que nao terminou em "obrigado"
  function renewCaptcha() {
    captchaToken.current = "";
    resetTurnstile(widgetId.current);
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
        // Inicia a validacao. O popup só aparece se o Turnstile pedir interação.
        if (!captchaToken.current) {
          mountCaptcha();
          return;
        }
        data.set("cf-turnstile-response", captchaToken.current);
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
      renewCaptcha();
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
          >
            <div className="ut-form-row">
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
                <label htmlFor="empresa">{t("contact.form.company")}</label>
                <input
                  id="empresa"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder={t("contact.form.companyPlaceholder")}
                />
              </div>
            </div>

            <div className="ut-form-row">
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
                <label htmlFor="telemovel">{t("contact.form.phone")}</label>
                <input
                  id="telemovel"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={t("contact.form.phonePlaceholder")}
                />
              </div>
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

            <div className="ut-form-row">
              <div className="ut-form-group">
                <label htmlFor="ferramentas">{t("contact.form.tools")}</label>
                <input
                  id="ferramentas"
                  name="tools"
                  type="text"
                  autoComplete="off"
                  placeholder={t("contact.form.toolsPlaceholder")}
                />
              </div>

              <div className="ut-form-group">
                <label id="contactoPreferido-label" htmlFor="contactoPreferido">{t("contact.form.contactPref")}</label>
                <ContactSelect
                  id="contactoPreferido"
                  name="contactPref"
                  required
                  placeholder={t("contact.form.contactPrefPlaceholder")}
                  options={[
                    { value: "email", label: t("contact.form.contactOptions.email") },
                    { value: "phone", label: t("contact.form.contactOptions.phone") },
                    { value: "whatsapp", label: t("contact.form.contactOptions.whatsapp") },
                  ]}
                />
              </div>
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
    {TURNSTILE_SITE_KEY && (
      <dialog className="ut-captcha-dialog" ref={captchaDialogRef} aria-labelledby="captchaDialogTitle">
        <div className="ut-captcha-card">
          <div className="ut-captcha-icon" aria-hidden="true"><i className="fa-solid fa-shield-halved"></i></div>
          <h3 id="captchaDialogTitle">{t("contact.form.captchaTitle")}</h3>
          <p>{t("contact.form.captchaPrompt")}</p>
          <div ref={turnstileRef} className="ut-turnstile" />
          <button className="ut-btn ut-btn-primary" type="button" onClick={cancelCaptcha}>
            {t("contact.form.captchaClose")}
          </button>
        </div>
      </dialog>
    )}
    </>
  );
}