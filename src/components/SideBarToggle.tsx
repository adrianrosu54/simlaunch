import { MenuIcon, X } from "lucide-react"
import { $isSidebarOpen } from "../stores/settings";

export default function SideBarToggle({type}: {type: "open" | "close"}) {
  return (
    (type === "open") 
      ? <button className="hover:cursor-pointer" onClick={() => $isSidebarOpen.set(true)}>
        <MenuIcon />
      </button>
      : <button className="hover:cursor-pointer" onClick={() => $isSidebarOpen.set(false)}>
        <X />
      </button>
  );
}