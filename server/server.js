const express = require('express');
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/mainRoute/router");
require("./config/dbConfig");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(cors());

app.use("/", router);

app.listen(PORT, () => {
    console.log("connected sucsesfully")
  console.log(`Server is running on port ${PORT}`);
});
