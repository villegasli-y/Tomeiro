import { useThemeContext } from "../hooks/useTheme";
import ButtonComponent from "./buttonComponent";
import { MoonIcon, SunIcon } from "./icons/ThemeIcons";

export default function ThemeToggleButton() {
    const { theme, setTheme } = useThemeContext();
    const isDarkMode = theme === "dark";
    return (
        <ButtonComponent icon={isDarkMode ? <MoonIcon /> : <SunIcon />} onClick={() => setTheme(isDarkMode ? "light" : "dark")} />
    );
}