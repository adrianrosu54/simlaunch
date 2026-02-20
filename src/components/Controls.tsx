import type { ErrorBarData, NumericalInput, SliderInput } from "@/utils/inputTypes";
import FlywheelSlider from "./FlywheelSlider";
import CompassSlider from "./CompassSlider";
import ErrorBar from "./ErrorBar";

export default function Controls(
  {flywheelInput, errorInput, compassInput}: 
  {flywheelInput: SliderInput, errorInput: ErrorBarData, compassInput: NumericalInput}
) {
  return (
    <section className="h-56 w-full shrink flex justify-center items-center">
      <FlywheelSlider min={flywheelInput.min} max={flywheelInput.max} 
        value={flywheelInput.value} onChange={flywheelInput.onChange}
      />
      <ErrorBar error={errorInput.error} maxError={errorInput.maxError} 
        threshold={errorInput.threshold}/>
      <CompassSlider value={compassInput.value} onChange={compassInput.onChange}/>
    </section>
  );
}