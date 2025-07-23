import type { ReactNode } from 'react';
import ButtonComponent from './buttonComponent';

type Props = {
    children?: ReactNode;
    onClick?: () => void;
}

const AppBarComponent = ({ children, onClick }: Props) => {
    return (
        <div className="fixed top-0 w-full h-16 flex items-center justify-between bg-white shadow-md px-7 z-50">
            <div className="flex items-center">
                <img src="public/tomeiro_favicon.png" alt="tomeiro logo" width={40} height={40} />
            </div>
            <div className="flex items-center">
                <ButtonComponent icon={<img src="public/tomeiro_favicon.png" alt="tomeiro logo" width={20} height={20} />} onClick={onClick} type="button" />
                {children}
            </div>
        </div>
    );
}

export default AppBarComponent