import { useEffect, useRef, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";

import Modal, { type ModalProps } from "./Modal";

const meta = {
  title: "Shared/Modal",
  component: Modal,

  parameters: {
    layout: "centered",

    docs: {
      description: {
        component: `
공통 Modal 컴포넌트입니다.

overlay 영역과 modal content를 createPortal로 분리 렌더링하며, 기본적으로 document.body에 마운트됩니다.

Storybook 환경에서는 preview 내부 렌더링을 위해 portalTarget을 별도로 전달할 수 있습니다.

---

## Features

- createPortal을 사용하여 overlay와 modal content를 렌더링합니다.
- 기본적으로 document.body에 mount되며, 필요 시 portalTarget을 통해 특정 HTMLElement 내부로 렌더링 위치를 변경할 수 있습니다.
- Modal이 open 상태일 때 ESC key를 입력하면 onClose가 호출되며 overlay(backdrop) 영역 클릭 시에도 modal close가 가능합니다.
- overlay click close 동작은 closeOnBackdrop prop으로 제어할 수 있으며 기본값은 true입니다.
- modal 내부 콘텐츠는 children 기반으로 구성합니다.

---

## Design Spec

- Width: 336px
- Min Height: 145px
- Radius: var(--radius-md)
- Border: var(--color-snapdeck-300)
- Overlay: var(--color-overlay-900-70)

---

## Props

### open

모달 open 상태입니다.

\`\`\`tsx
open={true}
\`\`\`

---

### onClose

모달 닫기 핸들러입니다.

- ESC key
- overlay click(closeOnBackdrop=true)

상황에서 호출됩니다.

\`\`\`tsx
onClose={() => setOpen(false)}
\`\`\`

---

### closeOnBackdrop

overlay 클릭 시 modal close 여부입니다.

기본값은 true입니다.

\`\`\`tsx
closeOnBackdrop={false}
\`\`\`

---

### className

modal content wrapper에 custom class를 추가합니다.

\`\`\`tsx
className="p-24"
\`\`\`

---

### portalTarget

modal portal mount target입니다.

기본값은 document.body이며,
Storybook preview 내부 렌더링 시 custom HTMLElement를 전달할 수 있습니다.

\`\`\`tsx
portalTarget={containerRef.current}
\`\`\`

---

## Usage Guide

\`\`\`tsx
const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
>
  <div>
    Modal Content
  </div>
</Modal>
\`\`\`

---

## Storybook Preview

Storybook Docs 환경에서는
modal이 document.body 전체를 덮지 않도록
preview container를 portalTarget으로 전달합니다.

\`\`\`tsx
<Modal
  {...args}
  portalTarget={target}
>
  <div>Modal Content</div>
</Modal>
\`\`\`
        `,
      },
    },
  },

  tags: ["autodocs"],

  argTypes: {
    open: {
      control: "boolean",
      description: "모달 open 상태",
    },

    onClose: {
      action: "closed",
      description: "모달 닫기 핸들러",
    },

    closeOnBackdrop: {
      control: "boolean",
      description: "overlay 클릭 시 modal close 여부",
    },

    className: {
      control: "text",
      description: "modal wrapper custom className",
    },

    children: {
      control: false,
      description: "modal 내부 콘텐츠",
    },

    portalTarget: {
      control: false,
      description: "portal mount target HTMLElement",
    },
  },

  args: {
    open: true,
    closeOnBackdrop: true,
    onClose: () => {},
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ModalPreview = (args: ModalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(containerRef.current);
  }, []);

  return (
    <div ref={containerRef} className="relative h-120 w-200">
      {target && (
        <Modal {...args} portalTarget={target}>
          <div className="text-snapdeck-900 typo-head-sb-16 p-16">
            Modal Content
          </div>
        </Modal>
      )}
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ModalPreview {...args} />,
};
