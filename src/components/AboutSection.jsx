import { EMAIL, PHONE } from "./socials";
import { useI18n } from "../i18n/I18nContext";

// Posicionamento da empresa (o "como trabalhamos" já está na seção #processo).
const COMPANY = [0, 1, 2, 3];

export default function AboutSection() {
  const { t } = useI18n();
  const commitments = t("about.commitments");
  return (
    <section id="sobre" className="ut-scope about">
      <div className="container">
        <div className="about-card">
          <div className="about-top">
            <div className="about-copy">
              <div className="pt-eyebrow">
                <span className="pt-eyebrow-arrow"><i className="fa-solid fa-play"></i></span>
                {t("about.eyebrow")}
              </div>

              <h2 className="pt-title titulsobvr">
                {t("about.titleLine1")}
                <br />
                <span>{t("about.titleLine2")}</span>
              </h2>

              <p className="descsobr">{t("about.p1")}</p>
              <p className="descsobr">{t("about.p2")}</p>

              <div className="about-actions">
                <a className="bntcnheader" href="#contacto">
                  {t("about.cta")}
                  <span className="stcntt">
                  <i className="fa-solid fa-arrow-left" style={{ transform: "rotate(140deg)" }}></i>
                  </span>
                </a>
                
              </div>
            </div>

            <div className="about-visual">
              <img src="/mkp.webp" alt={t("about.imageAlt")} loading="lazy" decoding="async" draggable="false" />
              <div className="about-badge">
                <strong>{t("about.badgeName")}</strong>
                <span>{t("about.badgeTagline")}</span>
              </div>
            </div>
          </div>

          <div className="about-commitments">
            {COMPANY.map((i) => (
              <div className="about-commit" key={i}>
                <strong>{commitments[i].big}</strong>
                <span>{commitments[i].small}</span>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </section>
  );
}