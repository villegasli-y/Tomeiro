import { useEffect } from "react";

type Props = {
    user: { username: string; password: string };
    onLogout: () => void;
};

const WelcomePage = ({
    user, onLogout
}: Props) => {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onLogout();
        }, 5 * 60 * 1000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [onLogout])

    return (
        <div className="animate-slide-in-left text-center text-xl font-bold text-black">
            <pre>{JSON.stringify(user)}</pre>
            <p>Welcome {user.username}!!!</p>
        </div>
    )
}

export default WelcomePage