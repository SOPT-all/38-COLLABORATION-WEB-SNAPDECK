import { ChatSection } from "@/features/content/components/chatPrompt";
import { SlideContentViewer } from "@/features/content/components/slideContentViewer";
import useContentDeckSlides from "@/features/content/hooks/useContentDeckSlides";

const CONTENT_DECK_ID = 1;

const ContentPage = () => {
  const {
    errorMessage,
    handleDelete,
    handleReorder,
    isError,
    isPending,
    slides,
  } = useContentDeckSlides(CONTENT_DECK_ID);

  return (
    <div className="bg-snapdeck-100 flex h-dvh overflow-hidden">
      <main className="min-h-0 min-w-0 flex-1 overflow-hidden">
        <section className="h-full">
          {isPending ? (
            <div className="text-snapdeck-400 typo-body-m-15 flex h-full items-center justify-center">
              덱 정보를 불러오는 중입니다.
            </div>
          ) : isError ? (
            <div className="text-sub-red typo-body-m-15 flex h-full items-center justify-center">
              {errorMessage}
            </div>
          ) : slides.length === 0 ? (
            <div className="text-snapdeck-400 typo-body-m-15 flex h-full items-center justify-center">
              표시할 슬라이드가 없습니다.
            </div>
          ) : (
            <SlideContentViewer
              slides={slides}
              onDelete={handleDelete}
              onReorder={handleReorder}
            />
          )}
        </section>
      </main>

      <ChatSection className="h-full shrink-0" />
    </div>
  );
};

export default ContentPage;
