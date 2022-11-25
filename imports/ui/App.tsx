import React from "react";
import { DarkModeButton } from "./components/DarkModeButton";

export const App = () => (
    <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-slate-700">
        <DarkModeButton />
        <h1>Welcome to Meteor!</h1>
    </div>
);
