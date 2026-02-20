export type NumericalInput = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};