const mongoose = require("mongoose");

function connectToDb(dbName) {
  mongoose
    .connect("mongodb://localhost:27017/", { dbName: dbName })
    .then(() => console.log("connected to db :" + dbName))
    .catch((e) => console.log(dbName + "error :", error.message));
}
module.exports= connectToDb