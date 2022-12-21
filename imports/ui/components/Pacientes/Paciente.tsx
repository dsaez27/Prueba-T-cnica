import React from "react";
import { DeleteIcon } from "../../shared/DeleteIcon";
import { useMutation } from "react-query";
import {
    Paciente as PacienteType,
    PacientesCollection,
} from "../../../api/pacientes";
import Swal from "sweetalert2";

interface Props {
    paciente: PacienteType;
    index: number;
}

export const Paciente: React.FC<Props> = ({ paciente, index }) => {
    const { mutateAsync } = useMutation(
        async (id: string) => {
            await PacientesCollection.remove(id);
        },
        {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Paciente eliminado",
                    
                });
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ah ocurrido un error reporte al administrador",
                    
                });
            },
        }
    );

    return (
        <tr className="bg-white dark:bg-vibrantDark hover:bg-grayLight transition-opacity duration-300 text-mutedDark">
            <th scope="row" className="py-4 px-2">
                {index + 1}
            </th>
            <td className="py-4 px-2 whitespace-nowrap first-letter:uppercase">
                {paciente.nombres}
            </td>
            <td className="py-4 px-2 whitespace-nowrap first-letter:uppercase">
                {paciente.apellido_paterno}
            </td>
            <td className="py-4 px-2 whitespace-nowrap first-letter:uppercase">
                {paciente.apellido_materno}
            </td>
            <td className="py-4 px-2 whitespace-nowrap">{paciente.rut}</td>
            <td className="py-4 px-2 whitespace-nowrap">{paciente.region}</td>
            <td className="py-4 px-2 whitespace-nowrap">{paciente.comuna}</td>
            <td className="py-4 px-2 whitespace-nowrap">
                {paciente.codigo_postal}
            </td>
            <td className="py-4 px-2">
                <button
                    onClick={() => mutateAsync(paciente._id)}
                    className="bg-redAlert hover:opacity-80 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    <DeleteIcon />
                </button>
            </td>
        </tr>
    );
};
