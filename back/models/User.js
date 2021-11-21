/*Modèle utilisateur*/
const mongoose = require("mongoose");
/**
 * la valeur unique , avec l'élément "mongoose-unique-validator" passé comme plug-in,
 *  s'assurera qu'aucun des deux utilisateurs ne peut partager la même adresse e-mail.
 *  Un package de validation pour pré-valider les informations avant de les enregistrer:
 * npm install --save mongoose-unique-validator
 */
const uniqueValidator = require("mongoose-unique-validator");
const mongooseErrors = require("mongoose-errors");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    /* Vailidation de l'entrée de email */
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
    /*Pour sanitiser l'entrée de données */
    trim: true,
    /*Pour que 2 emails avec differents capitalisations ne soient pas acceptées */
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});
/**
 * On applique  le validator au userSchema, en appelant la methode plug-in et
 * en passant uniqueValidator comme argument
 */
userSchema.plugin(uniqueValidator);
userSchema.plugin(mongooseErrors);

module.exports = mongoose.model("User", userSchema);
