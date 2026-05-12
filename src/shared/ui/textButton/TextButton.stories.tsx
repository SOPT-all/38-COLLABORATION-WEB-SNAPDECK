import type { ReactNode } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { ResearchIcon, RightSmallIcon, WebIcon } from "@/assets";

import TextButton, { type TextButtonProps } from "./TextButton";

const variantOptions = ["primary", "neutral", "danger"] as const;
const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;
const iconSizeOptions = ["sm", "md", "lg"] as const;
const stateOptions = ["default", "active"] as const;

const meta = {
  title: "Shared/TextButton",
  component: TextButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    variant: "primary",
    size: "sm",
    children: "생성",
  },
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
    },
    size: {
      control: "select",
      options: sizeOptions,
    },
    iconSize: {
      control: "select",
      options: iconSizeOptions,
    },
    state: {
      control: "select",
      options: stateOptions,
    },
    fullWidth: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    leftIcon: {
      control: false,
    },
    rightIcon: {
      control: false,
    },
  },
} satisfies Meta<typeof TextButton>;

export default meta;

type Story = StoryObj<typeof meta>;

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

interface PreviewCardProps {
  title: string;
  description: string;
  usage: string;
  propsText: string;
  children: ReactNode;
}

interface StateRuleCardProps {
  title: string;
  description: string;
  usage: string;
  propsText: string;
  children: ReactNode;
}

const renderCentered = (args: TextButtonProps) => (
  <div className="flex min-w-[32rem] items-center justify-center p-32">
    <TextButton {...args} />
  </div>
);

const Section = ({ title, description, children }: SectionProps) => (
  <section className="border-snapdeck-300 bg-snapdeck-000 shadow-elevation-1 flex flex-col gap-16 rounded-md border p-24">
    <div className="flex flex-col gap-4">
      <h2 className="typo-head-b-20 text-snapdeck-900">{title}</h2>
      {description ? (
        <p className="typo-body-r-14 text-snapdeck-500">{description}</p>
      ) : null}
    </div>
    {children}
  </section>
);

const PreviewCard = ({
  title,
  description,
  usage,
  propsText,
  children,
}: PreviewCardProps) => (
  <article className="border-snapdeck-300 bg-snapdeck-100 grid grid-cols-[1fr_auto] gap-16 rounded-sm border p-16">
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="typo-head-sb-16 text-snapdeck-900">{title}</h3>
        <p className="typo-body-r-14 text-snapdeck-500">{description}</p>
      </div>
      <dl className="flex flex-col gap-4">
        <div className="flex gap-8">
          <dt className="typo-caption-m-11 text-snapdeck-500 min-w-[5.6rem]">
            Usage
          </dt>
          <dd className="typo-caption-r-10 text-snapdeck-600">{usage}</dd>
        </div>
        <div className="flex gap-8">
          <dt className="typo-caption-m-11 text-snapdeck-500 min-w-[5.6rem]">
            Props
          </dt>
          <dd className="typo-caption-r-10 text-snapdeck-600 font-mono">
            {propsText}
          </dd>
        </div>
      </dl>
    </div>
    <div className="flex min-w-[26rem] items-center justify-center">
      {children}
    </div>
  </article>
);

const StateRuleCard = ({
  title,
  description,
  usage,
  propsText,
  children,
}: StateRuleCardProps) => (
  <article className="border-snapdeck-300 bg-snapdeck-100 flex min-h-[22rem] flex-col justify-between gap-16 rounded-sm border p-16">
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="typo-head-sb-16 text-snapdeck-900">{title}</h3>
        <p className="typo-body-r-14 text-snapdeck-500">{description}</p>
      </div>
      <dl className="flex flex-col gap-8">
        <div className="grid grid-cols-[5.6rem_minmax(0,1fr)] gap-8">
          <dt className="typo-caption-m-11 text-snapdeck-500">Usage</dt>
          <dd className="typo-caption-r-10 text-snapdeck-600">{usage}</dd>
        </div>
        <div className="grid grid-cols-[5.6rem_minmax(0,1fr)] gap-8">
          <dt className="typo-caption-m-11 text-snapdeck-500">Props</dt>
          <dd className="typo-caption-r-10 text-snapdeck-600 font-mono">
            {propsText}
          </dd>
        </div>
      </dl>
    </div>
    <div className="flex min-h-[4.4rem] items-center justify-center">
      {children}
    </div>
  </article>
);

const FigmaGuide = () => (
  <div className="bg-snapdeck-100 text-snapdeck-900 min-h-screen p-32">
    <div className="mx-auto flex max-w-[104rem] flex-col gap-32">
      <header className="flex flex-col gap-8">
        <h1 className="typo-head-b-20">TextButton Usage Guide</h1>
        <p className="typo-body-r-14 text-snapdeck-500">
          Figma 버튼 컴포넌트를 TextButton props로 매핑하고, 도메인별 사용
          기준을 정리합니다.
        </p>
      </header>

      <Section
        title="Figma Components"
        description="Figma 이름은 참고용으로만 보고, 실제 구현은 variant, size, icon, state 조합으로 맞춥니다."
      >
        <div className="flex flex-col gap-16">
          <PreviewCard
            title="btn_homeicn"
            description="검색 아이콘이 있는 홈 진입 버튼"
            usage="HomePage에서 Web Research 같은 탐색 진입 액션에 사용합니다."
            propsText='variant="primary" size="lg" iconSize="lg" leftIcon'
          >
            <TextButton
              variant="primary"
              size="lg"
              iconSize="lg"
              leftIcon={<ResearchIcon />}
            >
              Web Research
            </TextButton>
          </PreviewCard>

          <PreviewCard
            title="btn_action"
            description="짧은 주요 액션 버튼"
            usage="생성, 저장, 추가처럼 화면 안에서 즉시 실행되는 주요 액션에 사용합니다."
            propsText='variant="primary" size="sm"'
          >
            <TextButton variant="primary" size="sm">
              생성
            </TextButton>
          </PreviewCard>

          <PreviewCard
            title="btn_type"
            description="옵션 또는 타입 선택 버튼"
            usage="ContentPage에서 Styles, Type 같은 선택 가능한 필터/타입 버튼에 사용합니다."
            propsText='variant="primary" size="md" state="active" rightIcon'
          >
            <div className="flex items-center gap-12">
              <TextButton
                variant="primary"
                size="md"
                rightIcon={<RightSmallIcon />}
              >
                Styles
              </TextButton>
              <TextButton
                variant="primary"
                size="md"
                state="active"
                rightIcon={<RightSmallIcon />}
              >
                Styles
              </TextButton>
            </div>
          </PreviewCard>

          <PreviewCard
            title="btn_cancel / btn_out"
            description="취소와 이탈 액션 버튼"
            usage="모달 닫기에는 neutral, 나가기처럼 되돌리기 어려운 이탈 액션에는 danger를 사용합니다."
            propsText='variant="neutral | danger" size="xs"'
          >
            <div className="flex items-center gap-12">
              <TextButton variant="neutral" size="xs">
                취소
              </TextButton>
              <TextButton variant="danger" size="xs">
                나가기
              </TextButton>
            </div>
          </PreviewCard>

          <PreviewCard
            title="btn_modalicn"
            description="모달 안에서 쓰는 full-width CTA"
            usage="URL 입력 모달의 제출 버튼에 사용합니다. 빈 값/유효하지 않은 값은 disabled, 유효한 값은 enabled로 표현합니다."
            propsText='variant="primary" size="xl" fullWidth leftIcon'
          >
            <div className="flex w-[25.2rem] flex-col gap-12">
              <TextButton
                variant="primary"
                size="xl"
                leftIcon={<WebIcon />}
                fullWidth
                disabled
              >
                스크랩
              </TextButton>
              <TextButton
                variant="primary"
                size="xl"
                leftIcon={<WebIcon />}
                fullWidth
              >
                스크랩
              </TextButton>
              <TextButton
                variant="primary"
                size="xl"
                state="active"
                leftIcon={<WebIcon />}
                fullWidth
              >
                스크랩
              </TextButton>
            </div>
          </PreviewCard>
        </div>
      </Section>

      <Section
        title="State Rules"
        description="hover는 CSS 상태로만 관리하고, disabled는 실제 button disabled를 사용합니다. state=active는 선택 유지나 완료 상태처럼 화면에 남아야 하는 상태에만 사용합니다."
      >
        <div className="grid grid-cols-3 gap-16">
          <StateRuleCard
            title="Default"
            description="기본 클릭 가능 상태"
            usage="일반 액션 또는 유효한 입력을 제출할 수 있는 상태"
            propsText='state="default"'
          >
            <TextButton variant="primary" size="sm">
              생성
            </TextButton>
          </StateRuleCard>
          <StateRuleCard
            title="Active"
            description="선택이 유지되는 상태"
            usage="선택된 type, 완료된 CTA처럼 화면에 남는 상태"
            propsText='state="active"'
          >
            <TextButton
              variant="primary"
              size="md"
              state="active"
              rightIcon={<RightSmallIcon />}
            >
              Styles
            </TextButton>
          </StateRuleCard>
          <StateRuleCard
            title="Disabled"
            description="클릭 불가능한 상태"
            usage="필수 입력값이 비어있거나 유효성 검사를 통과하지 못한 상태"
            propsText="disabled"
          >
            <TextButton variant="primary" size="sm" disabled>
              생성
            </TextButton>
          </StateRuleCard>
        </div>
      </Section>
    </div>
  </div>
);

export const Playground: Story = {
  render: renderCentered,
};

export const UsageGuide: Story = {
  render: FigmaGuide,
  parameters: {
    layout: "fullscreen",
  },
};

export const HomeSearch: Story = {
  args: {
    variant: "primary",
    size: "lg",
    iconSize: "lg",
    leftIcon: <ResearchIcon />,
    children: "Web Research",
  },
  render: renderCentered,
};

export const ContentType: Story = {
  args: {
    variant: "primary",
    size: "md",
    rightIcon: <RightSmallIcon />,
    state: "active",
    children: "Styles",
  },
  render: renderCentered,
};

export const ModalCta: Story = {
  args: {
    variant: "primary",
    size: "xl",
    leftIcon: <WebIcon />,
    fullWidth: true,
    children: "스크랩",
  },
  render: (args) => (
    <div className="flex min-w-[34rem] items-center justify-center p-32">
      <div className="w-[25.2rem]">
        <TextButton {...args} />
      </div>
    </div>
  ),
};
