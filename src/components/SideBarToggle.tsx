import { MenuIcon, X } from "lucide-react"

export default function SideBarToggle({type}: {type: "open" | "close"}) {
  const sidebar =  document.getElementById("sidebar");
  const contents = document.getElementById("content");
  
  return (
    (type === "open") 
      ? <button className="hover:cursor-pointer" onClick={() => {
          sidebar?.classList.toggle("md:w-64", true);
          sidebar?.classList.toggle("w-full", true);
          sidebar?.classList.toggle("w-0", false);
      }}>
        <MenuIcon />
      </button>
      : <button className="hover:cursor-pointer" onClick={() => {
          sidebar?.classList.toggle("md:w-64", false);
          sidebar?.classList.toggle("w-full", false);
          sidebar?.classList.toggle("w-0", true);
      }}>
        <X />
      </button>
  );
}