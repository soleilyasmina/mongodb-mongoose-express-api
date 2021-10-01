const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const db = require("./db");
const brandRouter = require("./routes/brand");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/brands", brandRouter);

app.get("/", (req, res) => {
  res.send("This is the home route!");
});

app.listen(PORT, () => console.log(`Express server now listening on port ${PORT}!`))