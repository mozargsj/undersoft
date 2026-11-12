import { useEffect, useRef } from "react";
import { useI18n } from "../i18n/I18nContext";
import LegalDocument from "../legal/LegalDocument";
import { getDoc, termosCondicoes } from "../legal/content";

const MOBILE_MQ = "(max-width: 767px)";
const CLOSE_MS = 240;

// Popup dos Termos e Condicoes.
// Desktop: cartao centrado. Mobile (<= 767px): "bottom sheet" com largura total, ~60% da altura
// e barra de arrastar no topo (arrastar para baixo fecha).
export default function TermsDialog({ isOpen, onClose, onAccept, doc: baseDoc = termosCondicoes, id = "termsDialog" }) {
  const { t, lang } = useI18n();
  const doc = getDoc(baseDoc.id, lang);
  const dialogRef = useRef(null);
  const sheetRef = useRef(null);
  const bodyRef = useRef(null);
  const timerRef = useRef(0);
  const dragRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const sheet = sheetRef.current;
    if (!dialog || !sheet) return;

    if (isOpen && !dialog.open) {
      clearTimeout(timerRef.current);
      timerRef.current = 0;
      sheet.classList.remove("is-closing");
      sheet.style.transform = "";
      sheet.style.transition = "";
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const finish = (accepted) => {
    timerRef.current = 0;
    onClose();
    if (accepted) onAccept?.();
  };

  // fecha com animacao (a menos que o utilizador prefira movimento reduzido)
  const requestClose = (accepted = false) => {
    const sheet = sheetRef.current;
    if (!sheet || timerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish(accepted);
      return;
    }
    sheet.classList.add("is-closing");
    timerRef.current = window.setTimeout(() => finish(accepted), CLOSE_MS);
  };

  // Esc e clique no fundo escurecido
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const onCancel = (e) => {
      e.preventDefault();
      requestClose();
    };
    const onBackdropClick = (e) => {
      if (e.target === dialog) requestClose();
    };
    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("click", onBackdropClick);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("click", onBackdropClick);
    };
  });

  // ---------- arrastar para fechar (mobile) ----------
  const startDrag = (e) => {
    if (!window.matchMedia(MOBILE_MQ).matches) return;
    if (timerRef.current || e.target.closest("button")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { id: e.pointerId, startY: e.clientY, dy: 0, lastY: e.clientY, lastT: e.timeStamp, v: 0 };
    sheetRef.current.style.transition = "none";
  };

  const moveDrag = (e) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    let dy = e.clientY - d.startY;
    if (dy < 0) dy *= 0.15; // resistencia ao puxar para cima
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.v = (e.clientY - d.lastY) / dt; // px/ms
    d.lastY = e.clientY;
    d.lastT = e.timeStamp;
    d.dy = dy;
    sheetRef.current.style.transform = `translateY(${dy}px)`;
  };

  const endDrag = (e) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    dragRef.current = null;
    const sheet = sheetRef.current;
    const shouldClose = e.type !== "pointercancel" && (d.dy > sheet.offsetHeight * 0.3 || (d.v > 0.6 && d.dy > 24));

    if (shouldClose) {
      sheet.style.transition = `transform ${CLOSE_MS}ms cubic-bezier(.4, 0, 1, 1)`;
      sheet.style.transform = "translateY(100%)";
      timerRef.current = window.setTimeout(() => finish(false), CLOSE_MS);
    } else {
      sheet.style.transition = "transform .28s cubic-bezier(.22, 1, .36, 1)";
      sheet.style.transform = "";
    }
  };

  const dragProps = {
    onPointerDown: startDrag,
    onPointerMove: moveDrag,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  };

  return (
    <dialog id={id} className="lg-dialog" ref={dialogRef} aria-labelledby={`${id}Title`}>
      <div className="lg-sheet" ref={sheetRef}>
        <div className="lg-grab" aria-hidden="true" {...dragProps}>
          <span className="lg-grab-bar"></span>
        </div>

        <div className="lg-sheet-head" {...dragProps}>
          <div>
            
            <h3 id={`${id}Title`}>{doc.title}</h3>
            <p className="lg-sheet-sub">{t("termsDialog.lastUpdated")} {doc.updated}</p>
          </div>
          <button type="button" className="lg-close" aria-label={t("termsDialog.close")} onClick={() => requestClose()}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="lg-sheet-body" ref={bodyRef} tabIndex={0}>
          <LegalDocument doc={doc} newTab />
        </div>

        <div className="lg-sheet-foot">
          <button type="button" className="lg-btn lg-btn--ghost" onClick={() => requestClose()}>
            {t("termsDialog.close")}
          </button>
          <button type="button" className="lg-btn lg-btn--primary" onClick={() => requestClose(true)}>
            {t("termsDialog.accept")}
          </button>
        </div>
      </div>
    </dialog>
  );
}