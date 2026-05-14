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

const ModalContent = ({ children, className }: ModalContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn("fixed inset-0 z-(--z-modal)", "bg-overlay-900-70")}
      />

      <div
        className={cn(
          "fixed inset-0 z-(--z-modal)",
          "flex items-center justify-center",
        )}
      >
        <Dialog.Content
          className={cn(
            "rounded-md",
            "border-snapdeck-300 border",
            "bg-snapdeck-000",
            "outline-none",
            className,
          )}
        >
          {children}
        </Dialog.Content>
      </div>
    </Dialog.Portal>
  );
};

const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Close: ModalClose,
  Content: ModalContent,
});

export default Modal;
