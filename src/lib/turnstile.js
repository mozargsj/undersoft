// Cloudflare Turnstile aparece apenas quando o envio exige validacao manual.
// O widget tenta validar o visitante automaticamente; o token chega por onToken.
// onToken("") = token invalido (expirou, deu erro ou o desafio esgotou o tempo): o envio fica bloqueado.

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

let scriptPromise = null;

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

// Desenha o widget dentro de `container` e devolve o id dele (para o reset).
export async function renderTurnstile(container, onToken) {
  const turnstile = await loadTurnstile();
  return turnstile.render(container, {
    sitekey: TURNSTILE_SITE_KEY,
    theme: "light", // o cartao do formulario e claro
    size: "flexible",
    appearance: "interaction-only", // oculta o widget se a verificacao automatica for suficiente
    callback: (token) => onToken(token),
    "error-callback": () => onToken(""),
    "expired-callback": () => onToken(""),
    "timeout-callback": () => onToken(""),
  });
}

// Token de uso unico: depois de cada envio (certo ou errado) pede-se um novo.
export function resetTurnstile(widgetId) {
  if (widgetId !== null && window.turnstile) window.turnstile.reset(widgetId);
}
