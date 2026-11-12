import { useEffect, useState } from "react";
import LegalHeader from "./LegalHeader";
import Footer from "./Footer";
import { WHATSAPP } from "./socials";
import { useI18n } from "../i18n/I18nContext";


const ANIM_SRC = "/assets/images/email-successfully.svg";

export default function ThanksPage() {
  const { t, lang } = useI18n();
  const STEPS = t("thanks.steps");
  // O SVG anima sozinho (SMIL, 4s, uma vez) assim que e carregado. Se for carregado enquanto a pagina
  // ainda esta a arrancar (JS, fontes, CSS), os primeiros frames perdem-se e a animacao "salta" para o fim.
  // Por isso so montamos o <img> depois de a pagina estar pronta e pintada: a animacao comeca do zero, fluida.
  const [playAnim, setPlayAnim] = useState(false);

  useEffect(() => {
    document.title = t("meta.thanksTitle");
    document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.thanksDescription"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;
    const start = () => {
      if (cancelled) return;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => !cancelled && setPlayAnim(true));
      });
    };
    const whenLoaded = () =>
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((res) => window.addEventListener("load", res, { once: true }));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    // pre-aquece o ficheiro na cache (sem o animar) para o <img> carregar de imediato
    fetch(ANIM_SRC).catch(() => {});
    Promise.all([whenLoaded(), fonts]).then(() => setTimeout(start, 150));
    const fallback = setTimeout(start, 2500);
    return () => {
      cancelled = true;
      clearTimeout(fallback);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <>
      <LegalHeader />

      <main className="ty-page ut-scope">
        <div className="container">
          <div className="ty-card">
            <div className="ty-anim">
              {playAnim && <img src={ANIM_SRC} alt="" />}
            </div>

            <h1 className="pt-title ty-title">{t("thanks.title")}</h1>
            <p className="ty-lead">{t("thanks.lead")}</p>

            <ol className="ty-steps" aria-label={t("thanks.stepsLabel")}>
              {STEPS.map((step, i) => (
                <li key={i}>
                  <span className="ty-step-num">{i + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="ty-actions">
              <a className="ut-btn ut-btn-primary" href="/">
                <i className="fa-solid fa-arrow-left"></i>
                {t("thanks.back")}
              </a>
              <a className="ty-link" href={WHATSAPP.href} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp"></i>
                {t("thanks.whatsappPrefix")} {t("thanks.whatsappLabel")}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer home={false} />
    </>
  );
}