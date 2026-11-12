import GradientBarsBackground from "./GradientBarsBackground";
import { useI18n } from "../i18n/I18nContext";

export default function Hero() {
  const { t } = useI18n();
  return (
    <div className="hero-wrap">
    <section className="hero">
      <div className="hero-bg-intro">
        <div className="bg-wrapper">
          <GradientBarsBackground />
        </div>
      </div>

      <div className="container hero-grid">
        <div className="hero-intro">
          <div className="eyebrow">
            <i className="fa-solid fa-play"></i> {t("hero.eyebrow")}
          </div>
          <h1 className="tilhr">
            <div className="hero-title">
              <span className="hero-title-line">
                {t("hero.titleLine1Before")}<span className="pt-highlight">{t("hero.titleHighlight")}</span>
              </span>
              <span className="hero-title-line">{t("hero.titleLine2")}</span>
            </div>
          </h1>
          <p>{t("hero.text")}</p>

          <div className="hero-actions">
  <a className="btn btn-primary" href="#contacto">
    {t("hero.ctaPrimary")}
    <span className="stcntt"><i className="fa-solid fa-arrow-left" style={{ transform: 'rotate(140deg)' }}></i></span>
  </a>
  <a className="btn btn-secondary" href="#solucao">
    {t("hero.ctaSecondary")}
    
  </a>
</div>

          <div className="scrolldown" style={{ "--color": "#fff" }}>
            <div className="chevrons">
              <div className="chevrondown"></div>
              <div className="chevrondown"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}