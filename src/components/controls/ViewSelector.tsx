import { useApp, type View } from "@/context/AppProvider";

const views: View[] = ["Side View", "Top View"];

export default function ViewSelector() {
  const { view, setView } = useApp();

  return (
    <div className="flex px-2 w-fit rounded-lg font-semibold bg-clk-primary">
      {views.map((value, index, array) =>
      <button
        onClick={() => setView(value)}
        className={`px-5 py-1 text-md font-medium
          ${index === 0 ? "rounded-l-0" : "rounded-r-xl"}
          ${index === array.length-1 ? "rounded-l-0" : "rounded-l-xl"}
          border border-clk-secondary transition-all ${
            value === view 
              ? 'bg-clk-accent text-clk-text-primary' 
              : 'text-clk-text-tertiary hover:text-clk-text-secondary'
          }
          `}
      >
        {value}
      </button>
      )}
    </div>
  );
}