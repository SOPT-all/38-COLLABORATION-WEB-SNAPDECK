import { ChatSection } from "@/features/content/components/chatPrompt";

const ContentPage = () => {
  return (
    <div className="bg-snapdeck-100 flex h-dvh justify-end overflow-hidden">
      <ChatSection className="h-full" />
    </div>
  );
};

export default ContentPage;
