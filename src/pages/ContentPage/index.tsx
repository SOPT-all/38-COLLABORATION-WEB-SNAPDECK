import { type ComponentProps, useId } from "react";

import { ChatSection } from "@/features/content/components/chatPrompt";
import { SlideContentViewer } from "@/features/content/components/slideContentViewer";
import { SlideTitleViewer } from "@/features/content/components/slideTitle";
import { CONTENT_PAGE_INITIAL_CHAT_TURNS } from "@/features/content/constants/contentPage";
import { CONTENT_PAGE_LEAVE_CONFIRM } from "@/features/content/constants/contentPageLeaveConfirm";
import useContentPageDeck from "@/features/content/hooks/useContentPageDeck";
import useContentPageLeaveConfirm from "@/features/content/hooks/useContentPageLeaveConfirm";
import BackHeader from "@/shared/ui/header/BackHeader";
import ConfirmModal from "@/shared/ui/modal/confirmModal";

export type ContentPageProps = {
  turns?: ComponentProps<typeof ChatSection>["turns"];
  /** Storybook 스냅샷용 — 이탈 확인 모달 초기 오픈 */
  initialLeaveModalOpen?: boolean;
};

const ContentPage = ({
  turns,
  initialLeaveModalOpen = false,
}: ContentPageProps) => {
  const titleLabelId = useId();
  const { pageContainerRef, leaveConfirmModal, handleBackClick } =
    useContentPageLeaveConfirm({ initialOpen: initialLeaveModalOpen });
  const {
    slides,
    deckTitle,
    setDeckTitle,
    slidePreviews,
    handleSlideDelete,
    handleSlideReorder,
    handleSlideAdd,
    isPending,
    isError,
    errorMessage,
  } = useContentPageDeck();

  const renderSlidePanel = () => {
    if (isPending) {
      return (
        <div className="text-snapdeck-400 typo-body-m-15 flex min-h-0 flex-1 items-center justify-center">
          덱 정보를 불러오는 중입니다.
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-sub-red typo-body-m-15 flex min-h-0 flex-1 items-center justify-center">
          {errorMessage}
        </div>
      );
    }

    if (slides.length === 0) {
      return (
        <div className="text-snapdeck-400 typo-body-m-15 flex min-h-0 flex-1 items-center justify-center">
          표시할 슬라이드가 없습니다.
        </div>
      );
    }

    return (
      <>
        <SlideTitleViewer
          labelId={titleLabelId}
          title={deckTitle}
          slides={slidePreviews}
          onTitleChange={setDeckTitle}
          className="w-full shrink-0"
        />

        <SlideContentViewer
          slides={slides}
          onDelete={handleSlideDelete}
          onReorder={handleSlideReorder}
          className="min-h-0 w-full flex-1"
        />
      </>
    );
  };

  return (
    <div
      ref={pageContainerRef}
      className="bg-snapdeck-000 relative flex h-dvh max-h-full flex-col overflow-hidden"
    >
      <BackHeader onBack={handleBackClick} />

      <ConfirmModal {...CONTENT_PAGE_LEAVE_CONFIRM} {...leaveConfirmModal} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main className="bg-snapdeck-000 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-[7.2rem] py-[2.5rem]">
          <h1 className="text-snapdeck-800 typo-head-b-20 w-full shrink-0 text-center">
            Content structure
          </h1>

          <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-[1.4rem] pr-12">
            {renderSlidePanel()}
          </div>
        </main>

        <ChatSection
          className="h-full shrink-0"
          turns={turns}
          initialTurns={CONTENT_PAGE_INITIAL_CHAT_TURNS}
          onSubmit={handleSlideAdd}
        />
      </div>
    </div>
  );
};

export default ContentPage;
