import type { ReactNode } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { cn } from "@/shared/utils/cn";

interface ModalRootProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

interface ModalTriggerProps {
  children: ReactNode;
}

interface ModalCloseProps {
  children: ReactNode;
}

interface ModalContentProps {
  children: ReactNode;
  className?: string;
  /** 지정 시 해당 요소 안에만 overlay·content를 렌더링합니다. */
  container?: HTMLElement | null;
}

interface ModalTitleProps {
  children: ReactNode;
  className?: string;
}

interface ModalDescriptionProps {
  children: ReactNode;
  className?: string;
}

const ModalRoot = ({
  defaultOpen,
  open,
  onOpenChange,
  children,
}: ModalRootProps) => {
  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {children}
    </Dialog.Root>
  );
};

const ModalTrigger = ({ children }: ModalTriggerProps) => {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
};

const ModalClose = ({ children }: ModalCloseProps) => {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
};

const ModalContent = ({
  children,
  className,
  container,
}: ModalContentProps) => {
  const isContained = Boolean(container);
  const positionClass = isContained ? "absolute" : "fixed";

  return (
    <Dialog.Portal container={container ?? undefined}>
      <Dialog.Overlay
        className={cn(
          positionClass,
          "inset-0 z-(--z-modal)",
          "bg-overlay-900-70",
        )}
      />
      <Dialog.Content
        className={cn(
          positionClass,
          "top-1/2 left-1/2 z-(--z-modal)",
          "-translate-x-1/2 -translate-y-1/2",
          "rounded-md",
          "border-snapdeck-300 border",
          "bg-snapdeck-000",
          "outline-none",
          className,
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const ModalTitle = ({ children, className }: ModalTitleProps) => {
  return <Dialog.Title className={className}>{children}</Dialog.Title>;
};

const ModalDescription = ({ children, className }: ModalDescriptionProps) => {
  return (
    <Dialog.Description className={className}>{children}</Dialog.Description>
  );
};

const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Close: ModalClose,
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
});

export default Modal;
