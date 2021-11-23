/* Installation(npm install --save express) et Importation d'express */
const express = require("express");
const app = express();
/*Conection à mongoDB */
const mongoose = require("mongoose");
/**
 * Helmet protege l'application de certaines des vulnérabilités bien connues du Web,
 * en configurant de manière appropriée des en-têtes HTTP.
  Actuellement est une collection de neuf fonctions middleware plus petites
 qui définissent des en-têtes HTTP liés à la sécurité :
 * https://expressjs.com/fr/advanced/best-practice-security.html
 */
const helmet = require("helmet");
/* Importation dans app.js pour accéder au path de notre serveur :*/
const path = require("path");
/*Installation du dotenv */
require("dotenv").config();

/* Configuration du routage: sauceRoutes   */
const sauceRoutes = require("./routes/sauces");
/* */
const userRoutes = require("./routes/user");
/**Mongoose est un package qui facilite les interactions
 avec notre base de données MongoDB */
mongoose
  .connect(process.env.SECRET_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

/* https://helmetjs.github.io/ */
app.use(helmet());

/* Afin de ressoudre problemes de CORS : « Cross Origin Resource Sharing 
 assurer que le front-end peut effectuer des appels vers l'application en toute sécurité.
système de sécurité qui, par défaut, 
bloque les appels HTTP d'être effectués entre des serveurs différents,
 ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles. 
*/
app.use((req, res, next) => {
  //Pour ccéder à notre API depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  //ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //Envoyer des requêtes avec les méthodes mentionnées
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
/**
 * Pour body parser
 * https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
 * ( express.json() ) pour analyser le corps de la requête
 * transforme le corps de la requete en objet javascript utilisable
 */
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/**https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466669-modifiez-les-routes-pour-prendre-en-compte-les-fichiers#/id/r-6466649 
 * / indique à Express qu'il faut gerer la ressource images de manière statique à chaque requête reçue vers la route /images
// __dirname = nom du dossier dans lequel on va se trouver
*/
app.use("/images", express.static(path.join(__dirname, "images")));

/* On utilise le router qui est expossé par sauceRoutes*/
app.use("/api/sauces", sauceRoutes);
/**
 * On utilise le router qui est expossé par sauceRoutes
 */

app.use("/api/auth", userRoutes);
// Exportation de l'application(pour qu'on puisse y accéder depuis les qutres fichiers du projet)
module.exports = app;
