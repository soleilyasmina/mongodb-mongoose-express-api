const mongoose = require("mongoose");

// set up connection URI to use PROD_MONGODB from env or our local connection URI
const MONGODB_URI = process.env.PROD_MONGODB || "mongodb://127.0.0.1:27017/productsBrandsDatabase";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB! 🚀"))
  .catch((e) => console.error("MongoDB connection error:", e.message));

const db = mongoose.connection;
mongoose.set("debug", true);

db.on("error", console.error.bind(console, "MongoDB error:"));

module.exports = db;