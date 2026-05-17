import { type ComponentProps, useId } from "react";

import { useNavigate } from "react-router";

import { PATHS } from "@/app/router/paths";
import { ChatSection } from "@/features/content/components/chatPrompt";
import { SlideContentViewer } from "@/features/content/components/slideContentViewer";
import { SlideTitleViewer } from "@/features/content/components/slideTitle";
import useContentPageSlides from "@/features/content/hooks/useContentPageSlides";
import BackHeader from "@/shared/ui/header/BackHeader";

type ContentPageProps = {
  turns?: ComponentProps<typeof ChatSection>["turns"];
};

const ContentPage = ({ turns }: ContentPageProps) => {
  const navigate = useNavigate();
  const titleLabelId = useId();
  const {
    slides,
    deckTitle,
    setDeckTitle,
    slidePreviews,
    handleSlideDelete,
    handleSlideReorder,
  } = useContentPageSlides();

  return (
    <div className="bg-snapdeck-000 flex h-dvh flex-col overflow-hidden">
      <BackHeader onBack={() => navigate(PATHS.home)} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main className="bg-snapdeck-000 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-[7.2rem] pt-[2.5rem]">
          <h1 className="text-snapdeck-800 typo-head-b-20 w-full shrink-0 text-center">
            Content structure
          </h1>

          <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-[1.4rem] pr-12">
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
          </div>
        </main>

        <ChatSection className="h-full shrink-0" turns={turns} />
      </div>
    </div>
  );
};

export default ContentPage;
