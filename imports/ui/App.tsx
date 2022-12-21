import React from "react";

import { Button } from "./components/DarkMode";
import { Form } from "./components/Form";
import { Pacientes } from "./components/Pacientes";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export const App = () => (
    <QueryClientProvider client={queryClient}>
        <div className="flex flex-col justify-center items-center">
            <Button />
            <div className="w-full md:w-6/12 flex flex-col p-5">
                <h1 className="text-5xl font-bold text-mutedDark dark:text-white pb-8">
                    Registro de Pacientes
                </h1>
                <hr className="w-10/12 text-mutedDark dark:text-mutedLight" />
                <Form /> 
                <hr className="w-10/12 text-mutedDark dark:text-mutedLight px-5" />
            </div>
            <div className="w-full flex flex-col p-5">
                <Pacientes />
            </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
