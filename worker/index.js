// Cloudflare Worker: valida o formulario, confirma o Turnstile no servidor e envia o e-mail
// pela Cloudflare (Email Routing / binding send_email). Nao usa servicos externos.
//
// Variaveis (wrangler.toml):  ALLOWED_ORIGINS, MAIL_FROM, MAIL_TO
// Binding (wrangler.toml):    EMAIL  (send_email)
// Segredo:                    TURNSTILE_SECRET  ->  npx wrangler secret put TURNSTILE_SECRET

import { EmailMessage } from "cloudflare:email";

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EMAIL_RE = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]+$/;

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

// remove quebras de linha (evita header injection) e limita o tamanho
const oneLine = (v, max) => String(v ?? "").replace(/[\r\n\u2028\u2029]+/g, " ").trim().slice(0, max);

function utf8ToB64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

const wrap76 = (b64) => b64.replace(/(.{76})/g, "$1\r\n");
const encodedWord = (str) => `=?UTF-8?B?${utf8ToB64(str)}?=`;

function buildMime({ from, to, replyTo, replyName, subject, text }) {
  const domain = from.split("@")[1] || "localhost";
  return [
    `From: ${encodedWord("Site Undersoft")} <${from}>`,
    `To: <${to}>`,
    `Reply-To: ${encodedWord(replyName)} <${replyTo}>`,
    `Subject: ${encodedWord(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrap76(utf8ToB64(text)),
    "",
  ].join("\r\n");
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
    const originOk = allowed.includes(origin);
    const cors = originOk ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {};

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: originOk ? 204 : 403,
        headers: {
          ...cors,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Accept",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, cors);
    if (!originOk) return json({ ok: false, error: "origin" }, 403, cors);

    if (!env.TURNSTILE_SECRET || !env.EMAIL || !env.MAIL_FROM || !env.MAIL_TO) {
      console.error("Configuracao em falta: TURNSTILE_SECRET, EMAIL, MAIL_FROM ou MAIL_TO");
      return json({ ok: false, error: "config" }, 500, cors);
    }

    // corpo limitado (o formulario e pequeno)
    const declared = Number(request.headers.get("Content-Length") || 0);
    if (declared > 20000) return json({ ok: false, error: "too-large" }, 413, cors);

    let form;
    try {
      form = await request.formData();
    } catch {
      return json({ ok: false, error: "body" }, 400, cors);
    }

    // honeypot: finge sucesso para nao dar pistas a bots
    if (form.get("website")) return json({ ok: true }, 200, cors);

    // validacao dos campos
    const name = oneLine(form.get("name"), 120);
    const email = oneLine(form.get("email"), 254);
    const message = String(form.get("message") ?? "").replace(/\r\n/g, "\n").trim().slice(0, 5000);
    const company = oneLine(form.get("company"), 120);
    const phone = oneLine(form.get("phone"), 40);
    const tools = oneLine(form.get("tools"), 200);
    const prefKey = oneLine(form.get("contactPref"), 20);
    const terms = form.get("terms");
    const source = oneLine(form.get("_source"), 80) || "undersoft.pt";
    const subjectIn = oneLine(form.get("_subject"), 120);

    const PREFS = { email: "E-mail", phone: "Telemóvel", whatsapp: "WhatsApp" };
    const contactPref = PREFS[prefKey];

    if (!name || !EMAIL_RE.test(email) || !message || !terms || !contactPref) {
      return json({ ok: false, error: "invalid" }, 400, cors);
    }

    // Turnstile
    const token = form.get("cf-turnstile-response");
    if (!token || typeof token !== "string") return json({ ok: false, error: "captcha" }, 400, cors);

    const check = new FormData();
    check.set("secret", env.TURNSTILE_SECRET);
    check.set("response", token);
    const ip = request.headers.get("CF-Connecting-IP");
    if (ip) check.set("remoteip", ip);

    let verdict;
    try {
      verdict = await (await fetch(SITEVERIFY, { method: "POST", body: check })).json();
    } catch {
      return json({ ok: false, error: "captcha-unavailable" }, 502, cors);
    }
    if (!verdict.success) return json({ ok: false, error: "captcha" }, 403, cors);

    // e-mail
    const subject = subjectIn || "Novo contacto pelo site";
    const text = [
      `Nome: ${name}`,
      `Empresa: ${company || "-"}`,
      `E-mail: ${email}`,
      `Telemóvel: ${phone || "-"}`,
      `Contacto preferido: ${contactPref}`,
      `Ferramentas que usam hoje: ${tools || "-"}`,
      `Origem: ${source}`,
      `Data: ${new Date().toISOString()}`,
      "",
      "Mensagem:",
      message,
    ].join("\n");

    try {
      const raw = buildMime({
        from: env.MAIL_FROM,
        to: env.MAIL_TO,
        replyTo: email,
        replyName: name,
        subject,
        text,
      });
      await env.EMAIL.send(new EmailMessage(env.MAIL_FROM, env.MAIL_TO, raw));
    } catch (err) {
      console.error("Falha ao enviar e-mail:", err);
      return json({ ok: false, error: "send" }, 502, cors);
    }

    return json({ ok: true }, 200, cors);
  },
};