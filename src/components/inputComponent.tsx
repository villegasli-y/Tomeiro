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
            <input type="text" className="w-full px-4 py-2 border bg-white text-black border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-center placeholder:text-slate-500" placeholder={placeholder}
                value={value} onChange={onChange} />
        </div>
    )
}