const mongoose = require("mongoose");

function connectToDb(dbName) {
  mongoose
    .connect("mongodb+srv://henritinysonic_db_user:eyH26AyiVbWjCTNz@cluster0.ryx1tmp.mongodb.net/", { dbName: dbName })
    .then(() => console.log("connected to db :" + dbName))
    .catch((e) => console.log(dbName + "error :", error.message));
}
module.exports = connectToDb