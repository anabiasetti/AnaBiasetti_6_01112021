const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const stuffCtrl = require("../controllers/stuff");

/**
 * logique de route
 * On met la route et on met le middleware
 * router.post("");
 */

module.exports = router;
