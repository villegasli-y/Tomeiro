import React, { forwardRef } from 'react';

type Props = {
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputComponent = forwardRef<HTMLInputElement, Props>(
    ({ placeholder, value, onChange }, ref) => {
        return (
            <div>
                <input
                    ref={ref}
                    type="text"
                    className="w-full px-4 py-2 border bg-white text-black border-gray-400 rounded-md focus:outline-none
                focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-center placeholder:text-slate-500"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange} />
            </div>
        )
    }
);

export default InputComponent;