import { useMemo, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { deriveTextFieldModalStatus } from "@/shared/libs/urlValidation";
import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";
import {
  TextFieldModal,
  type TextFieldModalChannel,
  type TextFieldModalStatus,
} from "@/shared/ui/textFieldModal/TextFieldModal";

const meta = {
  title: "Shared/TextFieldModal",
  component: TextFieldModal,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
모달용 URL 텍스트 필드 동작입니다.

- **channel**을 통해 \`notion\` / \`web\`으로 분기할 수 있습니다.

- **[default]** 텍스트 필드 비어 있음 → 모달 **CTA 비활성(회색)**과 짝(CTA는 모달 쪽 구현)
- **[active]** 유효한 URL 입력 시 → 필드 하단 **"유효한 URL"** (\`channel="web"\`) / **"유효한 Notion URL"** (\`channel="notion"\`), 체크 아이콘·성공 문구는 **녹색** (\`--color-sub-green\`)
- **[negative]** 형식 오류 또는 미입력 시 → 빨간 외곽선 + 하단 안내 문구 (\`channel\`에 따라 web/notion 카피)

**default → active → negative**  
\`status\`는 필드 안에서 판별하지 않고, **\`@/shared/libs/urlValidation\`**의 \`deriveTextFieldModalStatus\` 등으로 부모가 계산해 넘깁니다. 예: 비어 있고 아직 오류 표시 안 함 → \`default\`; 비어 있고 blur(또는 제출) 후 → \`negative\`; 유효 URL → \`active\`; 그 외 문자열 → \`negative\`.

**InteractiveStatusFlow 스토리**  
스토리북에서만 쓰는 **데모**입니다. \`channel="notion"\` / \`channel="web"\` 필드를 나란히 두고, 각각 \`useState\`로 값·blur를 관리한 뒤 \`deriveTextFieldModalStatus\`로 \`status\`를 넣습니다. 실제 모달에 자동으로 붙는 동작은 아니며, **부모에서 어떻게 유틸과 연결하는지** 참고용입니다. **초기화**는 스토리 전용으로 상태만 리셋합니다.

디자인 시스템에 있는 액티브 중 타이핑 속성은 별도 처리하지 않았습니다.

**모달 범위(이 컴포넌트 밖)**  
외부 클릭 닫힘 · 취소 닫힘 · CTA 클릭 시 합의 범위 외 동작 등은 모달/페이지에서 처리합니다.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: [
        "default",
        "active",
        "negative",
      ] satisfies TextFieldModalStatus[],
      description: "default · active · negative",
    },
    channel: {
      control: "select",
      options: ["notion", "web"] satisfies TextFieldModalChannel[],
      description: "성공·오류 기본 문구 분기",
    },
    disabled: {
      control: "boolean",
      description: "입력 비활성(로딩 등). true면 회색 셸.",
    },
    placeholder: { description: "빈 필드 힌트" },
    successMessage: { description: "기본 성공 문구 대체(선택)" },
    errorMessage: { description: "기본 오류 문구 대체(선택)" },
    containerClassName: {
      description: "최상위 래퍼 `cn()` 클래스",
      table: { type: { summary: "string" } },
    },
    className: { description: "`input` 전용 클래스" },
  },
} satisfies Meta<typeof TextFieldModal>;

export default meta;

type Story = StoryObj<typeof meta>;

/** [default] · notion — 비어 있음 */
export const DefaultNotion: Story = {
  args: {
    status: "default",
    channel: "notion",
    placeholder: "https://your-workspace.notion.site/...",
  },
};

/** [default] · web */
export const DefaultWeb: Story = {
  args: {
    status: "default",
    channel: "web",
    placeholder: "https://example.com/",
  },
};

/** [active] · notion */
export const ActiveNotion: Story = {
  args: {
    status: "active",
    channel: "notion",
    defaultValue: "https://example.notion.site/foo",
    readOnly: true,
  },
};

/** [active] · web */
export const ActiveWeb: Story = {
  args: {
    status: "active",
    channel: "web",
    defaultValue: "https://example.com/",
    readOnly: true,
  },
};

/** [negative] · notion — 미입력/오류 */
export const NegativeNotion: Story = {
  args: {
    status: "negative",
    channel: "notion",
    defaultValue: "",
    readOnly: true,
    "aria-label": "Notion URL",
  },
};

/** [negative] · web */
export const NegativeWeb: Story = {
  args: {
    status: "negative",
    channel: "web",
    defaultValue: "bad",
    readOnly: true,
  },
};

/** 비활성(로딩 등) */
export const InputDisabled: Story = {
  args: {
    status: "default",
    disabled: true,
    placeholder: "https://...",
  },
};

/** 상태 한 줄: default | active | negative */
export const StatusRow: Story = {
  render: () => (
    <div className="flex max-w-[96rem] flex-col gap-[2rem]">
      <p className="typo-caption-m-10 text-snapdeck-500">
        열: <strong>status</strong> — default · active · negative (입력창 아이콘
        없음)
      </p>
      <div className="grid gap-[1.6rem] md:grid-cols-3">
        <div className="flex flex-col gap-[0.6rem]">
          <span className="typo-caption-m-10 text-snapdeck-500">
            default · notion
          </span>
          <TextFieldModal
            status="default"
            channel="notion"
            placeholder="https://..."
          />
        </div>
        <div className="flex flex-col gap-[0.6rem]">
          <span className="typo-caption-m-10 text-snapdeck-500">
            active · notion
          </span>
          <TextFieldModal
            status="active"
            channel="notion"
            defaultValue="https://x.notion.site/abc"
            readOnly
          />
        </div>
        <div className="flex flex-col gap-[0.6rem]">
          <span className="typo-caption-m-10 text-snapdeck-500">
            negative · notion
          </span>
          <TextFieldModal
            status="negative"
            channel="notion"
            defaultValue="x"
            readOnly
          />
        </div>
      </div>
    </div>
  ),
};

/** 데모: Notion·Web 각각 타이핑·blur로 default → active → negative (상태는 필드끼리 독립) */
export const InteractiveStatusFlow: Story = {
  render: () => <InteractiveStatusFlowDemo />,
};

function InteractiveUrlFieldBlock({
  channel,
}: {
  channel: TextFieldModalChannel;
}) {
  const [value, setValue] = useState("");
  const [blurred, setBlurred] = useState(false);

  const status = useMemo(
    () => deriveTextFieldModalStatus(value, blurred, channel),
    [value, blurred, channel],
  );

  const isNotion = channel === "notion";
  const label = isNotion ? "Notion" : "Web";
  const placeholder = isNotion
    ? "https://your-workspace.notion.site/..."
    : "https://example.com/";

  return (
    <section
      className="rounded-field border-snapdeck-200 flex flex-col gap-[0.8rem] border p-[1.2rem]"
      aria-labelledby={`interactive-${channel}-heading`}
    >
      <h3
        id={`interactive-${channel}-heading`}
        className="typo-caption-m-10 text-snapdeck-600"
      >
        {label} ·{" "}
        <code className="text-snapdeck-500">channel=&quot;{channel}&quot;</code>
      </h3>
      <TextFieldModal
        channel={channel}
        status={status}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setBlurred(true)}
        placeholder={placeholder}
        aria-label={isNotion ? "Notion URL" : "웹 URL"}
      />
      <p className="typo-caption-m-10 text-snapdeck-500">
        현재 status:{" "}
        <code className="bg-snapdeck-100 rounded px-[0.4rem] py-[0.1rem]">
          {status}
        </code>
        {" · "}
        <button
          type="button"
          className="typo-caption-m-10 text-snapdeck-600 underline"
          onClick={() => {
            setValue("");
            setBlurred(false);
          }}
        >
          초기화
        </button>
      </p>
    </section>
  );
}

function InteractiveStatusFlowDemo() {
  return (
    <div className="flex max-w-[48rem] flex-col gap-[1.6rem]">
      <p className="typo-caption-m-10 text-snapdeck-500">
        두 필드는 상태가 서로 독립입니다. 동일 규칙으로{" "}
        <strong>default → active → negative</strong>를 확인할 수 있습니다.
      </p>
      <div className="flex flex-col gap-[1.6rem] md:flex-row md:items-start md:gap-[2rem]">
        <div className="min-w-0 flex-1">
          <InteractiveUrlFieldBlock channel="notion" />
        </div>
        <div className="min-w-0 flex-1">
          <InteractiveUrlFieldBlock channel="web" />
        </div>
      </div>
    </div>
  );
}
