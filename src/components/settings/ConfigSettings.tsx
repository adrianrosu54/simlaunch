import { useStore } from "@nanostores/react";
import { $preset, updatePreset } from "../../stores/physics";
import Dropdown from "./Dropdown";
import SettingInput from "../settings/SettingInput";
import { memo } from "react";

export default function ConfigSettings() {
  const preset = useStore($preset);
  return (
    <>
      <Dropdown title="Control Input">
        <SettingInput label="Turret Angle" realValue={preset.control.turretAngle} category="angle"
          onChange={(value) => updatePreset({type: "control", payload: {turretAngle: value}})}
          units={["deg","rad"]}/>
        <SettingInput label="Flywheel Velocity" realValue={preset.control.flywheelVelocity} category={"rotation"}
          onChange={(value) => updatePreset({type: "control", payload: {flywheelVelocity: value}})}
          units={["rpm", "tps"]}/>
      </Dropdown>

      <Dropdown title="Robot State">
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

      <Dropdown title="Simulation Setup">
        <SettingInput label="Launch Height" realValue={preset.sim.launchHeight} category="length" 
          onChange={(value) => updatePreset({type: "sim", payload: {launchHeight: value}})}
          units={["cm", "in"]}/>
        <SettingInput label="Impact Height" realValue={preset.sim.impactHeight} category="length"
          onChange={(value) => updatePreset({type: "sim", payload: {impactHeight: value}})}
          units={["cm", "in"]}/>
      </Dropdown>

      <Dropdown title="Launcher configuration">
        <SettingInput label="Pitch Angle" realValue={preset.config.launchPitchAngle} category="angle"
          onChange={(value) => updatePreset({type: "config", payload: {launchPitchAngle: value}})}
          units={["deg", "rad"]}/>
        <SettingInput label="Flywheel Radius" realValue={preset.config.flywheelRadius} category="length"
          onChange={(value) => updatePreset({type: "config", payload: {flywheelRadius: value}})}
          units={["cm", "in"]}/>
        <SettingInput label="Launch Efficiency" realValue={preset.config.launchEfficiency} category="none"
          onChange={(value) => updatePreset({type: "config", payload: {launchEfficiency: value}})}
          units={[]} />
        <SettingInput label="Ticks to RPM" realValue={preset.config.ticksToRPM} category="none"
          onChange={(value) => updatePreset({type: "config", payload: {ticksToRPM: value}})}
          units={[]}/>
      </Dropdown>
    </>
  )
}