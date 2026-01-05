import type React from "react";
import { createContext, useState } from "react";
import ThemeApp from "./ThemeApp";

interface ProjectProps {
    onGoBack: () => void;
    title?: string;
}

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});


const ThemeToggle :React.FC<ProjectProps>= ({ onGoBack }) => {
    const [theme,setTheme] = useState<Theme>('light');
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
        <ThemeApp/>
    </ThemeContext.Provider>
  )
}

export default ThemeToggle;