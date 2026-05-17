import HomeHeader from "@/features/home/components/HomeHeader";
import AiPrompt from "@/features/home/components/aiPrompt";
import UrlModal from "@/features/home/components/aiPrompt/UrlModal";
import DashBoard from "@/features/home/components/dashBoard/DashBoard";
import HomeTitle from "@/features/home/components/homeTitle/HomeTitle";
import useHomePrompt from "@/features/home/hooks/useHomePrompt";

const HomePage = () => {
  const { aiPromptProps, urlModalProps } = useHomePrompt();

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-sub-blue-0/50 pointer-events-none absolute top-[calc(4.7rem+(100vh-4.7rem)/2)] left-1/2 size-[63.2rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[5rem]"
      />
      <HomeHeader />
      <main className="relative z-10 flex h-[calc(100vh-4.7rem)] flex-col items-center justify-center gap-[3.1rem]">
        <HomeTitle />
        <AiPrompt {...aiPromptProps} />
        <DashBoard />
      </main>
      {urlModalProps ? <UrlModal {...urlModalProps} /> : null}
    </div>
  );
};

export default HomePage;
