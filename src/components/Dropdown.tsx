import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type ReactNode } from "react";

export default function Dropdown({title, children}: {
  title: string,
  children: ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full">
      <button onClick={() => setIsOpen(!isOpen)}
          className="flex flex-row w-full items-center justify-between px-2 py-2
            hover:bg-clk-background/50 not-md:focus:bg-clk-background/50 hover:cursor-pointer">
        <span>{title}</span>
        {isOpen
          ? <ChevronUp />
          : <ChevronDown />
        }
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pl-2 flex flex-col">
          {children}
        </div>
      </div>
    </section>
  );
}