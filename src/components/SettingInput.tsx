import { useStore } from "@nanostores/react";
import { fromDisplay, setUnitView, toDisplay, unitView, type UnitCategory } from "../stores/units";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

export default function SettingInput({label, category, realValue, onChange, units}: {
  label: string,
  realValue: number,
  onChange: (value: number) => void,
  category: UnitCategory,
  units: string[],
}) {
  const currentUnit = useStore(unitView)[category];
  const [inputValue, setInputValue] = useState("");
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) {
      const displayValue = toDisplay(realValue, currentUnit);
      setInputValue(displayValue.toString());
    }
  }, [realValue, currentUnit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const rawString = e.target.value;
    setInputValue(rawString);

    const numericValue = parseFloat(rawString);
    
    if (isNaN(numericValue)) return;

    onChange(fromDisplay(numericValue, currentUnit));
  }

  const handleBlur = () => {
    isFocused.current = false;
    setInputValue(toDisplay(realValue, currentUnit).toFixed(2));
  };

  const handleFocus = () => {
    isFocused.current = true;
  };

  return (
    <article className="flex flex-col max-w-80 min-w-20">
      <div className="flex justify-between items-center px-2">
        <label>{label}</label>
      </div>

      <div className="flex flex-row overflow-hidden bg-slate-900 rounded-3xl p-1"
          onBlur={handleBlur}
          onFocus={handleFocus}>
        <input type="number" 
          value={inputValue}
          onChange={handleChange}
          className="w-full px-4 py-0.5 rounded-xl bg-slate-950 outline-none"
        />
        {units && (
          units.map((value, index, array) =>
            <button key={value} className={`px-3 py-0.5 opacity-90 hover:opacity-100 hover:cursor-pointer bg-clk-accent\
                ${index === 0 ? "rounded-l-xl pl-4" : ""}\
                ${index === array.length-1 ? "rounded-r-xl pr-4" : ""}`}
                onClick={() => {
                  setUnitView(category, value);
                  isFocused.current = true;
                }}>
              {value}
            </button>
          )
        )}
      </div>
    </article>
  )
}