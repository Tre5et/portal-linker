export function Button({
    children,
    onClick,
    className,
    disabled = false,

}: Readonly<{
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    disabled?: boolean;

}>) {
    return (
        <button
            className={`pl-2 pr-3 py-2 flex flex-row items-center rounded-lg border-2 border-card bg-card text-text hover:bg-card-hover ${className ?? ""}`}
            onClick={onClick}
            disabled={disabled}

        >
            {children}
        </button>
    );
}

export function TransparentButton({
  children,
  onClick,
  className,
  disabled = false,

}: Readonly<{
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;

}>) {
    return <Button
        onClick={onClick}
        className={`bg-transparent hover:bg-transparent border-transparent p-0 m-0 ${className ?? ""}`}
        disabled={disabled}
    >{children}</Button>
}