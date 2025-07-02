import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export default function CardComponent({ children }: Props) {

    return (
        <div className="bg-white border-2 w-[396px] h-full rounded-lg p-4 " style={{ boxShadow: '0 2px 4px #0000001a, 0 8px 16px #0000001a' }}>
            {children}
        </div>
    )
}