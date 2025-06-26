type Props = {
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function InputComponent({
    placeholder,
    value,
    onChange
}: Props) {
    return (
        <div>
            <input type="text" className="rounded-md" placeholder={placeholder}
                value={value} onChange={onChange} />
        </div>
    )
}