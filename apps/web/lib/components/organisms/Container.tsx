import React from "react";

interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
    return (
        <main className="px-[5%] max-w-[1400px] m-auto">
           {children}
        </main>
    )
}