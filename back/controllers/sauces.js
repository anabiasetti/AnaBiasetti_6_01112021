const Sauce = require("../models/Sauce");
/**
 * fs signifie « file system » (soit « système de fichiers » en français).
 * Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers,
 *  y compris aux fonctions permettant de supprimer les fichiers.
 */
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  /**
   * https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466669-modifiez-les-routes-pour-prendre-en-compte-les-fichiers#/id/r-6466642
   */
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisLiked: [],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateSauce = (req, res, next) => {
  /**
   * Modification des routes pour prendre en compte les fichiers
   * https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466669-modifiez-les-routes-pour-prendre-en-compte-les-fichiers#/id/r-6466656
   *
   */
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(res.status(200).json({ message: "Sauce modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  /**
   * https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466697-developpez-la-fonction-delete-du-back-end#/id/r-6466678
   * On utilise la méthode findOne() dans notre modèle Sauce 
   pour trouver la sauce unique ayant le même _id que le paramètre de la requête ;
   ce Sauce est ensuite retourné dans une Promise et envoyé au front-end ;
   * 
   */
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(res.status(200).json({ message: "Sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeDislikeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;
  if (!userId) {
    res.status(401).json({ error: "Utilisateur requis !" });
    return;
  }
  //si like===1 l'utilisateur aime la sauce//

  Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      //console.log(sauce);
      if (like === 1) {
        if (sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId)) {
          //Si l'utilisateur est déjà dans la liste de likes/dislikes reenvoyer une erreur
          res.status(401).json({ error: "L'utilisateur a déjà liké ou disliké" });
        } else {
          // sinon ajouter un like
          Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
            .then(() => res.status(200).json({ message: "J'aime" }))
            .catch((error) => res.status(400).json({ error: error.message }));
        }
      } else if (like === 0) {
        //l'utilisateur annule son like  ou son dislike
        if (sauce.usersLiked.includes(userId)) {
          //si l'utilisateur est dans la liste de likes eliminer son like
          Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
            .then(() => res.status(200).json({ message: "Neutre" }))
            .catch((error) => res.status(400).json({ error: error.message }));
        } else if (sauce.usersDisliked.includes(userId)) {
          //si l'utilisateur est dans la liste de dislikes eliminer son dislike
          Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
            .then(() => res.status(200).json({ message: "Neutre" }))
            .catch((error) => res.status(400).json({ error: error.message }));
        } else {
          //Si l'utilisateur ne se trouve pas en aucun liste renvoyer un error
          res.status(401).json({ error: "Utilisateur n'a pas liké ou disliké" });
        }
      } else if (like === -1) {
        //Si like = -1, l'utilisateur n'aime pas la sauce//
        if (sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId)) {
          //Si l'utilisateur est déjà dans la liste de likes/dislikes reenvoyer une erreur
          res.status(401).json({ error: "L'utilisateur a déjà liké ou disliké" });
        } else {
          //sinon mettre un dislike
          Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
            .then(() => {
              res.status(200).json({ message: "Je n'aime pas" });
            })
            .catch((error) => res.status(400).json({ error: error.message }));
        }
      } else {
        res.status(400).json({ error: "Like ne peut que être égale à -1, 0 ou 1" });
      }
    })
    //
    .catch((error) => res.status(404).json({ error: error.message }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};
