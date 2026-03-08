import { useStore } from "@nanostores/react";
import { $unitView, fromDisplay, setUnitView, toDisplay, 
  type UnitCategory } from "../../stores/units";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

export default function SettingInput({label, category, realValue, onChange, units}: {
  label: string,
  realValue: number,
  onChange: (value: number) => void,
  category: UnitCategory,
  units: string[],
}) {
  const currentUnit = useStore($unitView)[category];

  const [inputValue, setInputValue] = useState("");
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) {
      const displayValue = toDisplay(realValue, currentUnit);
      setInputValue(displayValue.toString());
    }
  }, [realValue]);
  useEffect(() => {
    const displayValue = toDisplay(realValue, currentUnit);
    setInputValue(displayValue.toFixed(2));
  }, [currentUnit]);

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
    <article className="flex flex-col min-w-20 px-1 md:text-sm">
      <div className="flex justify-between items-center px-2 text-clk-text-primary/90">
        <label>{label}</label>
      </div>

      <div className="flex flex-row overflow-hidden bg-clk-background border-4 border-clk-primary rounded-3xl"
          >
        <input type="number" 
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="w-full pl-4 outline-none font-mono text-clk-text-secondary"
        />
        {units && (
          units.map((value, index, array) =>
            <button key={value} className={`px-3 w-15 opacity-90 hover:opacity-100 hover:cursor-pointer\
                ${value === currentUnit ? "bg-clk-accent" : "bg-clk-secondary"}\
                ${index === 0 ? "rounded-l-xl pl-4" : ""}\
                ${index === array.length-1 ? "rounded-r-xl pr-4" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setUnitView(category, value);
                }}>
              {value}
            </button>
          )
        )}
      </div>
    </article>
  )
}