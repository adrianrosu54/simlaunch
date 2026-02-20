import type { NumericalInput } from "@/utils/inputs";
import FlywheelSlider from "./FlywheelSlider";

export default function Controls({flywheelInput}: {flywheelInput: NumericalInput}) {
  return (
    <section className="w-full">
      <FlywheelSlider min={flywheelInput.min} max={flywheelInput.max} 
        value={flywheelInput.value} onChange={flywheelInput.onChange}
      />
    </section>
  );
}