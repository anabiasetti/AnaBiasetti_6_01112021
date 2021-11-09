/*Modèle utilisateur*/
const mongoose = require("mongoose");
/**
 * la valeur unique , avec l'élément "mongoose-unique-validator" passé comme plug-in,
 *  s'assurera qu'aucun des deux utilisateurs ne peut partager la même adresse e-mail.
 *  Un package de validation pour pré-valider les informations avant de les enregistrer:
 * npm install --save mongoose-unique-validator
 */
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
/**
 * On applique  le validator au userSchema, en appelant la methode plug-in et
 * en passant uniqueValidator comme argument
 */
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
