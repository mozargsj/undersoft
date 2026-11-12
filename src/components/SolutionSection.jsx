import { useI18n } from "../i18n/I18nContext";

export default function SolutionSection() {
  const { t } = useI18n();
  return (
    <section id="solucao" className="ut-scope ut-modelo-section">
      <div className="container">
        <div className="ut-modelo-grid">
          <div className="ut-modelo-cards">
            <div className="ut-modelo-card ut-tradicional">
              <div className="sgncard">
              <h4>{t("solution.traditionalTitle")}</h4>
              <ul>
                <li><span className="ut-li-ic"><i className="fa-regular fa-circle-xmark"></i></span> {t("solution.traditional")[0]}</li>
                <li><span className="ut-li-ic"><i className="fa-regular fa-circle-xmark"></i></span> {t("solution.traditional")[1]}</li>
                <li><span className="ut-li-ic"><i className="fa-regular fa-circle-xmark"></i></span> {t("solution.traditional")[2]}</li>
                <li><span className="ut-li-ic"><i className="fa-regular fa-circle-xmark"></i></span> {t("solution.traditional")[3]}</li>
                <li><span className="ut-li-ic"><i className="fa-regular fa-circle-xmark"></i></span> {t("solution.traditional")[4]}</li>
              </ul>
              </div>
            </div>
            <div className="ut-modelo-card ut-nosso">
              <div className="sgncard">
              <h4>{t("solution.ourTitle")}</h4>
              <ul>
                <li><span className="ut-li-ic"><i className="fa-solid fa-circle-check"></i></span> {t("solution.ours")[0]}</li>
                <li><span className="ut-li-ic"><i className="fa-solid fa-circle-check"></i></span> {t("solution.ours")[1]}</li>
                <li><span className="ut-li-ic"><i className="fa-solid fa-circle-check"></i></span> {t("solution.ours")[2]}</li>
                <li><span className="ut-li-ic"><i className="fa-solid fa-circle-check"></i></span> {t("solution.ours")[3]}</li>
                <li><span className="ut-li-ic"><i className="fa-solid fa-circle-check"></i></span> {t("solution.ours")[4]}</li>
              </ul>
            </div>
            </div>
          </div>
          <div className="ut-modelo-text">
            <div className="pt-eyebrow">
              <span className="pt-eyebrow-arrow"><i className="fa-solid fa-play"></i></span>
              {t("solution.eyebrow")}</div>
            <h2 className="pt-title">{t("solution.title")}</h2>
            <p className="sbttl">{t("solution.text")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}