import { useEffect, useRef } from "react";
import { useI18n } from "../i18n/I18nContext";

export default function SuccessDialog({ isOpen, onClose }) {
  const { t } = useI18n();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleCancel(event) {
      event.preventDefault();
      onClose();
    }

    function handleClick(event) {
      const rect = dialog.getBoundingClientRect();
      const clickedOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (clickedOutside) onClose();
    }

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClick);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return (
    <dialog
      id="successDialog"
      className="success-dialog"
      ref={dialogRef}
      aria-labelledby="successDialogTitle"
      aria-describedby="successDialogText"
    >
      <div className="success-dialog-card">
        <div className="success-dialog-icon">✓</div>
        <h3 id="successDialogTitle">{t("successDialog.title")}</h3>
        <p id="successDialogText">{t("successDialog.text")}</p>
        <button
          id="closeSuccessDialog"
          className="btn btn-primary"
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
        >
          {t("successDialog.ok")}
        </button>
      </div>
    </dialog>
  );
}
