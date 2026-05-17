import { ChatSection } from "@/features/content/components/chatPrompt";
import { useState } from "react";

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
    <div className="bg-snapdeck-100 flex h-dvh justify-end overflow-hidden">
      <ChatSection className="h-full" />
    </div>
    <main>
      <section>
        <SlideContentViewer
          slides={slides}
          onDelete={handleDelete}
          onReorder={({ nextSlides }) => {
            setSlides(nextSlides);
          }}
        />
      </section>
    </main>
  );
};

export default ContentPage;
