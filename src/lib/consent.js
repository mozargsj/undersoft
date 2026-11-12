// Gestão do consentimento de cookies (Lei n.º 41/2004, art. 5.º, e RGPD).
//
// Regras aplicadas:
// - Nada que não seja estritamente necessário é guardado/carregado antes de haver consentimento.
// - Consentimento por categoria (granular), sem opções pré-selecionadas.
// - Aceitar e rejeitar têm o mesmo destaque e exigem o mesmo esforço (um clique).
// - A escolha pode ser alterada a qualquer momento (link "Definições de cookies" no rodapé).
// - A escolha é guardada com data e versão, e volta a ser pedida quando expira ou quando
//   as categorias mudam (aumentar CONSENT_VERSION).
//
// Para ligar uma ferramenta nova (ex.: analítica), carregue o script só depois de
// hasConsent("analytics") ser verdadeiro e escute onConsentChange para ligar/desligar:
//
//   import { hasConsent, onConsentChange } from "../lib/consent";
//   const sync = () => hasConsent("analytics") && loadAnalytics();
//   sync(); onConsentChange(sync);

export const CONSENT_VERSION = 1;
export const CONSENT_TTL_DAYS = 180; // volta a perguntar passados ~6 meses

// "necessary" é sempre verdadeiro e não pode ser desativado.
export const CATEGORIES = ["necessary", "preferences", "analytics", "marketing"];

const KEY = "undersoft:cookie-consent";
const CHANGE_EVENT = "undersoft:consent-change";
const OPEN_EVENT = "undersoft:open-cookie-settings";
const DAY_MS = 24 * 60 * 60 * 1000;

// Se o localStorage não estiver disponível, a escolha fica em memória durante a sessão da página.
let memoryRecord = null;

function normalize(choices = {}) {
  const out = { necessary: true };
  CATEGORIES.forEach((c) => {
    if (c !== "necessary") out[c] = choices[c] === true;
  });
  return out;
}

function isValid(rec) {
  if (!rec || rec.v !== CONSENT_VERSION || typeof rec.ts !== "number" || !rec.choices) return false;
  return Date.now() - rec.ts < CONSENT_TTL_DAYS * DAY_MS;
}

// Devolve o registo válido ({ v, ts, choices }) ou null se ainda não houve escolha / expirou.
export function readConsent() {
  let rec = memoryRecord;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) rec = JSON.parse(raw);
  } catch {
    /* localStorage indisponível ou JSON inválido */
  }
  return isValid(rec) ? { ...rec, choices: normalize(rec.choices) } : null;
}

export function hasConsent(category) {
  if (category === "necessary") return true;
  const rec = readConsent();
  return !!rec && rec.choices[category] === true;
}

export function saveConsent(choices) {
  const rec = { v: CONSENT_VERSION, ts: Date.now(), choices: normalize(choices) };
  memoryRecord = rec;
  try {
    localStorage.setItem(KEY, JSON.stringify(rec));
  } catch {
    /* ignora: fica só em memória */
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: rec }));
  return rec;
}

// Chama cb sempre que o consentimento muda (nesta aba ou noutra). Devolve a função para cancelar.
export function onConsentChange(cb) {
  const onCustom = () => cb(readConsent());
  const onStorage = (e) => e.key === KEY && cb(readConsent());
  window.addEventListener(CHANGE_EVENT, onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

// Reabre o painel de preferências (usado no rodapé).
export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function onOpenCookieSettings(cb) {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}
