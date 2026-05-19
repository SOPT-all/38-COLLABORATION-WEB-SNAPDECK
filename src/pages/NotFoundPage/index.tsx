import { Link } from "react-router";

import { PATHS } from "@/app/router/paths";
import TextButton from "@/shared/ui/textButton";

const NotFoundPage = () => {
  return (
    <section className="flex min-h-dvh items-center justify-center">
      <div
        aria-hidden="true"
        className="bg-sub-blue-0/50 pointer-events-none absolute top-1/2 left-1/2 size-[73.2rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[7rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-[95%] gap-[14rem] select-none"
      >
        <span className="text-sub-blue-1/10 text-[15rem] leading-none font-bold blur-[0.4rem]">
          4
        </span>
        <span className="text-sub-blue-1/10 text-[15rem] leading-none font-bold blur-[0.4rem]">
          4
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <img
          src="/logo.svg"
          alt="404 에러"
          className="mb-20 h-[12rem] w-[12rem]"
        />

        <h1 className="text-snapdeck-800 typo-head-b-20">
          페이지를 찾을 수 없습니다
        </h1>

        <p className="text-snapdeck-400 typo-body-r-14 mt-12">
          요청하신 페이지가 삭제되었거나 주소가 변경되었어요.
        </p>

        <Link to={PATHS.home} className="mt-32">
          <TextButton variant="primary" size="lg">
            홈으로 이동
          </TextButton>
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
