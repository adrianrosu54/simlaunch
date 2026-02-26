import type { ErrorBarData, CompassAngle, FlywheelSliderInput } from "../../utils/inputTypes";
import FlywheelSlider from "../controls/FlywheelSlider";
import CompassSlider from "../controls/CompassSlider";
import ErrorBar from "./ErrorBar";

export default function ControlPanel(
  {flywheelInput, errorInput, compassInput}: 
  {flywheelInput: FlywheelSliderInput, errorInput: ErrorBarData, compassInput: CompassAngle}
) {
  return (
    <section className="h-60 w-full flex justify-center items-center">
      <FlywheelSlider min={flywheelInput.min} max={flywheelInput.max} 
        value={flywheelInput.value} onChange={flywheelInput.onChange}
      />
      <ErrorBar error={errorInput.error} maxError={errorInput.maxError} 
        threshold={errorInput.threshold}/>
      <CompassSlider value={compassInput.value} onChange={compassInput.onChange}/>
    </section>
  );
}