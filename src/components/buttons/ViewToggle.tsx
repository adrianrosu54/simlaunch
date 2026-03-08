import { useStore } from "@nanostores/react";
import { Grid2x2 } from "lucide-react";
import { ChartLine } from "lucide-react";

import { $view } from "../../stores/settings";
import { useMemo } from "react";

export default function ViewToggle() {
  const view = useStore($view);

  const {Icon, func} = useMemo(() => {
    switch (view) {
      case "side": return {
        Icon: ChartLine, 
        func: () => $view.set("field")
      };
      case "field": return {
        Icon: Grid2x2, 
        func: () => $view.set("side"),
      };
    } 
  }, [view]);

  return (
    <button className="hidden not-md:block hover:cursor-pointer" onClick={func}>
      <Icon />
    </button>
  )
}