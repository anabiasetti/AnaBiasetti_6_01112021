const express = require("express");
const router = express.Router();
const Sauce = require("../models/Sauce");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controllers/sauces");

/**
 * logique de route
 * On met la route et on met le middleware
 * router.post("");
 */
router.post("/api/sauces", (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    /*L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body*/
    ...req.body,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});
//===============//
router.post("/api/sauces/:id/like", (req, res, next) => {});

//==============//
router.put("/api/sauces/:id", (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});
//=================//
router.delete("/api/sauces/:id", (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});
//===============//
router.get("/api/sauces/:id", (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
});
//===============//
router.get("/api/sauces", (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
