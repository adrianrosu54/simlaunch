import { usePerformanceSetting } from "@/context/PerfSettingContext";

export default function PerformanceToggle() {
  const {perfSetting, setPerfSetting} = usePerformanceSetting();

  return (
    <div className="flex flex-row items-center gap-2 p-1 w-fit
                    bg-clk-primary
                    border-2 border-clk-secondary rounded-full">
      <span className="text-xs font-bold text-clk-text-secondary">Performance Mode</span>
      <button
        onClick={() => setPerfSetting(!perfSetting)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full 
          transition-colors duration-250 focus:outline-none focus:ring-2 focus:ring-clk-accent
          ${perfSetting ? 'bg-clk-accent' : 'bg-clk-background'}
        `}
        role="switch"
        aria-checked={perfSetting}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full 
            bg-white transition-transform duration-200
            ${perfSetting ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}