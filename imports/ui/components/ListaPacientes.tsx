import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useEffect, useState } from "react";
import { PacientesCollection } from "../../api/pacientes";
import { Paciente } from "../../api/pacientes";
import { Loading } from "../shared/Loading";

export const ListaPacientes = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const getPacientes = useTracker(() => {
        return PacientesCollection.find({}).fetch();
    });

    const deletePaciente = (id: string) => {
        PacientesCollection.remove(id);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [getPacientes]);

    const listaPacientes = getPacientes.map((paciente: Paciente, index) => {
        return (
            <>
                <tr className="bg-white border-b dark:bg-vibrantDark dark:border-muted hover:bg-gray-50 dark:hover:bg-muted">
                    <th scope="row" className="py-4 px-2">
                        {index + 1}
                    </th>
                    <td className="py-4 px-2">{paciente.nombres}</td>
                    <td className="py-4 px-2">{paciente.apellido_paterno}</td>
                    <td className="py-4 px-2">{paciente.apellido_materno}</td>
                    <td className="py-4 px-2">{paciente.rut}</td>
                    <td className="py-4 px-2">{paciente.region}</td>
                    <td className="py-4 px-2">
                        {paciente.comuna}
                        <br></br>
                    </td>
                    <td className="py-4 px-2">{paciente.codigo_postal}</td>
                    <td className="py-4 px-2">
                        <button
                            onClick={() => deletePaciente(paciente._id)}
                            className="bg-redAlert hover:opacity-80 text-white font-bold py-2 px-4 rounded"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-trash"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                ></path>
                                <line x1="4" y1="7" x2="20" y2="7"></line>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                            </svg>
                        </button>
                    </td>
                </tr>
            </>
        );
    });

    return (
        <div className="flex flex-col items-start pb-5">
            <h2 className="text-3xl font-thin text-mutedDark dark:text-white pb-4">
                Lista de Pacientes
            </h2>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm text-left text-mutedDark dark:text-white">
                    <thead className="text-xs text-muted bg-grayLight uppercase dark:text-grayLight dark:bg-muted">
                        <tr>
                            <th
                                scope="col"
                                className="border-b dark:border-muted font-medium p-4 pr-4 pt-4 text-mutedDark dark:text-grayLight text-left"
                            >
                                N°
                            </th>
                            <th className="border-b dark:border-muted font-medium p-4 pr-4 pt-4 text-mutedDark dark:text-grayLight text-left">
                                Nombres
                            </th>
                            <th className="border-b dark:border-muted font-medium p-4 pr-4 pt-4 text-mutedDark dark:text-grayLight text-left">
                                Apellido Paterno
                            </th>
                            <th className="border-b dark:border-muted font-medium p-4 pr-4 pt-4 text-mutedDark dark:text-grayLight text-left">
                                Apellido Materno
                            </th>
                            <th className="border-b dark:border-muted font-medium p-4 pr-4 pt-4 text-mutedDark dark:text-grayLight text-left">
                                Rut
                            </th>
                            <th className="border-b dark:border-muted font-medium p-4 pr-4 pt-4 text-mutedDark dark:text-grayLight text-left">
                                Región
                            </th>
                            <th className="border-b dark:border-muted font-medium p-4 pr-4 pt-4 text-mutedDark dark:text-grayLight text-left">
                                Comuna
                            </th>
                            <th className="border-b dark:border-muted font-medium p-4 pr-4 pt-4 text-mutedDark dark:text-grayLight text-left">
                                Código Postal
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody className="">{!loading && listaPacientes}</tbody>
                </table>
                <div className="flex flex-col items-center justify-center w-full h-full py-8">
                    {loading && <Loading />}
                    {!loading && listaPacientes.length === 0 && (
                        <p className="text-base text-mutedDark dark:text-white">
                            No hay pacientes registrados
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
