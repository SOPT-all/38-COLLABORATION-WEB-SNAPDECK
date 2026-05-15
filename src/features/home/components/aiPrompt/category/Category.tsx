import { CheckIcon } from "@/assets";
import { cn } from "@/shared/utils/cn";

import {
  CATEGORY_OPTIONS,
  type CategoryValue,
} from "../../../constants/categoryOptions";
import CategoryPreview from "./CategoryPreview";

type CategoryProps = {
  value?: CategoryValue;
  handleChange: (value: CategoryValue | undefined) => void;
  className?: string;
};

const cardClassName = cn(
  "group flex h-[7.8rem] w-[13.5rem] flex-col",
  "rounded-[0.2rem] border border-transparent bg-snapdeck-000",
  "px-[0.5rem] pt-[0.6rem] pb-[0.6rem]",
  "transition-colors hover:border-snapdeck-300",
);

const Category = ({ value, handleChange, className }: CategoryProps) => {
  const handleCategoryClick = (categoryValue: CategoryValue) => {
    handleChange(value === categoryValue ? undefined : categoryValue);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,13.5rem)] gap-[2rem]",
        className,
      )}
      aria-label="Category"
      role="group"
    >
      {CATEGORY_OPTIONS.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            aria-pressed={isSelected}
            className={cn(cardClassName, isSelected && "border-snapdeck-300")}
            key={option.value}
            onClick={() => handleCategoryClick(option.value)}
            type="button"
          >
            <CategoryPreview type={option.value} />
            <span className="typo-caption-m-10 text-snapdeck-500 flex w-full items-center justify-center gap-[0.1rem] text-center">
              {option.label}
              {isSelected && (
                <CheckIcon
                  aria-hidden
                  className="text-snapdeck-900 size-[0.8rem]"
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Category;
