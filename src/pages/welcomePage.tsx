import ButtonComponent from "../components/buttonComponent";
import { useUser } from "../hooks/useUser";

type Props = {
    onLogout: () => void;
};

const WelcomePage = ({
    onLogout
}: Props) => {

    const { user, logout } = useUser();
    const handleLogout = () => {
        logout();
        onLogout();
    } 

    return (
        <div className="text-center text-xl font-bold text-black">
            <p>Welcome { user ? user?.userName : "Guest"}!!!</p>
            <div className="mt-2">
                <ButtonComponent title="LogOut" onClick={handleLogout} styleText="text-white" />
            </div>
        </div>
    )
}

export default WelcomePage