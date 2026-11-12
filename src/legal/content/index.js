import termosCondicoes from "./termos-condicoes";
import termosServico from "./termos-servico";
import politicaPrivacidade from "./politica-privacidade";
import politicaCookies from "./politica-cookies";

import { LAST_UPDATED_BY_LANG } from "../company";
import { DEFAULT_LANG } from "../../i18n/translations";

import brTermosCondicoes from "./pt-BR/termos-condicoes";
import brTermosServico from "./pt-BR/termos-servico";
import brPoliticaPrivacidade from "./pt-BR/politica-privacidade";
import brPoliticaCookies from "./pt-BR/politica-cookies";

import enTermosCondicoes from "./en/termos-condicoes";
import enTermosServico from "./en/termos-servico";
import enPoliticaPrivacidade from "./en/politica-privacidade";
import enPoliticaCookies from "./en/politica-cookies";

import esTermosCondicoes from "./es/termos-condicoes";
import esTermosServico from "./es/termos-servico";
import esPoliticaPrivacidade from "./es/politica-privacidade";
import esPoliticaCookies from "./es/politica-cookies";

// pt-PT e o texto de referencia (id, caminho, secoes). Os outros idiomas so traduzem
// title, short, subtitle e sections (mesmos ids de secao, na mesma ordem).
export const DOCS = {
  [termosCondicoes.id]: termosCondicoes,
  [termosServico.id]: termosServico,
  [politicaPrivacidade.id]: politicaPrivacidade,
  [politicaCookies.id]: politicaCookies,
};

export const DOC_LIST = [termosCondicoes, termosServico, politicaPrivacidade, politicaCookies];

const TRANSLATED = {
  "pt-BR": {
    "termos-e-condicoes": brTermosCondicoes,
    "termos-de-servico": brTermosServico,
    "politica-de-privacidade": brPoliticaPrivacidade,
    "politica-de-cookies": brPoliticaCookies,
  },
  en: {
    "termos-e-condicoes": enTermosCondicoes,
    "termos-de-servico": enTermosServico,
    "politica-de-privacidade": enPoliticaPrivacidade,
    "politica-de-cookies": enPoliticaCookies,
  },
  es: {
    "termos-e-condicoes": esTermosCondicoes,
    "termos-de-servico": esTermosServico,
    "politica-de-privacidade": esPoliticaPrivacidade,
    "politica-de-cookies": esPoliticaCookies,
  },
};

// Devolve o documento no idioma pedido (cai para pt-PT se nao houver traducao).
export function getDoc(id, lang = DEFAULT_LANG) {
  const base = DOCS[id];
  const tr = TRANSLATED[lang]?.[id];
  if (!base || !tr) return base;
  return { ...base, ...tr, updated: LAST_UPDATED_BY_LANG[lang] ?? base.updated };
}

export function getDocList(lang = DEFAULT_LANG) {
  return DOC_LIST.map((d) => getDoc(d.id, lang));
}

export { termosCondicoes, politicaPrivacidade };
