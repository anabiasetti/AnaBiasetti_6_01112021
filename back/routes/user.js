const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
/**
 * On utilisse de routes post puisque le front va envoyer les informations:
 * adresse email et mot de passe
 */
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
