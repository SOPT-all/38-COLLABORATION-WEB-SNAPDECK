import {
  SOURCE_ACTION_OPTIONS,
  type SourceActionValue,
} from "@/features/home/constants/sourceActions";
import TextButton from "@/shared/ui/textButton";

interface SourceActionsProps {
  handleSourceActionClick: (value: SourceActionValue) => void;
}

const SourceActions = ({ handleSourceActionClick }: SourceActionsProps) => {
  return (
    <div className="flex items-center gap-[0.8rem]">
      {SOURCE_ACTION_OPTIONS.map(({ value, label, Icon }) => (
        <TextButton
          variant="primary"
          size="sm"
          iconSize="sm"
          className="typo-caption-r-8 rounded-[0.6rem] px-[0.8rem]"
          key={value}
          leftIcon={<Icon className="[--icon-stroke-width:1.5]" />}
          onClick={() => handleSourceActionClick(value)}
        >
          {label}
        </TextButton>
      ))}
    </div>
  );
};

export default SourceActions;
