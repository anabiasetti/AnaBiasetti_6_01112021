const mongoose = require("mongoose");
/*creation d'un schema de données*/
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true } /* tableau des identifiants des utilisateurs
    qui ont aimé (= liked) la sauce*/,
  usersDisliked: { type: [String], required: true } /* tableau des identifiants des
    utilisateurs qui n'ont pas aimé */,
});

module.exports = mongoose.model("Sauce", sauceSchema);
