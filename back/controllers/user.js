/**
 * Package de cryptage pour les mots de passe:
 * npm install --save bcrypt
 *
 */
const bcrypt = require("bcrypt");
/**
 * Pour créer et vérifier les tokens d'authentification, il nous faudra un nouveau package :
npm install --save jsonwebtoken
Nous l'importerons ensuite dans notre contrôleur utilisateur :
 */
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = (req, res, next) => {
  /*Regex pour valider le mot de passe */
  const regex = new RegExp(/^(?=.{10,}$)(?=(?:.*?[A-Z]){2})(?=.*?[a-z])(?=(?:.*?[0-9]){2}).*$/);
  if (!regex.test(req.body.password)) {
    res.status(400).json({
      error: "Un mot de passe contenant au moins 2 majuscules, 1 minuscule, 2 chiffres et d'une longueur d'au moins 10",
    });
    return;
  }

  /*Avec le hash crée par bcrypt on enregistre l'user dans la base de données*/
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "NEyE9zdtv1f9HMEvHx5J", { expiresIn: "24h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
