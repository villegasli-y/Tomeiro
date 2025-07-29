import ButtonComponent from "../components/buttonComponent";
import { useUser } from "../hooks/useUser";
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute('/WelcomePage')({
    component: WelcomePage,
})

function WelcomePage () {

    const { user, logout } = useUser();
    const navigate = useNavigate();
    const handleLogOut = () => {
        logout();
        navigate({to: '/'})
    }

    return (
        <div className="text-center text-xl font-bold text-black">
            <p>Welcome { user && user.auth ? user?.userName : "Guest"}!!!</p>
            <div className="mt-2">
                <ButtonComponent title="LogOut" onClick={handleLogOut} styleText="text-white" />
            </div>
        </div>
    )
}

export default WelcomePage