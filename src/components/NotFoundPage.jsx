import { useEffect } from "react";
import LegalHeader from "./LegalHeader";
import Footer from "./Footer";
import { useI18n } from "../i18n/I18nContext";

export default function NotFoundPage() {
  const { t, lang } = useI18n();

  useEffect(() => {
    document.title = t("notFound.meta");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <>
      <LegalHeader />

      <main className="nf-page ut-scope">
        <div className="container">
          <div className="nf-card">
            <div className="nf-anim">
              <iframe
                src="https://lottie.host/embed/6ce55081-7a2e-4695-a003-0570830d4529/YYjea1qsBI.lottie"
                title=""
                aria-hidden="true"
                tabIndex={-1}
                loading="lazy"
              ></iframe>
            </div>
           
            <h1 className="pt-title nf-title">{t("notFound.title")}</h1>
            <p className="nf-lead">{t("notFound.lead")}</p>
            <a className="ut-btn ut-btn-primary nf-btn" href="/">
              <i className="fa-solid fa-arrow-left"></i>
              {t("notFound.back")}
            </a>
          </div>
        </div>
      </main>

      <Footer home={false} />
    </>
  );
}
