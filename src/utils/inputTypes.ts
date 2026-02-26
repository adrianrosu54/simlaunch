export type FlywheelSliderInput = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

export type CompassAngle = {
  value: number;
  onChange: (value: number) => void;
};

export type ErrorBarData = {
  error: number;
  maxError: number;
  threshold: number;
}