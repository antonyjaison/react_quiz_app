require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const questionRoutes = require("./routes/question");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/question",questionRoutes);

// db connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("connected to db", process.env.PORT)
    );
  })
  .catch((err) => console.log(err));
