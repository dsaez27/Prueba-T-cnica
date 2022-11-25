import { useState, useEffect } from "react";

export const useDarkMode = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
    const element = document.documentElement;
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)");

    useEffect(() => {
        switch (theme) {
            case "dark":
                element.classList.add("dark");
                localStorage.setItem("theme", "dark");
                break;
            case "light":
                element.classList.remove("dark");
                localStorage.setItem("theme", "light");
                break;
            default:
                localStorage.removeItem("theme");
                darkMode.matches ? setTheme("dark") : setTheme("light");
                break;
        }
    }, [theme]);

    return [theme, setTheme] as const;
};
