import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeContext must be used within a <ThemeProvider>");
  return context;
}
