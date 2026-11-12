import { useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nContext";

// Botao flutuante (canto inferior direito) que leva ao formulario de contacto.
// - Aparece so depois que o hero sai da tela (sem timer, sem popup).
// - Some enquanto #contacto, #cta ou o rodape estao na tela (la ja existe CTA ou contacto).
// - Icone a esquerda: SVG inline (herda a cor via fill no CSS .fab-cta-icon).
const TARGET = "#contacto";

export default function FloatingCta() {
  const { t } = useI18n();
  const LABEL = t("floatingCta.label");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero-wrap") || document.querySelector(".hero");
    const blockers = ["#contacto", "#cta", "footer"]
      .map((sel) => document.querySelector(sel))
      .filter(Boolean);

    let heroInView = true;
    const blocking = new Set();
    const update = () => setVisible(!heroInView && blocking.size === 0);

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroInView = entry.isIntersecting;
      update();
    });
    if (hero) heroObserver.observe(hero);
    else heroInView = false;

    // considera a secao "na tela" quando ela entra nos 85% de cima da janela:
    // o botao sai antes de encostar no conteudo da secao
    const blockObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? blocking.add(e.target) : blocking.delete(e.target)));
        update();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    blockers.forEach((el) => blockObserver.observe(el));

    return () => {
      heroObserver.disconnect();
      blockObserver.disconnect();
    };
  }, []);

  return (
    <div className={`fab-cta${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <a className="fab-cta-link" href={TARGET} tabIndex={visible ? 0 : -1} aria-label={LABEL}>
        <svg className="fab-cta-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1236.1 764">
          <path d="M638,764c-125.1,0-250.3,0-375.4,0c-1.8,0-3.7-0.1-5.5,0c-3.1,0.2-4.4-1-4.4-4.3c0.1-55.7,0.1-111.3,0-167c0-3.1,1.1-4.2,4.1-4c1.8,0.1,3.7,0,5.5,0c212.6,0,425.3,0.1,637.9-0.2c25.1,0,50.3-1.1,74.6-8.7c30.3-9.5,47.1-30.9,49-62.7c0.6-9.5,0.9-19,0.9-28.4c0.1-160.5,0-321,0-481.4c0-7.3,0-7.3,7.4-7.3c65.5,0,131,0,196.5,0c7.5,0,7.5,0,7.5,7.3c0,182,0.1,363.9-0.1,545.9c0,43.7-10,84.8-35.8,120.9c-25.5,35.7-60.4,58.6-101.3,72.9c-28.9,10.1-58.8,15.7-89.4,16.1c-46,0.6-92,0.7-138,0.7C793.6,764.1,715.8,764,638,764z" />
          <path d="M211.3,535c-70.6,0-140.5,0-210.9,0C0.3,532.9,0,531,0,529C0,354.9,0,180.8,0,6.6C0,0,0,0,6.7,0c66,0,132,0,198,0c6.6,0,6.6,0,6.6,6.5c0,174.1,0,348.3,0,522.4C211.3,530.8,211.3,532.6,211.3,535z" />
        </svg>
        <span className="bntcnheader fab-cta-btn">
          {LABEL}
          <span className="stcntt">
            <i className="fa-solid fa-arrow-left" style={{ transform: "rotate(140deg)" }}></i>
          </span>
        </span>
      </a>
    </div>
  );
}