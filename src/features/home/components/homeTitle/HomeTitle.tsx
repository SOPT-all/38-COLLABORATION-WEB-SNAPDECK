const HomeTitle = () => {
  return (
    <section className="flex flex-col items-center">
      <span className="typo-caption-r-8 border-snapdeck-300 bg-snapdeck-000 text-snapdeck-700 hover:border-sub-blue-2 hover:text-sub-blue-2 mb-[1rem] flex h-[2.3rem] items-center justify-center rounded-[3.2rem] border px-[1.2rem] py-[0.6rem]">
        #1 Product of the Week
      </span>
      <h1 className="typo-head-b-20 text-sub-blue-1 mb-[0.6rem]">
        What's your next big idea?
      </h1>
      <p className="typo-caption-r-10 text-snapdeck-400">
        @를 입력해 명령어를 사용하고, 프레젠테이션 세부 내용을 입력하세요
      </p>
    </section>
  );
};

export default HomeTitle;
