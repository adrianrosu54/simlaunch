import type { NumericalInput, SliderInput } from "@/utils/inputTypes";
import FlywheelSlider from "./FlywheelSlider";
import CompassSlider from "./CompassSlider";

export default function Controls(
  {flywheelInput, compassInput}: 
  {flywheelInput: SliderInput, compassInput: NumericalInput}
) {
  return (
    <section className="h-56 w-full shrink flex justify-center items-center">
      <FlywheelSlider min={flywheelInput.min} max={flywheelInput.max} 
        value={flywheelInput.value} onChange={flywheelInput.onChange}
      />
      <CompassSlider value={compassInput.value} onChange={compassInput.onChange}/>
    </section>
  );
}