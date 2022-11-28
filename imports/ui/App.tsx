import React from "react";
import { DarkModeButton, Form, ListaPacientes } from "./components";

export const App = () => (
    <div className="flex flex-col justify-center items-center">
        <DarkModeButton />
        <div className="w-10/12 md:w-6/12 flex flex-col py-5">
            <h1 className="text-5xl font-bold text-mutedDark dark:text-white pb-8">
                Registro de Pacientes
            </h1>
            <hr className="w-10/12 text-mutedDark dark:text-mutedLight" />
            <Form />
            <hr className="w-10/12 text-mutedDark dark:text-mutedLight" />
        </div>
        <div className="w-10/12 md:w-10/12 flex flex-col py-5">
            <ListaPacientes />
        </div>
    </div>
);
