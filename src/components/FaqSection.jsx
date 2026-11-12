import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";

// Ordem pensada como conversa: primeiro a objeção principal (trocar ferramentas),
// depois o caso específico, como começa, prazo, custo, uso do dia a dia e pós-entrega.

export default function FaqSection() {
  const { t } = useI18n();
  const FAQ_ITEMS = t("faq.items");
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="perguntas" className="ut-scope">
      <div className="container">
        <div className="ut-faq-head">
          <div className="pt-eyebrow">
            <span className="pt-eyebrow-arrow"><i className="fa-solid fa-play"></i></span>
            {t("faq.eyebrow")}
          </div>
          <h2 className="pt-title">{t("faq.title")}</h2>
        </div>

        <div className="ut-faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={`ut-faq-item${isOpen ? " is-open" : ""}`} key={index}>
                <button
                  type="button"
                  className="ut-faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span className="ut-faq-toggle" aria-hidden="true">
                    <span className="ut-faq-icon"></span>
                  </span>
                </button>
                <div className="ut-faq-answer-wrap" id={`faq-answer-${index}`} role="region">
                  <div className="ut-faq-answer-inner">
                    <p className="ut-faq-answer">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <a className="ut-faq-more" href="#contacto">{t("faq.more")}</a>
      </div>
    </section>
  );
}
