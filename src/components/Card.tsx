import type React from "react";

export default function Card(
    {children, className}: 
    {children: React.ReactNode, className?: string}
) {
    return (
        <section className={`relative m-2 h-100% w-100% min-h-0 min-w-0\
                        bg-clk-primary border-2 border-clk-secondary rounded-xl\
                        ${className ? className : ""}`}>
            {children}
        </section>
    )
}