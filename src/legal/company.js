import { EMAIL, PHONE } from "../components/socials";

// Dados da empresa usados em TODOS os documentos legais.
// Os valores entre parênteses retos [ ] ainda têm de ser preenchidos: aparecem
// destacados a amarelo nas páginas e o console avisa em modo de desenvolvimento.
export const COMPANY = {
  legalName: "Undersoft Lda.",
  brand: "Undersoft",
  website: "undersoft.pt",
  websiteUrl: "https://undersoft.pt",
  email: EMAIL.label,
  phone: PHONE.label,
};

export const LAST_UPDATED = "12 de novembro de 2026";

// Data da última atualização escrita por extenso em cada idioma.
export const LAST_UPDATED_BY_LANG = {
  "pt-PT": LAST_UPDATED,
  "pt-BR": "12 de novembro de 2026",
  en: "12 November 2026",
  es: "12 de noviembre de 2026",
};

export const LEGAL_PAGES = {
  "termos-e-condicoes": "/pages/termos-e-condicoes.html",
  "termos-de-servico": "/pages/termos-de-servico.html",
  "politica-de-privacidade": "/pages/politica-de-privacidade.html",
  "politica-de-cookies": "/pages/politica-de-cookies.html",
};

export const COMPLAINTS_URL = "https://www.livroreclamacoes.pt";

if (import.meta.env?.DEV) {
  const missing = Object.entries(COMPANY).filter(([, v]) => String(v).startsWith("["));
  if (missing.length) {
    console.warn(
      "[legal] Dados da empresa por preencher em src/legal/company.js:",
      missing.map(([k]) => k).join(", "),
    );
  }
}
