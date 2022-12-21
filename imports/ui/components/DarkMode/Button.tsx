import React from "react";
import { useState, useEffect } from "react";

export const Button = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "system"
    );
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

    return (
        <div
            className="fixed top-5 right-10 duration-300 rounded flex justify-center items-center cursor-pointer p-2 dark:bg-vibrantDark hover:bg-grayLight dark:hover:bg-vibrantDarker transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Modo Oscuro"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-sun"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke={theme === "dark" ? "#fff" : "#000"}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M0 0h24v24H0z"
            >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
            </svg>
        </div>
    );
};
