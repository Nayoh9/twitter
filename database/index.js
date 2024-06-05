const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/twitter")
    .then(() => { console.log("connexion db ok!") })
    .catch((err) => { console.log(err) });