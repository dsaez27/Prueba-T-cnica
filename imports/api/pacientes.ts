import { Mongo } from "meteor/mongo";

export interface Paciente {
    _id: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    rut: string;
    region: string;
    comuna: string;
    codigo_postal: number;
    createdAt: Date;
}

export const PacientesCollection = new Mongo.Collection<Paciente>("pacientes");

