import { Meteor } from "meteor/meteor";
import { PacientesCollection } from "/imports/api/pacientes";

Meteor.startup(async () => {
    // code to run on server at startup
    console.log("Servidor iniciado...");
});

Meteor.methods({
    getPacientes: async () => {
        return await PacientesCollection.find().fetch();
    },
});
