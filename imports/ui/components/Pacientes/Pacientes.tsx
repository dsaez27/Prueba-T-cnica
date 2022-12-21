import React from "react";
import { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { PacientesCollection } from "../../../api/pacientes";
import { Loading } from "../../shared/Loading";
import { Paciente } from "./Paciente";
import { usePacientes } from "../../hooks/usePacients";

export const Pacientes = () => {
    const [page, setPage] = useState<number>(0);

    const count = useTracker(() => {
        return PacientesCollection.find({}).count();
    });

    const { data, isFetching } = usePacientes(page);

    return (
        <div className="flex flex-col items-start pb-3">
            <h2 className="text-3xl font-thin text-mutedDark dark:text-white pb-5">
                Lista de Pacientes
            </h2>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm text-left text-mutedDark dark:text-white">
                    <thead className="text-xs uppercase text-white bg-muted">
                        <tr>
                            <th
                                scope="col"
                                className=" font-medium p-4 pr-4 pt-4 text-left"
                            >
                                N°
                            </th>
                            <th className=" font-medium p-4 pr-4 pt-4 text-left">
                                Nombres
                            </th>
                            <th className=" font-medium p-4 pr-4 pt-4 text-left">
                                Apellido Paterno
                            </th>
                            <th className=" font-medium p-4 pr-4 pt-4  text-left">
                                Apellido Materno
                            </th>
                            <th className=" font-medium p-4 pr-4 pt-4  text-left min-w-max">
                                Rut
                            </th>
                            <th className=" font-medium p-4 pr-4 pt-4  text-left">
                                Región
                            </th>
                            <th className=" font-medium p-4 pr-4 pt-4  text-left">
                                Comuna
                            </th>
                            <th className=" font-medium p-4 pr-4 pt-4  text-left">
                                Código Postal
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody className="[&>*:nth-child(odd)]:bg-grayLight [&>*:nth-child(event)]:bg-white">
                        {data?.map((paciente: any, index: number) => (
                            <Paciente
                                key={paciente._id}
                                paciente={paciente}
                                index={index}
                            />
                        ))}
                    </tbody>
                </table>
                <div className="flex flex-col items-center justify-center w-full">
                    {isFetching && <Loading />}
                    {!data?.length && (
                        <h3 className="text-mutedDark dark:text-white py-4">
                            No hay pacientes registrados.
                        </h3>
                    )}
                </div>
            </div>
            {data?.length && (
                <div className="min-h-[50px] flex items-center justify-center w-full py-4">
                    <button
                        className="bg-vibrant hover:opacity-80 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={() => setPage((old) => Math.max(old - 1, 0))}
                        disabled={page === 0}
                    >
                        ‹
                    </button>
                    <span className="text-muted dark:text-white mx-2">
                        {page + 1} / {Math.ceil(count / 3)}
                    </span>
                    <button
                        className="bg-vibrant hover:opacity-80 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={() =>
                            setPage((old) =>
                                !data || data.length < 3 ? old : old + 1
                            )
                        }
                        disabled={!data || data.length < 3}
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
};
