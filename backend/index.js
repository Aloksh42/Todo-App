require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log("Server started !");
    })
  )
  .catch((err) => {
    console.log(err);
  });
