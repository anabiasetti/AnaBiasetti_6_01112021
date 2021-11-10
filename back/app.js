/* Installation d'express */
const express = require("express");
const app = express();
/*Conection à mongoDB */
const mongoose = require("mongoose");

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

/* On utilise le router qui est expossé par stuffroutes*/
app.use("/api/sauces", sauceRoutes);
/**
 *
 */
app.use("/api/auth", userRoutes);
module.exports = app;
