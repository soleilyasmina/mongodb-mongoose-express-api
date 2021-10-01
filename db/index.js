const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/productsBrandsDatabase")
  .then(() => console.log("Connected to MongoDB! 🚀"))
  .catch((e) => console.error("MongoDB connection error:", e.message));

const db = mongoose.connection;
mongoose.set("debug", true);

db.on("error", console.error.bind(console, "MongoDB error:"));

module.exports = db;