import { Meteor } from "meteor/meteor";
import { PacientesCollection } from "/imports/api/pacientes";

Meteor.startup(async () => {
    // code to run on server at startup
    console.log("Servidor iniciado...");
});

Meteor.methods({
    add: async (paciente: any) => {
        return await PacientesCollection.insert(paciente);
    },
    removePaciente: async (id: string) => {
        return await PacientesCollection.remove(id);
    },
});
