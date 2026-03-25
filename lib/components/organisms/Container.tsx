interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
    return (
        <div className="px-[5%] pb-[4.5em] sm:pb-[0] max-w-[1400px] m-auto">
           {children}
        </div>
    )
}