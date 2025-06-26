type Props = {
    title: string;
    onClick: () => void;
    className?: string;
}

export default function ButtonComponent({
    title,
    onClick,
    className,
}: Props) {
    return (
        <div>
            <button onClick={onClick} className={`${className} bg-blue-500`}>
                <div className="font-bold">
                    {title}
                </div>
            </button>
        </div>
    )
}
