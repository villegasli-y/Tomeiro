import { createContext } from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

interface ThemeContextType {
    theme: string | undefined;
    setTheme: (theme: string) => void;
}

type Props = {
    children: React.ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: Props) => {
    return (
        <NextThemeProvider attribute="class">
            <ThemeContextWrapper>
                {children}
            </ThemeContextWrapper>
        </NextThemeProvider>
    );
}
const ThemeContextWrapper = ({ children }: Props) => {
    const { theme, setTheme } = useTheme();
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;
export { ThemeContext }

