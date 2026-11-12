import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
const TYPING_SPEED_MS = 90;
const DELETING_SPEED_MS = 50;
const HOLD_MS = 1600;
const PAUSE_BEFORE_TYPE_MS = 300;

export default function CtaSection() {
  const { t, lang } = useI18n();
  const [typedText, setTypedText] = useState(() => t("cta.words")[0]);
  const wordIndexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const WORDS = t("cta.words");
    wordIndexRef.current = 0;
    clearTimeout(timeoutRef.current);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setTypedText(WORDS[0]);
      return;
    }

    function typeWord(word, onDone) {
      let i = 0;
      function step() {
        setTypedText(word.slice(0, i));
        i++;
        if (i <= word.length) {
          timeoutRef.current = setTimeout(step, TYPING_SPEED_MS);
        } else {
          onDone();
        }
      }
      step();
    }

    function deleteWord(word, onDone) {
      let i = word.length;
      function step() {
        setTypedText(word.slice(0, i));
        i--;
        if (i >= 0) {
          timeoutRef.current = setTimeout(step, DELETING_SPEED_MS);
        } else {
          onDone();
        }
      }
      step();
    }

    function loop() {
      const word = WORDS[wordIndexRef.current];
      typeWord(word, () => {
        timeoutRef.current = setTimeout(() => {
          deleteWord(word, () => {
            wordIndexRef.current = (wordIndexRef.current + 1) % WORDS.length;
            timeoutRef.current = setTimeout(loop, PAUSE_BEFORE_TYPE_MS);
          });
        }, HOLD_MS);
      });
    }

    loop();

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <section id="cta" className="ut-scope">
      <div className="container">
        <div className="ut-cta-card">
          <div className="ut-cta-text">
            <h2 className="pt-title">
              <span className="hero-title-line">
                <span className="rotator">
                  <span className="typed-word">{typedText}</span>
                  <span className="typed-cursor" aria-hidden="true"></span>
                </span>
                <span>
                  {t("cta.processes")}<span className="cta-sem cta-sem--end">{t("cta.without")}</span>
                </span>
              </span>
              <span className="hero-title-line">
                <span className="cta-sem cta-sem--start">{t("cta.withoutStart")}</span>{t("cta.titleLine2")}
              </span>
            </h2>
            <p>{t("cta.text")}</p>
          </div>
          <a className="ut-btn ut-btn-secondary" href="#contacto">
            {t("cta.button")}
          </a>
        </div>
      </div>
    </section>
  );
}