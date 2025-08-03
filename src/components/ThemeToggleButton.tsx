import { useThemeContext } from "../hooks/useTheme";
import { MoonIcon, SunIcon } from "./icons/ThemeIcons";
import { Button } from "./ui/button";

export default function ThemeToggleButton() {
    const { theme, setTheme } = useThemeContext();
    const isDarkMode = theme === "dark";

    return (
        <Button className="border border-black" onClick={() => setTheme(isDarkMode ? "light" : "dark")}>
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
    );
}