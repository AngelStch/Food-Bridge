const mongoose = require("mongoose");

mongoose
  .connect(process.env.URL || "mongodb://127.0.0.1:27017/food-bridge-db", { useNewUrlParser: true })
  .then((data) => {
    console.log(`MongoDb successfully connected to ${data.connection.name}`);
  })
  .catch((err) => {
    console.log(`Error occur ${err.message}`);
  });
