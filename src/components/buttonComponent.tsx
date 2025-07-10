type Props = {
    title: string;
    onClick?: () => void;
    className?: string;
    styleText?: string;
    type?: "button" | "submit";
}

export default function ButtonComponent({
    title,
    onClick,
    className,
    styleText,
    type = "button",
}: Props) {
    return (
        <div>
            <button
                type={type}
                onClick={onClick}
                className={`${className} bg-blue-500`}>
                <div className={`${styleText} font-bold`}>
                    {title}
                </div>
            </button>
        </div>
    )
}
