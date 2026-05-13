import { type PropsWithChildren, useEffect } from "react";

import { createPortal } from "react-dom";

import { cn } from "@/shared/utils/cn";

export interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  closeOnBackdrop?: boolean;
  className?: string;
  portalTarget?: HTMLElement;
}

const Modal = ({
  open,
  onClose,
  children,
  closeOnBackdrop = true,
  className,
  portalTarget,
}: ModalProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-(--z-modal)",
        "flex items-center justify-center",
        "bg-overlay-900-70",
      )}
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Modal"
        className={cn(
          "min-h-58 w-[33.6rem]",
          "rounded-md",
          "border-snapdeck-300 border",
          "bg-snapdeck-000",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    portalTarget ?? document.body,
  );
};

export default Modal;
