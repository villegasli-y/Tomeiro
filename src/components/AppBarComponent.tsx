import type { ReactNode } from 'react';
import ThemeToggleButton from './ThemeToggleButton';

type Props = {
    children?: ReactNode;
}

const AppBarComponent = ({ children }: Props) => {
    return (
        <div className="fixed top-0 left-0 px-7 w-full h-16 flex items-center justify-between bg-white shadow-md z-50">
            <div className="flex items-center">
                <img src="public/tomeiro_favicon.png" alt="tomeiro logo" width={40} height={40} />
            </div>
            <div className="flex items-center">
                <ThemeToggleButton />
                {children}
            </div>
        </div>
    );
}

export default AppBarComponent