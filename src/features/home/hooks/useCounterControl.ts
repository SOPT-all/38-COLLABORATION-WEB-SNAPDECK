import type { CounterValueProps } from "@/features/home/types/counter";

type UseCounterControlProps = Omit<CounterValueProps, "className">;

const useCounterControl = ({
  value,
  min = 1,
  max = 5,
  handleChange,
}: UseCounterControlProps) => {
  const clampedValue = Math.min(Math.max(value, min), max);
  const isMinValue = clampedValue <= min;
  const isMaxValue = clampedValue >= max;

  const handleDecreaseClick = () => {
    handleChange(Math.max(clampedValue - 1, min));
  };

  const handleIncreaseClick = () => {
    handleChange(Math.min(clampedValue + 1, max));
  };

  return {
    clampedValue,
    isMinValue,
    isMaxValue,
    handleDecreaseClick,
    handleIncreaseClick,
  };
};

export default useCounterControl;
