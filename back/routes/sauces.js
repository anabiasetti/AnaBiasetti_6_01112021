const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
/*On exporte const Sauce = require("../models/Sauce") à controllers et on crée sauceCtrl*/
const sauceCtrl = require("../controllers/sauces");

/** Routes disponibles dans l'application,avec action CRUD disponibles,
 avec leur endpoints, les middleware utilisés et leur fonction */
router.post("/", auth, multer, sauceCtrl.createSauce);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

/**
 * logique de route
 * On met la route et on met le middleware
 * router.post("");
 */

module.exports = router;
