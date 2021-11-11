/* Installation d'express */
const express = require("express");
const app = express();
/*Conection à mongoDB */
const mongoose = require("mongoose");
/* Importation dans app.js pour accéder au path de notre serveur :*/
const path = require("path");

/* Configuration du routage: sauceRoutes   */
const sauceRoutes = require("./routes/sauces");
/* */
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb+srv://user:Q3XKunOM35OtdzUp@cluster0.a2ohj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

/*  Afin de ressoudre problemes de CORS*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
/**
 * Pour body parser
 * https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
 * ( express.json() ) pour analyser le corps de la requête
 */
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/**https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466669-modifiez-les-routes-pour-prendre-en-compte-les-fichiers#/id/r-6466649 */
app.use("/images", express.static(path.join(__dirname, "images")));

/* On utilise le router qui est expossé par sauceRoutes*/
app.use("/api/sauces", sauceRoutes);
/**
 * On utilise le router qui est expossé par sauceRoutes
 */

app.use("/api/auth", userRoutes);
module.exports = app;
