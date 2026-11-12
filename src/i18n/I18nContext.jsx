import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_LANG, LANGS, TRANSLATIONS } from "./translations";
import { LEGAL_PAGES } from "../legal/company";
import { hasConsent, onConsentChange } from "../lib/consent";

const STORAGE_KEY = "undersoft:lang";
const I18nContext = createContext(null);

const isValid = (code) => LANGS.some((l) => l.code === code);

// Converte uma etiqueta de idioma do navegador (ex.: "pt-BR", "en-GB", "es") num idioma do site.
// Qualquer variante de português que não seja a brasileira (pt, pt-PT, pt-AO, pt-MZ...) usa pt-PT.
function matchBrowserLang(tag) {
  const [base, region] = String(tag).toLowerCase().split("-");
  if (base === "pt") return region === "br" ? "pt-BR" : "pt-PT";
  if (base === "en") return "en";
  if (base === "es") return "es";
  return null;
}

// Deteção do idioma pela preferência do navegador/sistema operativo.
// O cabeçalho HTTP Accept-Language que o navegador envia é montado a partir desta mesma lista
// (navigator.languages, por ordem de preferência). Como o site é estático (sem servidor que leia
// cabeçalhos), lemos a lista diretamente no navegador. Usa o 1.º idioma da lista que o site suporta.
function detectBrowserLang() {
  try {
    const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const tag of prefs) {
      const match = tag && matchBrowserLang(tag);
      if (match) return match;
    }
  } catch {
    /* navigator indisponivel */
  }
  return null;
}

// Ordem de decisão: 1) idioma escolhido pelo utilizador e guardado (se aceitou "Preferências"),
// 2) idioma do navegador (Accept-Language), 3) idioma por defeito (pt-PT).
function readInitialLang() {
  try {
    // O idioma só é lido/guardado entre visitas com consentimento para cookies de "preferências".
    const saved = hasConsent("preferences") ? localStorage.getItem(STORAGE_KEY) : null;
    if (isValid(saved)) return saved;
  } catch {
    /* localStorage indisponivel (modo privado, etc.) */
  }
  return detectBrowserLang() ?? DEFAULT_LANG;
}

// Procura "a.b.c" no dicionario; se nao existir no idioma atual, cai para pt-PT.
function lookup(dict, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), dict);
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  // Só o idioma escolhido de forma explícita é guardado; o detetado automaticamente não é.
  const chosenRef = useRef(false);

  const setLang = useCallback((code) => {
    if (!isValid(code)) return;
    chosenRef.current = true;
    setLangState(code);
    try {
      if (hasConsent("preferences")) localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignora */
    }
  }, []);

  // Mantém o idioma guardado em sintonia com o consentimento: guarda quando as "preferências"
  // são aceites e apaga quando são rejeitadas, retiradas ou expiram.
  useEffect(() => {
    const sync = () => {
      try {
        if (!hasConsent("preferences")) localStorage.removeItem(STORAGE_KEY);
        else if (chosenRef.current) localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* ignora */
      }
    };
    sync();
    return onConsentChange(sync);
  }, [lang]);

  // Mantem o <html lang="..."> em sincronia (acessibilidade/SEO) e sincroniza entre separadores.
  useEffect(() => {
    document.documentElement.lang = lang;
    // título e descrição da página (obrigado e páginas legais definem o próprio título)
    const ownTitle = location.pathname.startsWith("/obrigado") || Object.values(LEGAL_PAGES).some((p) => location.pathname.startsWith(p));
    if (!ownTitle) {
      const meta = TRANSLATIONS[lang]?.meta ?? TRANSLATIONS[DEFAULT_LANG].meta;
      document.title = meta.title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    }
  }, [lang]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && isValid(e.newValue)) setLangState(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(() => {
    const t = (path, vars) => {
      const v = lookup(TRANSLATIONS[lang], path) ?? lookup(TRANSLATIONS[DEFAULT_LANG], path) ?? path;
      if (vars && typeof v === "string") return v.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
      return v;
    };
    return { lang, setLang, t, langs: LANGS };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n precisa de estar dentro de <I18nProvider>");
  return ctx;
}
