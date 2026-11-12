// Logos oficiais em /public/integracoes/*.svg, todos na cor #27211a
// (tons secundários com opacidade). `w` = largura do logo em rem no desktop;
// `m` = largura do logo em rem no mobile (<= 1024px). Edite o `m` de cada um.
import { useI18n } from "../i18n/I18nContext";

const INTEGRATIONS = [
  { name: "Excel", src: "/integracoes/excel.svg", w: 7, m: 5 },
  { name: "Google Sheets", src: "/integracoes/sheets.svg", w: 13, m: 8 },
  { name: "Cegid", src: "/integracoes/cegid.svg", w: 7, m: 5 },
  { name: "Sage", src: "/integracoes/sage.svg", w: 6, m: 4.5 },
  { name: "Moloni", src: "/integracoes/moloni.svg", w: 10, m: 7 },
  { name: "InvoiceXpress", src: "/integracoes/invoicexpress.svg", w: 16, m: 8.5 },
  { name: "Odoo", src: "/integracoes/odoo.svg", w: 7, m: 5 },
  { name: "TOC Online", src: "/integracoes/toconline.svg", w: 11, m: 7 },
  { name: "Vendus", src: "/integracoes/vendus.svg", w: 11, m: 7 },
  { name: "Microsoft", src: "/integracoes/microsoft.webp", w: 12, m: 8 },
  { name: "Holded", src: "/integracoes/holded.svg", w: 10, m: 7 },
  { name: "Outros via API", text: true },
];

function IntegrationLogo({ item, label }) {
  // Card sem imagem: mostra só o texto
  if (item.text) {
    return <span className="ut-logos-text">{label}</span>;
  }
  return (
    <img
      className="ut-logos-logo"
      src={item.src}
      alt={item.name}
      style={{ "--w": `${item.w}rem`, "--wn": item.w, "--wm": `${item.m ?? item.w}rem` }}
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  );
}

// Ícone "+" (igual ao PlusIcon do lucide, traço fino) nas interseções da grelha
function PlusMark({ className }) {
  return (
    <svg
      className={`ut-logos-plus ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default function IntegrationsSection() {
  const { t } = useI18n();
  return (
    <section id="integracoes" className="ut-scope">
      <div className="container">
        <div className="ut-escopo-head">
          <div className="pt-eyebrow">
            <span className="pt-eyebrow-arrow"><i className="fa-solid fa-play"></i></span>
            {t("integrations.eyebrow")}
          </div>
          <h2 className="pt-title">{t("integrations.title")}</h2>
          <p className="sbttl">{t("integrations.text")}</p>
        </div>

        <div className="ut-logos">
          {INTEGRATIONS.map((item, index) => (
            <div className="ut-logos-card" key={item.name}>
              <IntegrationLogo item={item} label={t("integrations.others")} />

              {index === 0 && <PlusMark className="ut-logos-plus--br" />}
              {index === 2 && (
                <>
                  <PlusMark className="ut-logos-plus--br" />
                  <PlusMark className="ut-logos-plus--bl" />
                </>
              )}
              {index === 4 && <PlusMark className="ut-logos-plus--br" />}
              {index === 6 && (
                <>
                  <PlusMark className="ut-logos-plus--br" />
                  <PlusMark className="ut-logos-plus--bl" />
                </>
              )}
              {index === 8 && <PlusMark className="ut-logos-plus--br ut-logos-plus--mobile" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}