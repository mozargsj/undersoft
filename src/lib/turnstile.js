// Cloudflare Turnstile em modo invisivel: o visitante nao ve nada.
// O widget so corre quando chamamos getTurnstileToken() (execution: "execute").
// Cada token e de uso unico e expira em ~5 min, por isso fazemos reset antes de cada pedido.

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TIMEOUT_MS = 20000;

export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

let scriptPromise = null;
const state = { widgetId: null, pending: null };

export function loadTurnstile() {
  if (typeof window === "undefined") return Promise.reject(new Error("no-window"));
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile-missing")));
    script.onerror = () => {
      scriptPromise = null; // permite nova tentativa (ex.: bloqueador de anuncios, rede)
      reject(new Error("turnstile-blocked"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

function settle(kind, value) {
  const p = state.pending;
  if (!p) return;
  state.pending = null;
  clearTimeout(p.timer);
  p[kind](value);
}

// Devolve um token novo. Rejeita em caso de erro/timeout.
export async function getTurnstileToken(container) {
  const turnstile = await loadTurnstile();

  return new Promise((resolve, reject) => {
    settle("reject", new Error("turnstile-superseded"));
    state.pending = {
      resolve,
      reject,
      timer: setTimeout(() => settle("reject", new Error("turnstile-timeout")), TIMEOUT_MS),
    };

    if (state.widgetId === null) {
      state.widgetId = turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        execution: "execute",
        appearance: "interaction-only", // so aparece se a Cloudflare exigir interacao
        callback: (token) => settle("resolve", token),
        "error-callback": () => settle("reject", new Error("turnstile-error")),
        "timeout-callback": () => settle("reject", new Error("turnstile-timeout")),
        "expired-callback": () => {},
      });
    } else {
      turnstile.reset(state.widgetId);
    }
    turnstile.execute(state.widgetId);
  });
}
