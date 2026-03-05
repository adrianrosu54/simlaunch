import { useStore } from "@nanostores/react";
import { $preset, updatePreset } from "../stores/physics";
import Dropdown from "./Dropdown";
import SettingInput from "./SettingInput";

export default function ConfigSettings() {
  const preset = useStore($preset);
  return (
    <>
      <Dropdown title="Robot state">
        <SettingInput label="Position x" realValue={preset.state.x} category="distance" 
          onChange={(value) => updatePreset({type: "state", payload: {x: value}})} 
          units={["m", "in"]} />
        <SettingInput label="Position y" realValue={preset.state.y} category="distance"
          onChange={(value) => updatePreset({type: "state", payload: {y: value}})} 
          units={["m", "in"]} />
        
        <SettingInput label="Velocity x" realValue={preset.state.velocityX} category="velocity"
          onChange={(value) => updatePreset({type: "state", payload: {velocityX: value}})} 
          units={["m/s", "in/s"]} />
        <SettingInput label="Velocity y" realValue={preset.state.velocityY} category="velocity"
          onChange={(value) => updatePreset({type: "state", payload: {velocityY: value}})} 
          units={["m/s", "in/s"]} />
      </Dropdown>

      <Dropdown title="Simulation setup">
        <SettingInput label="Launch Height" realValue={preset.sim.launchHeight} category="position" 
          onChange={(value) => updatePreset({type: "sim", payload: {launchHeight: value}})}
          units={["m"]}/>
        <SettingInput label="Impact Height" realValue={preset.sim.impactHeight} category="position"
          onChange={(value) => updatePreset({type: "sim", payload: {impactHeight: value}})}
          units={["m"]}/>
      </Dropdown>
    </>
  )
}