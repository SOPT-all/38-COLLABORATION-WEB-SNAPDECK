const ChatAssistantLoading = () => {
  return (
    <div
      className="flex h-[1.6rem] items-center gap-[0.4rem]"
      role="status"
      aria-label="AI 응답 생성 중"
    >
      {[0, 150, 300].map((delayMs) => (
        <span
          key={delayMs}
          className="bg-snapdeck-400 size-[0.4rem] animate-pulse rounded-full"
          style={{ animationDelay: `${delayMs}ms` }}
        />
      ))}
    </div>
  );
};

export default ChatAssistantLoading;
