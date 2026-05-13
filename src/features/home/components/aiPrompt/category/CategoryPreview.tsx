import { cn } from "@/shared/utils/cn";

import type { CategoryValue } from "../../../constants/categoryOptions";

interface ShapeProps {
  className: string;
}

const shapeClassName =
  "rounded-[0.4rem] bg-snapdeck-300 transition-colors group-hover:bg-snapdeck-400";
const reportBarClassName = "w-[1.09rem] rounded-t-[0.2rem] rounded-b-none";

const Shape = ({ className }: ShapeProps) => (
  <div className={cn(shapeClassName, className)} />
);

const CategoryPreview = ({ type }: { type: CategoryValue }) => {
  if (type === "keynote") {
    return (
      <div className="flex h-[5.5rem] w-full flex-col gap-[0.3rem]">
        <div className="flex flex-col gap-[0.3rem]">
          <Shape className="h-[0.3rem] w-[7.3rem]" />
          <Shape className="h-[0.3rem] w-[8.4rem]" />
        </div>
        <Shape className="h-[4.1rem] w-full" />
      </div>
    );
  }

  if (type === "presentation") {
    return (
      <div className="flex h-[5.3rem] w-full flex-col gap-[0.86rem]">
        <Shape className="h-[0.32rem] w-[7.09rem]" />
        <div className="grid grid-cols-[7.1rem_1fr] gap-[0.8rem]">
          <Shape className="h-[4.1rem]" />
          <div className="flex h-[4.1rem] flex-col justify-center gap-[0.76rem]">
            <div className="flex flex-col gap-[0.43rem]">
              <Shape className="h-[0.2rem] w-full" />
              <Shape className="h-[0.2rem] w-full" />
              <Shape className="h-[0.2rem] w-full" />
            </div>
            <div className="flex flex-col gap-[0.43rem]">
              <Shape className="h-[0.2rem] w-full" />
              <Shape className="h-[0.2rem] w-full" />
              <Shape className="h-[0.2rem] w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "report") {
    return (
      <div className="flex h-[5.3rem] w-full flex-col gap-[1rem]">
        <Shape className="h-[0.3rem] w-[5rem]" />
        <div className="grid grid-cols-[4.8rem_1fr] gap-[0.6rem]">
          <div className="flex items-end gap-[0.2rem]">
            <Shape className={cn(reportBarClassName, "h-[2.8rem]")} />
            <Shape className={cn(reportBarClassName, "h-[4rem]")} />
            <Shape className={cn(reportBarClassName, "h-[2.1rem]")} />
            <Shape className={cn(reportBarClassName, "h-[3.3rem]")} />
          </div>
          <div className="mt-0.5 flex flex-col gap-[0.5rem]">
            <div className="flex flex-col gap-[0.2rem]">
              <Shape className="h-[0.2rem] w-full" />
              <Shape className="h-[0.2rem] w-full" />
              <Shape className="h-[0.2rem] w-full" />
              <Shape className="h-[0.2rem] w-[4.9rem]" />
            </div>
            <div className="flex flex-col gap-[0.2rem]">
              <Shape className="h-[0.2rem] w-full" />
              <Shape className="h-[0.2rem] w-full" />
              <Shape className="h-[0.2rem] w-[3.5rem]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[5.3rem] w-full flex-col gap-[0.4rem]">
      <Shape className="h-[0.3rem] w-[4.6rem]" />
      <div className="grid grid-cols-2 gap-x-[0.4rem] gap-y-[0.2rem]">
        <Shape className="h-[2.2rem]" />
        <Shape className="h-[2.2rem]" />
        <Shape className="h-[2.2rem]" />
        <Shape className="h-[2.2rem]" />
      </div>
    </div>
  );
};

export default CategoryPreview;
