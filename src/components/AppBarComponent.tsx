import type { ReactNode } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { Button } from "@/components/ui/button";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "@tanstack/react-router";


type Props = {
    children?: ReactNode;
}

const AppBarComponent = ({ children }: Props) => {

    const { user, logout } = useUser();
    const navigate = useNavigate();
    const handleLogOut = () => {
        logout();
        navigate({ to: '/' })
    }
    const handleLogIn = () => {
        navigate({ to: '/login' })
    }
    return (
        <div className="fixed top-0 left-0 px-7 w-full h-16 flex items-center justify-between bg-white shadow-md z-50">
            <div className="flex items-center">
                <img src="/tomeiro_favicon.png" alt="tomeiro logo" width={40} height={40} />
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <ThemeToggleButton />
                </div>
                <div>
                    {user.auth ? (
                        <Button className='border border-black' title="LogOut" onClick={handleLogOut} >
                            Log out
                        </Button>
                    ) : (
                        <Button className='border border-black' title="Login" onClick={handleLogIn} >
                            Login
                        </Button>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}

export default AppBarComponent