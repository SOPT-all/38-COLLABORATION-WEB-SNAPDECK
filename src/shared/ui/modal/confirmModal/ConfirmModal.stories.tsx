import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";
import TextButton from "@/shared/ui/textButton";

import ConfirmModalComponent from "./ConfirmModal";

const meta = {
  title: "Shared/Modal/ConfirmModal",
  component: ConfirmModalComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
확인/취소 액션이 필요한 공통 ConfirmModal 컴포넌트입니다.

기본 dialog shell은 공통 Modal 컴포넌트를 사용하며, ConfirmModal은 제목, 설명, 닫기 버튼, 취소/확인 버튼 레이아웃만 담당합니다.

\`\`\`tsx
<ConfirmModal
  isOpen={isOpen}
  title="작업 중입니다"
  description="이 페이지를 떠나면 현재 작업한 내용이 모두 사라집니다.\\n정말 나가시겠습니까?"
  cancelText="취소"
  confirmText="나가기"
  confirmAriaLabel="작업을 취소하고 나갑니다"
  handleOpenChange={setIsOpen}
  handleConfirm={handleConfirm}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: false,
      description: "modal open 상태",
    },
    handleOpenChange: {
      control: false,
      description: "modal open 상태 변경 핸들러",
    },
    handleConfirm: {
      control: false,
      description: "확인 버튼 클릭 핸들러",
    },
  },
} satisfies Meta<typeof ConfirmModalComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmModal: Story = {
  args: {
    isOpen: false,
    title: "작업 중입니다",
    description:
      "이 페이지를 떠나면 현재 작업한 내용이 모두 사라집니다.\n정말 나가시겠습니까?",
    cancelText: "취소",
    confirmText: "나가기",
    confirmAriaLabel: "작업을 취소하고 나갑니다",
    handleOpenChange: () => {},
    handleConfirm: () => {},
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
      setIsOpen(false);
    };

    return (
      <>
        <TextButton variant="primary" size="md" onClick={() => setIsOpen(true)}>
          Confirm Modal 열기
        </TextButton>

        <ConfirmModalComponent
          {...args}
          isOpen={isOpen}
          handleOpenChange={setIsOpen}
          handleConfirm={handleConfirm}
        />
      </>
    );
  },
};
