import { getUserLS } from "../utils/userLocalStore";
import ButtonComponent from "../components/buttonComponent";

type Props = {
    onLogout: () => void;
};

const WelcomePage = ({
    onLogout
}: Props) => {

    const userData = getUserLS();

    return (
        <div className="animate-slide-in-left text-center text-xl font-bold text-black">
            <p>Welcome {userData?.username}!!!</p>
            <div className="mt-2">
            <ButtonComponent title="LogOut" onClick={onLogout} styleText="text-white" />
            </div>
        </div>
    )
}

export default WelcomePage