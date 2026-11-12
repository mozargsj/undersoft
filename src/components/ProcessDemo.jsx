import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { subscribeScroll } from "../hooks/scrollBus";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { useI18n } from "../i18n/I18nContext";

const dataset = [
  { nome: "Under Ltda", valor: "15.450,00", nfe: "NFE-99281" },
  { nome: "Under Consultoria", valor: "3.200,50", nfe: "NFE-99282" },
  { nome: "Under Logística", valor: "45.000,00", nfe: "NFE-99283" },
  { nome: "Under Tecnologia", valor: "9.890,90", nfe: "NFE-99284" },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Tempos EXIBIDOS no cronômetro (o que o usuário lê) — são ilustrativos,
// não a duração real da animação em tela. O manual precisa "parecer"
// lento e trabalhoso; o automático precisa "parecer" quase instantâneo.
const MANUAL_TARGET_SECONDS = 26;
const AUTO_TARGET_SECONDS = 3;

// Anima o timer de 0 até targetSeconds ao longo de durationMs (tempo real da
// animação visual), sem nunca ultrapassar o valor-alvo, mesmo que a
// simulação demore mais ou menos que o previsto.
const startFakeTimer = (element, targetSeconds, durationMs, tickMs = 50) => {
  if (!element) return () => {};
  const start = performance.now();
  element.innerText = "0.00s";

  const interval = setInterval(() => {
    const elapsed = performance.now() - start;
    const progress = Math.min(elapsed / durationMs, 1);
    const displayed = Math.min(progress * targetSeconds, targetSeconds);
    element.innerText = `${displayed.toFixed(2)}s`;

    if (progress >= 1) {
      element.innerText = `${targetSeconds.toFixed(2)}s`;
      clearInterval(interval);
    }
  }, tickMs);

  return () => {
    clearInterval(interval);
    element.innerText = `${targetSeconds.toFixed(2)}s`;
  };
};

// Espaco entre o fim do titulo fixo e o topo dos paineis empilhados (px)
const STACK_GAP = 8;
// Deslocamento entre um painel e o proximo na pilha (itemStackDistance, px)
const STACK_OFFSET = 100;
// Folga minima entre a base do painel e a base da tela quando o painel e rolado "por dentro" (px)
const STACK_BOTTOM_MARGIN = 24;
// Pausa extra de rolagem (px) com a base do painel manual a mostra, antes do automatizado cobri-lo
const STACK_REVEAL_DWELL = 80;
// Janelas de desaceleracao/aceleracao, como fracao da altura da tela
const RAMP_IN_VH = 0.25; // antes de grudar
const EXIT_VH = 0.2; // antes de soltar (igual ao holdDistance="20vh" da pilha)
// Menor distancia do titulo ao topo da tela (abaixo do cabecalho fixo), em px
const HEADER_MIN_TOP = 96;
const HEADER_MIN_TOP_SHORT = 84; // telas com altura <= 860px
// (legado) topo do 1o painel quando o titulo e livre; hoje headerIsFree() retorna false
const FREE_HEADER_STACK_TOP = 32; // distancia do topo em que o 1o painel gruda quando o titulo e livre
// false = o titulo fica fixo (sticky) em toda a faixa >= 1025px. Volte para a checagem de largura para soltar o titulo de novo.
const headerIsFree = () => false;
const headerMinTop = () => {
  const w = window.innerWidth;
  return window.innerHeight <= 860 ? HEADER_MIN_TOP_SHORT : HEADER_MIN_TOP;
};
export default function ProcessDemo() {
  const { t } = useI18n();
  // a animação corre num efeito que não reinicia; lê sempre o idioma atual por aqui
  const tRef = useRef(t);
  tRef.current = t;
  const headerRef = useRef(null);
  const [stackTop, setStackTop] = useState(420);
  // > 0 quando o painel manual e mais alto que o espaco disponivel: abre uma pausa de rolagem para revelar a base dele
  const [stackHold, setStackHold] = useState(0);

  // O bloco (titulo + paineis empilhados) fica centralizado na vertical da tela
  // enquanto a pilha acontece. Em telas baixas ele sobe ate o limite abaixo do
  // cabecalho. --stack-tail faz o titulo soltar junto com o ultimo painel.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return undefined;
    const wrapper = el.parentElement;
    const root = document.documentElement;
    const measure = () => {
      // Abaixo de 1025px a pilha fixa e desativada (ver CSS)
      if (window.innerWidth <= 1024) {
        root.style.removeProperty("--hdr-top");
        wrapper?.style.removeProperty("--stack-tail");
        setStackTop(0);
        setStackHold(0);
        // MOBILE: os dois paineis sao sticky e soltam quando a base de CADA UM encosta no fim da pilha.
        // Como o Automatizado fica mais embaixo (top maior), o Manual soltava primeiro, subia e ficava
        // escondido atras dele. Aqui a base dos dois e igualada (margem so no que solta antes), entao
        // soltam juntos, mantendo o espaco que sobra do Manual, e a rolagem segue para a proxima secao.
        if (wrapper) {
          const slots = wrapper.querySelectorAll(".scroll-stack__slot");
          if (slots.length > 1) {
            const bottom = (el) => (parseFloat(getComputedStyle(el).top) || 0) + el.offsetHeight;
            const d = bottom(slots[slots.length - 1]) - bottom(slots[0]); // >0: o Manual solta antes
            wrapper.style.setProperty("--m-release-pad", `${Math.max(0, Math.round(d))}px`);
            wrapper.style.setProperty("--m-release-pad-last", `${Math.max(0, Math.round(-d))}px`);
          }
        }
        return;
      }
      wrapper?.style.removeProperty("--m-release-pad");
      wrapper?.style.removeProperty("--m-release-pad-last");
      const last = document.getElementById("demo-ma-panel-auto");
      if (headerIsFree()) {
        // titulo livre: sem --hdr-top e sem cauda; so informa o topo da pilha e a altura dos paineis
        root.style.removeProperty("--hdr-top");
        wrapper?.style.setProperty("--stack-tail", "0px");
        setStackTop(FREE_HEADER_STACK_TOP);
        const firstFree = document.getElementById("demo-ma-panel-manual");
        if (firstFree && wrapper) wrapper.style.setProperty("--stack-card-h", `${firstFree.offsetHeight}px`);
        return;
      }
      const minTop = headerMinTop();
      const blockHeight =
        el.offsetHeight + STACK_GAP + STACK_OFFSET + (last ? last.offsetHeight : 0);
      const top = Math.max(minTop, Math.round((window.innerHeight - blockHeight) / 2));
      root.style.setProperty("--hdr-top", `${top}px`);
      const pinTop = Math.round(top + el.offsetHeight + STACK_GAP);
      setStackTop(pinTop);
      const first = document.getElementById("demo-ma-panel-manual");
      // painel manual mais alto que o espaco ate a base da tela? (so com animacao; ver efeito de scroll abaixo)
      const overflowPx = first ? pinTop + first.offsetHeight - (window.innerHeight - STACK_BOTTOM_MARGIN) : 0;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setStackHold(!reduceMotion && overflowPx > 8 ? STACK_REVEAL_DWELL : 0);
      if (first && wrapper) wrapper.style.setProperty("--stack-card-h", `${first.offsetHeight}px`);
      if (last && wrapper) {
        const tail = STACK_GAP + STACK_OFFSET + last.offsetHeight;
        wrapper.style.setProperty("--stack-tail", `${Math.round(tail)}px`);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    const last = document.getElementById("demo-ma-panel-auto");
    if (last) observer.observe(last);
    const firstPanel = document.getElementById("demo-ma-panel-manual");
    if (firstPanel) observer.observe(firstPanel);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      root.style.removeProperty("--hdr-top");
    };
  }, []);

  // Entrada e saida suaves do bloco. O sticky, sozinho, faz a velocidade na tela cair de 1 para 0 ao
  // grudar e subir de 0 para 1 ao soltar, num unico frame (parada/arrancada seca). Aqui:
  //  - titulo e cada painel DESACELERAM nos ultimos RAMP_IN_VH da altura da tela antes de grudar:
  //      deslocamento = -L * p^2 * (1 - p), p = 0..1  (cubica: chega exatamente na posicao fixa);
  //  - o bloco todo ACELERA nos ultimos EXIT_VH antes de soltar: deslocamento = -x^2 / (2 * len),
  //      e mantem -len / 2 depois (compensado em --exit-shift na margem de baixo).
  // Tudo e calculado no mesmo frame do scroll (barramento do Lenis), sem atraso em relacao ao sticky.
  // Posicoes sao medidas so ao redimensionar, nunca por frame. Deslocamentos em px inteiros.
  useEffect(() => {
    const header = headerRef.current;
    const wrapper = header?.parentElement;
    if (!header || !wrapper) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const docTop = (el) => {
      let y = 0;
      for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
      return y;
    };

    let items = [];
    let exit = null;
    let reveal = null; // bloco (titulo + painel manual) rola mais um pouco quando o painel e mais alto que a tela

    const clear = () => {
      header.style.translate = "";
      wrapper.querySelectorAll(".scroll-stack__slot").forEach((el) => (el.style.translate = ""));
      wrapper.style.transform = "";
      wrapper.style.removeProperty("--exit-shift");
      header.style.transform = "";
      const firstSlot = wrapper.querySelector(".scroll-stack__slot");
      if (firstSlot?.firstElementChild) firstSlot.firstElementChild.style.translate = "";
      items = [];
      exit = null;
      reveal = null;
    };

    const settle = (s, stick, len) => {
      if (s <= stick - len || s >= stick) return 0;
      const x = s - (stick - len);
      return -(x * x * (len - x)) / (len * len);
    };

    const apply = (s) => {
      for (const it of items) {
        const v = Math.round(settle(s, it.stick, it.len));
        it.el.style.translate = v ? `0 ${v}px` : "";
      }
      if (exit) {
        let v = 0;
        if (s >= exit.start + exit.len) v = -exit.len / 2;
        else if (s > exit.start) v = -((s - exit.start) ** 2) / (2 * exit.len);
        v = Math.round(v);
        wrapper.style.transform = v ? `translate3d(0, ${v}px, 0)` : "";
      }
      if (reveal) {
        // 1) o bloco fixo (titulo + painel manual) volta a rolar com a pagina (1px de rolagem = 1px) ate a base
        //    do painel aparecer; nada e cortado, o titulo so sobe junto, como numa rolagem normal;
        // 2) quando o automatizado chega para cobri-lo, o bloco volta ao lugar (aparece so a "orelha" de cima)
        const rise = Math.min(1, Math.max(0, (s - reveal.start) / reveal.len));
        const back = Math.min(1, Math.max(0, (s - reveal.arrive) / (reveal.stick1 - reveal.arrive)));
        const v = Math.round(-reveal.len * rise * (1 - back));
        reveal.card.style.translate = v ? `0 ${v}px` : "";
        // titulo: usa transform (a propriedade translate dele ja e usada pela chegada suave)
        header.style.transform = v ? `translate3d(0, ${v}px, 0)` : "";
      }
    };

    const measure = () => {
      if (window.innerWidth <= 1024) {
        clear();
        return;
      }
      const vh = window.innerHeight;
      const len = Math.round(vh * RAMP_IN_VH);
      const exitLen = Math.round(vh * EXIT_VH);
      const hdrTop =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hdr-top")) ||
        headerMinTop();
      const mark0 = wrapper.querySelector(".demo-ma-mark");
      const marks = wrapper.querySelectorAll(".scroll-stack__mark");
      const slots = wrapper.querySelectorAll(".scroll-stack__slot");

      const free = headerIsFree();
      items = free ? [] : [{ el: header, stick: docTop(mark0) - hdrTop, len }];
      slots.forEach((el, i) => {
        items.push({ el, stick: docTop(marks[i]) - (stackTop + i * STACK_OFFSET), len });
      });

      if (free) {
        exit = null;
        wrapper.style.transform = "";
        wrapper.style.removeProperty("--exit-shift");
        header.style.translate = "";
      } else {
        const release = docTop(wrapper) + wrapper.offsetHeight - (hdrTop + header.offsetHeight);
        exit = { start: release - exitLen, len: exitLen };
        wrapper.style.setProperty("--exit-shift", `${exitLen / 2}px`);
      }

      // painel manual mais alto que o espaco disponivel: o bloco rola um pouco mais para revelar a base dele
      reveal = null;
      const firstSlot = slots[0];
      const firstPanel = document.getElementById("demo-ma-panel-manual");
      header.style.transform = "";
      if (firstSlot?.firstElementChild) firstSlot.firstElementChild.style.translate = "";
      if (firstSlot && firstPanel && slots.length > 1) {
        const over = Math.round(stackTop + firstPanel.offsetHeight - (vh - STACK_BOTTOM_MARGIN));
        if (over > 8) {
          const stick1 = docTop(marks[1]) - (stackTop + STACK_OFFSET);
          reveal = {
            card: firstSlot.firstElementChild,
            start: docTop(marks[0]) - stackTop, // quando o painel manual gruda
            len: over,
            arrive: stick1 - (vh - stackTop - STACK_OFFSET), // quando o topo do automatizado entra na tela
            stick1,
          };
        }
      }
      apply(window.scrollY);
    };

    measure();
    const unsubscribe = subscribeScroll(apply);
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    observer.observe(header);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      unsubscribe();
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      clear();
    };
  }, [stackTop, stackHold]);

  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const $ = (id) => root.querySelector(`#${id}`);

    // linha do exemplo no idioma atual (mantém as chaves nome/valor/nfe usadas abaixo)
    const getRow = (row) => {
      const d = tRef.current("problemDemo.dataset")[row];
      return { nome: d.name, valor: d.amount, nfe: d.invoice };
    };

    async function runManualProcess() {
      const cursor = $("demo-ma-mouse-cursor");
      const timerDisplay = $("demo-ma-timer-manual");
      const toast = $("demo-ma-toast-manual");
      const summary = $("demo-ma-summary-manual");
      if (!cursor || !timerDisplay || !toast) return;

      cursor.style.opacity = "1";
      // Duração REAL da animação: soma exata dos delays do loop abaixo
      // (medida, não estimada) + a pausa final antes do resumo, para o
      // cronômetro terminar exatamente junto com a última célula preenchida.
      const estimatedManualDurationMs = 11100;
      const stopTimer = startFakeTimer(
        timerDisplay,
        MANUAL_TARGET_SECONDS,
        estimatedManualDurationMs
      );

      for (let row = 0; row < dataset.length; row++) {
        const keys = ["nome", "valor", "nfe"];

        const hasTextError =
          row === 1
            ? {
                col: 0,
                wrongText: "Unde Constoria",
                errorMsg: tRef.current("problemDemo.manual.toastCustomerError"),
              }
            : null;

        const hasFinancialError = row === 2;

        for (let col = 0; col < keys.length; col++) {
          const cell = $(`demo-ma-m-${row}-${col}`);
          if (!cell) continue;
          const correctValue = getRow(row)[keys[col]];
          let textToType = correctValue;

          if (hasTextError && hasTextError.col === col)
            textToType = hasTextError.wrongText;
          if (hasFinancialError && col === 1) textToType = "4.500,00";

          const cellRect = cell.getBoundingClientRect();
          const panelRect = $("demo-ma-panel-manual").getBoundingClientRect();
          cursor.style.transform = `translate(${cellRect.left - panelRect.left + 8}px, ${
            cellRect.top - panelRect.top + 8
          }px)`;
          await sleep(220);

          cell.classList.add("demo-ma-cell-active-manual", "demo-ma-typing-cursor");
          await sleep(110);

          for (let i = 0; i < textToType.length; i++) {
            cell.innerText = textToType.substring(0, i + 1);
            await sleep(Math.random() * 35 + 20);
          }

          cell.classList.remove("demo-ma-typing-cursor", "demo-ma-cell-active-manual");

          if (hasFinancialError && col === 1) {
            cell.style.color = "#ef4444";
            cell.style.fontWeight = "bold";
          }

          await sleep(60);
        }

        if (hasTextError) {
          toast.innerText = hasTextError.errorMsg;
          toast.classList.add("show");
          await sleep(550);

          const badCell = $(`demo-ma-m-${row}-${hasTextError.col}`);
          badCell.classList.add("demo-ma-cell-error-highlight");

          const badCellRect = badCell.getBoundingClientRect();
          const panelRect = $("demo-ma-panel-manual").getBoundingClientRect();
          cursor.style.transform = `translate(${badCellRect.left - panelRect.left + 8}px, ${
            badCellRect.top - panelRect.top + 8
          }px)`;
          await sleep(280);

          toast.classList.remove("show");
          badCell.classList.add("demo-ma-cell-active-manual", "demo-ma-typing-cursor");

          const wrongText = hasTextError.wrongText;
          for (let i = wrongText.length; i >= 0; i--) {
            badCell.innerText = wrongText.substring(0, i);
            await sleep(18);
          }

          const correctValue = getRow(row)[keys[hasTextError.col]];
          for (let i = 0; i < correctValue.length; i++) {
            badCell.innerText = correctValue.substring(0, i + 1);
            await sleep(32);
          }

          badCell.classList.remove(
            "demo-ma-typing-cursor",
            "demo-ma-cell-active-manual",
            "demo-ma-cell-error-highlight"
          );
          await sleep(110);
        }
      }

      stopTimer();
      cursor.style.opacity = "0";

      await sleep(300);
      summary.classList.add("show");
    }

    async function runAutoProcess() {
      const timerDisplay = $("demo-ma-timer-auto");
      const toast = $("demo-ma-toast-auto");
      const summary = $("demo-ma-summary-auto");
      if (!timerDisplay || !toast) return;

      await sleep(400);

      // Duração REAL da animação: desacelerada para dar tempo de acompanhar
      // cada linha visualmente, sincronizada com o timer exibido (3s).
      const estimatedAutoDurationMs = 4 * (350 + 500 + 300);
      const stopTimer = startFakeTimer(
        timerDisplay,
        AUTO_TARGET_SECONDS,
        estimatedAutoDurationMs,
        10
      );

      for (let row = 0; row < dataset.length; row++) {
        const dataName = getRow(row).nome;

        $("demo-ma-toast-auto-text").innerText = tRef.current("problemDemo.auto.toastApproved", { name: dataName });
        toast.classList.add("show");

        await sleep(350);

        const cellNome = $(`demo-ma-a-${row}-0`);
        const cellValor = $(`demo-ma-a-${row}-1`);
        const cellNfe = $(`demo-ma-a-${row}-2`);

        cellNome.innerText = dataName;
        cellValor.innerText = getRow(row).valor;
        cellNfe.innerText = getRow(row).nfe;

        [cellNome, cellValor, cellNfe].forEach((c) =>
          c.classList.add("demo-ma-cell-success")
        );

        await sleep(500);
        toast.classList.remove("show");
        await sleep(300);
      }

      stopTimer();

      await sleep(250);
      summary.classList.add("show");
    }

    // Cada card (Sistema Manual / Sistema Automatizado) tem o proprio gatilho: a animacao so
    // comeca quando o card esta de fato a vista (>= 50% dele na tela, ou metade da altura da tela
    // se o card for mais alto que ela) e depois que o loader da pagina terminou. Fora da tela, para
    // ao fim da rodada atual e recomeca do zero quando o card volta a aparecer.
    const cards = {
      manual: {
        run: runManualProcess,
        panel: "demo-ma-panel-manual",
        table: "demo-ma-table-manual",
        summary: "demo-ma-summary-manual",
        timer: "demo-ma-timer-manual",
      },
      auto: {
        run: runAutoProcess,
        panel: "demo-ma-panel-auto",
        table: "demo-ma-table-auto",
        summary: "demo-ma-summary-auto",
        timer: "demo-ma-timer-auto",
      },
    };
    const visible = { manual: false, auto: false };
    const running = { manual: false, auto: false };
    const isLoading = () => document.documentElement.classList.contains("is-loading");

    async function loop(key) {
      const card = cards[key];

      // espera o loader sair antes de comecar (a animacao nao roda "escondida" atras dele)
      while (isLoading()) await sleep(120);

      while (visible[key]) {
        $(card.table)
          ?.querySelectorAll("td")
          .forEach((td) => {
            td.innerText = "";
            td.className = "";
            td.style.color = "";
            td.style.fontWeight = "";
          });
        $(card.summary)?.classList.remove("show");
        const timer = $(card.timer);
        if (timer) timer.innerText = "0.00s";

        await card.run();

        if (!visible[key]) break;

        await sleep(8000);
      }

      running[key] = false;
    }

    const keyByPanel = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = keyByPanel[entry.target.id];
          if (!key) return;

          const seen = entry.intersectionRect.height;
          const needed =
            Math.min(entry.boundingClientRect.height, entry.rootBounds?.height ?? window.innerHeight) * 0.5;
          visible[key] = entry.isIntersecting && seen >= needed;

          if (visible[key] && !running[key]) {
            running[key] = true;
            loop(key);
          }
        });
      },
      // varios limiares para reavaliar a cada 5% de visibilidade
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
    );

    Object.entries(cards).forEach(([key, card]) => {
      const el = $(card.panel);
      if (!el) return;
      keyByPanel[card.panel] = key;
      observer.observe(el);
    });

    return () => {
      visible.manual = false;
      visible.auto = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div className="demo-ma-wrapper" ref={containerRef}>
      {/* marcador de altura zero no topo do bloco: guia a chegada suave do titulo */}
      <div className="demo-ma-mark" aria-hidden="true" />
      <div className="demo-ma-header" ref={headerRef}>
        <h1 className="pt-title">{t("problemDemo.title1")}</h1>
        <h1 className="pt-title segtilt">{t("problemDemo.title2")}</h1>
        <p className="sbttl">{t("problemDemo.subtitle")}</p>
      </div>

      <div className="demo-ma-container">
       

        <ScrollStack
          className="demo-ma-panels-stack"
          stackPosition={stackTop}
          itemDistance={60 + stackHold}
          itemStackDistance={STACK_OFFSET}
          itemScale={0.04}
          holdDistance="20vh"
        >
          <ScrollStackItem itemClassName="demo-ma-stack-item">
          <div className="demo-ma-system-panel demo-ma-panel-archaic" id="demo-ma-panel-manual">
            <div className="sgndbck">
            <div className="demo-ma-panel-header">
              <div>
                <h2>{t("problemDemo.manual.title")}</h2>
               
              </div>
              <div className="demo-ma-timer-box">
                <span className="demo-ma-timer-label">{t("problemDemo.manual.timer")}</span>
                <span className="demo-ma-timer" id="demo-ma-timer-manual">
                  0.00s
                </span>
              </div>
            </div>

            <div className="demo-ma-cursor" id="demo-ma-mouse-cursor"></div>

            <div className="demo-ma-toast demo-ma-toast-error" id="demo-ma-toast-manual">
              {t("problemDemo.manual.toastSaveError")}
            </div>

            <div className="demo-ma-table-wrapper">
              <table className="demo-ma-spreadsheet" id="demo-ma-table-manual">
                <thead>
                  <tr>
                    <th>{t("problemDemo.table.customer")}</th>
                    <th>{t("problemDemo.table.amount")}</th>
                    <th>{t("problemDemo.table.invoice")}</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3].map((row) => (
                    <tr key={row}>
                      <td id={`demo-ma-m-${row}-0`}></td>
                      <td id={`demo-ma-m-${row}-1`}></td>
                      <td id={`demo-ma-m-${row}-2`}></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="demo-ma-summary demo-ma-summary-loss" id="demo-ma-summary-manual">
                <div className="demo-ma-summary-inner dmred">
                  <div className="demo-ma-summary-row">
                    <span>{t("problemDemo.manual.totalBilled")}</span> <strong>{t("problemDemo.totals.manualBilled")}</strong>
                  </div>
                  <div className="demo-ma-summary-row">
                    <span>{t("problemDemo.manual.profit")}</span> <strong>{t("problemDemo.totals.manualProfit")}</strong>
                  </div>
                  <div className="demo-ma-summary-alert">
                    ⚠️ <strong>{t("problemDemo.manual.alertTitle")}</strong>
                    <br />
                    {t("problemDemo.manual.alertNote")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tdscdss">
            <div className="cdssgmn errmn">
              <i className="fa-solid fa-circle-xmark"></i> {t("problemDemo.manual.pains")[0]}
            </div>
            <div className="cdssgmn errmn">
              <i className="fa-solid fa-circle-xmark"></i> {t("problemDemo.manual.pains")[1]}
            </div>
            <div className="cdssgmn errmn">
              <i className="fa-solid fa-circle-xmark"></i> {t("problemDemo.manual.pains")[2]}
            </div>
            <div className="cdssgmn errmn">
              <i className="fa-solid fa-circle-xmark"></i> {t("problemDemo.manual.pains")[3]}
            </div>
            <div className="cdssgmn errmn">
              <i className="fa-solid fa-circle-xmark"></i> {t("problemDemo.manual.pains")[4]}
            </div>

          </div>
          </div>

          </ScrollStackItem>
          <ScrollStackItem itemClassName="demo-ma-stack-item">
          <div className="demo-ma-system-panel demo-ma-panel-modern" id="demo-ma-panel-auto">
            <div className="sgndbck">
            <div className="demo-ma-panel-header">
              <div>
                <h2>{t("problemDemo.auto.title")}</h2>
               
              </div>
              <div className="demo-ma-timer-box grencrt">
                <span className="demo-ma-timer-label">{t("problemDemo.auto.timer")}</span>
                <span className="demo-ma-timer demo-ma-timer-green" id="demo-ma-timer-auto">
                  0.00s
                </span>
              </div>
            </div>

            <div className="demo-ma-table-wrapper">
              <div className="demo-ma-toast demo-ma-toast-success demo-ma-toast-centered" id="demo-ma-toast-auto">
                <i className="fa-solid checkdmee fa-circle-check"></i>{" "}
                <span id="demo-ma-toast-auto-text">{t("problemDemo.auto.toastStart")}</span>
              </div>

              <table className="demo-ma-spreadsheet" id="demo-ma-table-auto">
                <thead>
                  <tr>
                    <th>{t("problemDemo.table.customer")}</th>
                    <th>{t("problemDemo.table.amount")}</th>
                    <th>{t("problemDemo.table.invoice")}</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3].map((row) => (
                    <tr key={row}>
                      <td id={`demo-ma-a-${row}-0`}></td>
                      <td id={`demo-ma-a-${row}-1`}></td>
                      <td id={`demo-ma-a-${row}-2`}></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="demo-ma-summary demo-ma-summary-profit" id="demo-ma-summary-auto">
                <div className="demo-ma-summary-inner dmverd">
                  <div className="demo-ma-summary-row">
                    <span>{t("problemDemo.auto.totalBilled")}</span> <strong>{t("problemDemo.totals.autoBilled")}</strong>
                  </div>
                  <div className="demo-ma-summary-row">
                    <span>{t("problemDemo.auto.profit")}</span>{" "}
                    <strong className="demo-ma-green-text">{t("problemDemo.totals.autoProfit")}</strong>
                  </div>
                  <div className="demo-ma-summary-success">
                    <i className="fa-solid fa-circle-check checkdmee"></i>{" "}
                    <span>{t("problemDemo.auto.success")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div className="tdscdss">
            <div className="cdssgmn crtmn">
              <i className="fa-solid fa-circle-check"></i> {t("problemDemo.auto.gains")[0]}
            </div>
            <div className="cdssgmn crtmn">
              <i className="fa-solid fa-circle-check"></i> {t("problemDemo.auto.gains")[1]}
            </div>
            <div className="cdssgmn crtmn">
              <i className="fa-solid fa-circle-check"></i> {t("problemDemo.auto.gains")[2]}
            </div>
            <div className="cdssgmn crtmn">
              <i className="fa-solid fa-circle-check"></i> {t("problemDemo.auto.gains")[3]}
            </div>
            <div className="cdssgmn crtmn">
              <i className="fa-solid fa-circle-check"></i> {t("problemDemo.auto.gains")[4]}
            </div>

          </div>
          </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </div>
  );
}