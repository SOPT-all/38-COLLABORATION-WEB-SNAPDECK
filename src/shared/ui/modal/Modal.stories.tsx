import * as Dialog from "@radix-ui/react-dialog";
import type { Meta, StoryObj } from "@storybook/react-vite";

import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";

import Modal from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Shared/Modal",
  component: Modal,

  parameters: {
    layout: "centered",

    docs: {
      description: {
        component: `
공통 Modal 컴포넌트입니다.

Radix Dialog 기반으로 구현되어 있으며, 접근성, focus trap, ESC close, overlay dismiss 등을 기본 지원합니다.

---

## Features

- Radix Dialog 기반 modal입니다.
- overlay와 modal content를 Portal 기반으로 렌더링합니다.
- Modal이 open 상태일 때 ESC key 입력 시 modal close가 가능합니다.
- overlay(backdrop) 영역 클릭 시 modal dismiss가 가능합니다.
- Modal open 시 focus가 modal 내부로 이동합니다.
- Modal close 시 기존 focus 위치로 복귀합니다.
- modal 내부 콘텐츠는 children 기반으로 구성합니다.
- 공통 Modal은 shell과 accessibility 동작만 담당하며, width / padding / 내부 layout은 className과 children으로 사용하는 쪽에서 구성할 수 있습니다.

---

## Design Spec

- Radius: --radius-md
- Border: --color-snapdeck-300
- Overlay: --color-overlay-900-70

---

## Props

### defaultOpen

초기 modal open 상태입니다.

\`\`\`tsx
<Modal defaultOpen>
\`\`\`

---

### open

controlled modal open 상태입니다.

\`\`\`tsx
<Modal open={open}>
\`\`\`

---

### onOpenChange

modal open 상태 변경 핸들러입니다.

\`\`\`tsx
<Modal
  open={open}
  onOpenChange={setOpen}
/>
\`\`\`

---

### className

modal content wrapper에 custom className을 추가합니다.

\`\`\`tsx
<Modal.Content className="w-[45.6rem] p-24" />
\`\`\`

---

## Usage Guide

\`\`\`tsx
<Modal>
  <Modal.Trigger>
    <button>열기</button>
  </Modal.Trigger>

  <Modal.Content className="w-[33.6rem] p-16">
    <div>Modal Content</div>
  </Modal.Content>
</Modal>
\`\`\`
        `,
      },
    },
  },

  tags: ["autodocs"],

  argTypes: {
    children: {
      control: false,
      description: "modal 내부 콘텐츠",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <button className="bg-snapdeck-900 text-snapdeck-000 rounded-md px-12 py-8">
          모달 열기
        </button>
      </Modal.Trigger>

      <Modal.Content className="w-[33.6rem] p-16">
        <div className="flex flex-col gap-16">
          <Dialog.Title className="text-snapdeck-900 typo-head-sb-16">
            Modal Title
          </Dialog.Title>
          <Dialog.Description className="text-snapdeck-700 typo-body-rg-14">
            기본 Modal 예시입니다.
          </Dialog.Description>

          <div className="flex justify-end">
            <Modal.Close>
              <button className="bg-snapdeck-900 text-snapdeck-000 rounded-md px-12 py-8">
                닫기
              </button>
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  ),
};
