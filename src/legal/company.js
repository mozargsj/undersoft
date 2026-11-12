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
  nipc: "[NIPC]",
  address: "[morada completa da sede]",
  registry: "[conservatória do registo comercial e número de matrícula]",
};

export const LAST_UPDATED = "11 de novembro de 2026";

// Data da última atualização escrita por extenso em cada idioma.
export const LAST_UPDATED_BY_LANG = {
  "pt-PT": LAST_UPDATED,
  "pt-BR": "11 de novembro de 2026",
  en: "11 November 2026",
  es: "11 de noviembre de 2026",
};

export const LEGAL_PAGES = {
  "termos-e-condicoes": "/termos-e-condicoes/",
  "termos-de-servico": "/termos-de-servico/",
  "politica-de-privacidade": "/politica-de-privacidade/",
  "politica-de-cookies": "/politica-de-cookies/",
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
