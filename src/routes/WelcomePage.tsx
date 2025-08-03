import { Button } from "@/components/ui/button";
import { useUser } from "../hooks/useUser";
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute('/WelcomePage')({
    component: WelcomePage,
})

function WelcomePage() {

    const { user, logout } = useUser();
    const navigate = useNavigate();
    const handleLogOut = () => {
        logout();
        navigate({ to: '/' })
    }

    return (
        <div className="text-center text-xl font-bold text-black">
            <p>Welcome {user && user.auth ? user?.username : "Guest"}!!!</p>
            <div className="mt-2">
                <Button title="LogOut" onClick={handleLogOut} >
                    Log out
                </Button>
            </div>
        </div>
    )
}

export default WelcomePage