import { DeleteIcon } from "@/assets";
import IconButton from "@/shared/ui/iconButton";
import Modal from "@/shared/ui/modal/Modal";
import TextButton from "@/shared/ui/textButton";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  handleOpenChange: (open: boolean) => void;
  handleConfirm: () => void;
  cancelText: string;
  confirmText: string;
  confirmAriaLabel: string;
}

const ConfirmModal = ({
  isOpen,
  title,
  description,
  handleOpenChange,
  handleConfirm,
  cancelText,
  confirmText,
  confirmAriaLabel,
}: ConfirmModalProps) => {
  return (
    <Modal open={isOpen} onOpenChange={handleOpenChange}>
      <Modal.Content className="w-[33.6rem] px-[1.8rem] pt-[2.1rem] pb-[1.1rem]">
        <div className="flex flex-col gap-[2.25rem]">
          <div>
            <div className="mb-[1.25rem] flex items-center justify-between">
              <Modal.Title className="typo-head-sb-16 text-snapdeck-500">
                {title}
              </Modal.Title>

              <Modal.Close>
                <IconButton
                  variant="ghost"
                  tone="neutral"
                  radius="sm"
                  iconSize="lg"
                  aria-label="모달 닫기"
                >
                  <DeleteIcon />
                </IconButton>
              </Modal.Close>
            </div>

            <Modal.Description className="typo-caption-r-10 text-snapdeck-400 whitespace-pre-line">
              {description}
            </Modal.Description>
          </div>

          <div className="flex justify-end gap-[0.7rem]">
            <Modal.Close>
              <TextButton
                variant="neutral"
                size="xs"
                className="typo-caption-r-10"
              >
                {cancelText}
              </TextButton>
            </Modal.Close>

            <TextButton
              variant="danger"
              size="xs"
              className="typo-caption-r-10"
              onClick={handleConfirm}
              aria-label={confirmAriaLabel}
            >
              {confirmText}
            </TextButton>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmModal;
