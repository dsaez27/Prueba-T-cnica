import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Paciente, PacientesCollection } from "/imports/api/pacientes";
import data from "/imports/ui/data/comunas-regiones.json";
import { useState, useEffect } from "react";
import { Input } from "./Input";
import Swal from "sweetalert2";
import { Select } from "./Select";
import { useMutation } from "react-query";
import { formatRut } from "rutlib/lib";

const schema = yup.object({
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
    const [comunas, setComunas] = useState<any[]>([]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Paciente>({
        resolver: yupResolver(schema),
    });

    const region = useWatch({
        control,
        name: "region",
    });

    const rut = useWatch({
        control,
        name: "rut",
    });

    const rutExist = PacientesCollection.findOne({
        rut: formatRut(rut),
    })?.rut;

    useEffect(() => {
        region &&
            data.regiones.find(
                (item: any) =>
                    item.region === region && setComunas(item.comunas)
            );
    }, [region]);

    const formSubmit = async (data: Paciente) => {
        !rutExist
            ? (PacientesCollection.insert(data),
              Swal.fire({
                  icon: "success",
                  title: "Paciente agregado",
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
              }),
              reset())
            : Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Paciente ya existe",
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
              });
    };

    return (
        <div className="w-full">
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
                        placeholder="Ingrese apellido materno"
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
                    <Select
                        label="Seleccione Región"
                        value="region"
                        options={data.regiones.map((item: any) => item.region)}
                        register={register}
                        errors={errors.region}
                    />
                    <Select
                        label="Seleccione Comuna"
                        value="comuna"
                        options={comunas}
                        register={register}
                        errors={errors.comuna}
                    />
                    <Input
                        label="Código Postal"
                        value="codigo_postal"
                        placeholder="Ingrese código postal"
                        register={register}
                        errors={errors.codigo_postal}
                    />
                </div>
                <button
                    className="w-full rounded-lg bg-vibrant hover:opacity-80 text-white font-semibold text-xs p-2 mt-3 hover:outline hover:outline-0 hover:outline-muted transition duration-300 mb-5"
                    type="submit"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};
