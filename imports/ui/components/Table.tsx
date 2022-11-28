import React from "react";

export const Table = () => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Nombres</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Rut</th>
                        <th>Región</th>
                        <th>Comuna</th>
                        <th>Código Postal</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{paciente.id}</td>
                        <td>{paciente.nombres}</td>
                        <td>{paciente.apellido_paterno}</td>
                        <td>{paciente.apellido_materno}</td>
                        <td>{paciente.rut}</td>
                        <td>{paciente.región}</td>
                        <td>{paciente.comuna}</td>
                        <td>{paciente.codigio_postal}</td>
                        <td>
                            <button
                                onClick={() => deletePaciente(paciente._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
