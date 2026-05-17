import { useState } from "react";

import { ChatSection } from "@/features/content/components/chatPrompt";
import { SlideContentViewer } from "@/features/content/components/slideContentViewer";
import { SLIDE_CONTENT_EXAMPLES } from "@/features/content/constants";
import { normalizeSlideOrders } from "@/features/content/utils";

const ContentPage = () => {
  const [slides, setSlides] = useState(SLIDE_CONTENT_EXAMPLES);

  const handleDelete = (slideId: number) => {
    setSlides((currentSlides) =>
      normalizeSlideOrders(
        currentSlides.filter((slide) => slide.id !== slideId),
      ),
    );
  };

  return (
    <div className="bg-snapdeck-100 flex h-dvh overflow-hidden">
      <main className="min-h-0 min-w-0 flex-1 overflow-hidden">
        <section className="h-full">
          <SlideContentViewer
            slides={slides}
            onDelete={handleDelete}
            onReorder={({ nextSlides }) => {
              setSlides(nextSlides);
            }}
          />
        </section>
      </main>

      <ChatSection className="h-full shrink-0" />
    </div>
  );
};

export default ContentPage;
