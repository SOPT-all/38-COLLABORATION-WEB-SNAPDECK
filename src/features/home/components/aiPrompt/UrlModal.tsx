import { type ChangeEvent } from "react";

import { NotionIcon, WebIcon } from "@/assets";
import type { SourceActionValue } from "@/features/home/constants/sourceActions";
import Modal from "@/shared/ui/modal/Modal";
import TextButton from "@/shared/ui/textButton";
import {
  TextField,
  type TextFieldStatus,
} from "@/shared/ui/textField/TextField";

type UrlModalType = Extract<SourceActionValue, "webScrap" | "importNotion">;

interface UrlModalProps {
  type: UrlModalType;
  isOpen: boolean;
  value: string;
  fieldStatus: TextFieldStatus;
  helperText?: string;
  isConfirmDisabled: boolean;
  handleChange: (value: string) => void;
  handleBlur: () => void;
  handleOpenChange: (open: boolean) => void;
  handleConfirm: () => void;
}

const URL_MODAL_CONTENT = {
  webScrap: {
    Icon: WebIcon,
    title: "웹에서 가져오기",
    description: "스크랩할 웹사이트 URL을 입력하세요",
    label: "웹사이트 URL",
    placeholder: "https://example.com/..",
    confirmText: "스크랩",
  },
  importNotion: {
    Icon: NotionIcon,
    title: "Notion에서 가져오기",
    description: "Notion 워크스페이스 URL을 입력하세요",
    label: "Notion 워크스페이스 URL",
    placeholder: "https://your-workspace.notion.site/..",
    confirmText: "가져오기",
  },
} as const;

const UrlModal = ({
  type,
  isOpen,
  value,
  fieldStatus,
  helperText,
  isConfirmDisabled,
  handleChange,
  handleBlur,
  handleOpenChange,
  handleConfirm,
}: UrlModalProps) => {
  const { Icon, title, description, label, placeholder, confirmText } =
    URL_MODAL_CONTENT[type];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  return (
    <Modal open={isOpen} onOpenChange={handleOpenChange}>
      <Modal.Content className="h-[17rem] w-[33.6rem] rounded-[1.2rem] p-[1.8rem]">
        <div className="flex flex-col gap-[1.5rem]">
          <div className="flex items-center gap-[1.1rem]">
            <div className="border-sub-blue-2 bg-sub-blue-3 flex size-[3.2rem] items-center justify-center rounded-[0.6rem] border">
              <Icon
                aria-hidden
                className="text-sub-blue-2 size-[1rem] [--icon-stroke-width:1]"
              />
            </div>
            <div className="flex flex-col">
              <Modal.Title className="typo-head-b-14 text-snapdeck-500">
                {title}
              </Modal.Title>
              <Modal.Description className="typo-caption-r-10 text-snapdeck-400">
                {description}
              </Modal.Description>
            </div>
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            <span className="typo-caption-m-11 text-snapdeck-500">{label}</span>
            <TextField
              value={value}
              onChange={handleInputChange}
              onBlur={handleBlur}
              status={fieldStatus}
              helperText={helperText}
              showCheckIcon={false}
              placeholder={placeholder}
              aria-label={label}
              className="typo-caption-m-11"
            />
          </div>

          <div className="flex gap-[0.7rem]">
            <TextButton
              type="button"
              variant="primary"
              size="xs"
              disabled={isConfirmDisabled}
              leftIcon={<Icon className="[--icon-stroke-width:1]" />}
              iconSlotClassName="size-[1rem]"
              className="typo-caption-r-10 w-[25.2rem]"
              onClick={handleConfirm}
            >
              {confirmText}
            </TextButton>
            <Modal.Close>
              <TextButton
                type="button"
                variant="neutral"
                size="xs"
                className="typo-caption-r-10"
              >
                취소
              </TextButton>
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default UrlModal;
