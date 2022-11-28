import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Paciente, PacientesCollection } from "/imports/api/pacientes";
import data from "/imports/ui/data/comunas-regiones.json";
import { useState, useEffect } from "react";
import { Input } from "./Input";
import Swal from "sweetalert2";

const schema = yup.object({
    //split 2 names
    nombres: yup.string().required("Nombre es requerido"),
    apellido_paterno: yup.string().required("Apellido paterno es requerido"),
    apellido_materno: yup.string().required("Apellido materno es requerido"),
    rut: yup
        .string()
        .max(12, "Rut debe tener 12 caracteres")
        .required("Rut es requerido"),
    region: yup.string().required("Región es requerida"),
    comuna: yup.string().required("Comuna es requerida"),
    codigo_postal: yup
        .number()
        .positive("Código postal debe ser positivo")
        .typeError("Código postal debe ser un número")
        .required("Código postal es requerido"),
});

export const Form = () => {
    const [comunas, setComunas] = useState<string[]>([]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Paciente>({
        resolver: yupResolver(schema),
    });

    const region = useWatch({
        control,
        name: "region",
    });

    useEffect(() => {
        if (region) {
            data.regiones.find(
                (item: any) =>
                    item.region === region && setComunas(item.comunas)
            );
        }
    }, [region]);

    const formSubmit = async (data: Paciente) => {
        const getPaciente = await PacientesCollection.findOne({
            rut: data.rut,
        })?.rut;

        if (getPaciente) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Paciente ya existe",
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Paciente agregado",
            });
            PacientesCollection.insert(data);
        }
    };

    return (
        <div className="w-full pb-5">
            <form onSubmit={handleSubmit(formSubmit)}>
                <h2 className="text-3xl font-thin text-mutedDark dark:text-white py-4">
                    Datos Personales
                </h2>
                <div className="grid gap-x-6 gap-y-4 mb-5 sm:grid-cols-2">
                    <Input
                        label="Nombres"
                        value="nombres"
                        placeholder="Ingrese sus nombres"
                        register={register}
                        errors={errors.nombres}
                    />
                    <Input
                        label="Apellido Paterno"
                        value="apellido_paterno"
                        placeholder="Ingrese su apellido paterno"
                        register={register}
                        errors={errors.apellido_paterno}
                    />
                    <Input
                        label="Apellido Materno"
                        value="apellido_materno"
                        placeholder="Ingrese su apellido materno"
                        register={register}
                        errors={errors.apellido_materno}
                    />
                    <Input
                        label="Rut"
                        value="rut"
                        placeholder="Ingrese su rut"
                        register={register}
                        errors={errors.rut}
                    />

                    <div className="flex flex-col">
                        <label
                            htmlFor="region"
                            className="text-mutedDark font-semibold text-xs pb-1 dark:text-white"
                        >
                            Región&nbsp;
                            <span className="text-vibrant">*</span>
                        </label>
                        <select
                            id="region"
                            {...register("region")}
                            className="w-9/12 md:w-full rounded-lg dark:bg-vibrantDark outline outline-1 outline-muted  font-semibold text-xs p-2 focus-visible:text-mutedDark dark:text-white"
                        >
                            <option value="" className="text-muted" disabled>
                                Seleccione una región
                            </option>
                            {data.regiones.map(({ region }) => (
                                <option
                                    key={region}
                                    value={region}
                                    className="text-mutedDark dark:text-white select-text select-text-1 select-text-white"
                                >
                                    {region}
                                </option>
                            ))}
                        </select>
                        {errors.region && (
                            <span className="text-xs font-normal text-redAlert">
                                {errors.region.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="comuna"
                            className="text-mutedDark font-semibold text-xs pb-1 dark:text-white"
                        >
                            Comuna&nbsp;
                            <span className="text-vibrant">*</span>
                        </label>
                        <select
                            id="comuna"
                            {...register("comuna")}
                            className="w-9/12 md:w-full rounded-lg dark:bg-vibrantDark outline outline-1 outline-muted  font-semibold text-xs p-2 text-mutedDark dark:text-white"
                        >
                            <option value="" className="text-muted">
                                Seleccione una comuna
                            </option>
                            {comunas.map((comuna) => (
                                <option
                                    key={comuna}
                                    value={comuna}
                                    className="text-mutedDark dark:text-white select-text select-text-1 select-text-white"
                                >
                                    {comuna}
                                </option>
                            ))}
                        </select>
                        {errors.comuna && (
                            <span className="text-xs font-normal text-redAlert">
                                {errors.comuna.message}
                            </span>
                        )}
                    </div>
                    <Input
                        label="Código Postal"
                        value="codigo_postal"
                        placeholder="Ingrese código postal"
                        register={register}
                        errors={errors.codigo_postal}
                    />
                </div>
                <button
                    className="w-10/12 md:w-36 bg-vibrant hover:opacity-80 text-white font-semibold text-xs p-2 rounded-lg mt-3 hover:outline hover:outline-0 hover:outline-muted transition duration-300"
                    type="submit"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};
