export type SliderInput = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

export type NumericalInput = {
  value: number;
  onChange: (value: number) => void;
};
