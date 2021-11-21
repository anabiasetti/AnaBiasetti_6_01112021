const mongoose = require("mongoose");
const mongooseErrors = require("mongoose-errors");
/*creation d'un schema de données*/
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true, min: 1, max: 10 },
  likes: { type: Number, required: true, min: 0 },
  dislikes: { type: Number, required: true, min: 0 },
  usersLiked: { type: [String], required: true } /* tableau des identifiants des utilisateurs
    qui ont aimé (= liked) la sauce*/,
  usersDisliked: { type: [String], required: true } /* tableau des identifiants des
    utilisateurs qui n'ont pas aimé */,
});

sauceSchema.plugin(mongooseErrors);

module.exports = mongoose.model("Sauce", sauceSchema);
