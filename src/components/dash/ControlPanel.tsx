import type { ErrorBarData, CompassAngle, FlywheelSliderInput } from "../../utils/inputTypes";
import FlywheelSlider from "../controls/FlywheelSlider";
import CompassSlider from "../controls/CompassSlider";

export default function ControlPanel(
  {flywheelInput, compassInput}: 
  {flywheelInput: FlywheelSliderInput, compassInput: CompassAngle}
) {
  return (
    <section className="h-60 w-full flex justify-center items-center">
      <FlywheelSlider min={flywheelInput.min} max={flywheelInput.max} 
        value={flywheelInput.value} onChange={flywheelInput.onChange}
      />
      <CompassSlider value={compassInput.value} onChange={compassInput.onChange}/>
    </section>
  );
}