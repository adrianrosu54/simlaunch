import { useApp } from "@/context/AppProvider.tsx";

export default function PerformanceToggle() {
  const {perfMode, setPerfMode} = useApp();

  return (
    <div className="flex flex-row items-center gap-4 p-1 w-fit
                    bg-clk-primary border-2 border-clk-secondary rounded-full">
      <span className="text-sm font-semibold text-clk-text-secondary">Performance Mode</span>
      <button
        onClick={() => setPerfMode(!perfMode)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full 
          transition-colors duration-250 focus:outline-none focus:ring-2 focus:ring-clk-secondary
          ${perfMode ? 'bg-clk-accent' : 'bg-clk-background'}
        `}
        role="switch"
        aria-checked={perfMode}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full 
            bg-white transition-transform duration-200
            ${perfMode ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}