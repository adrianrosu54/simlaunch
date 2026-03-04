import { useStore } from "@nanostores/react";
import { $preset, updatePreset } from "../stores/physics";
import Dropdown from "./Dropdown";
import SettingInput from "./SettingInput";

export default function ConfigSettings() {
  const preset = useStore($preset);
  return (
    <>
      <Dropdown title="Robot state">
        <SettingInput label="position x" realValue={preset.state.x} category={"distance"} onChange={(value) => updatePreset({type: "state", payload: {x: value}})} units={["m", "in"]} />
      </Dropdown>
    </>
  )
}