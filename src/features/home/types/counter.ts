export type CounterValueProps = {
  value: number;
  handleChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};
