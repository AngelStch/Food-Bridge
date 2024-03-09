const mongoose = require("mongoose");

const resturantSchema = mongoose.Schema({
  resturantName: {
    type: String,
    require: true,
  },
  resturantCountry: {
    type: String,
    require: true,
  },
  resturantPostalCode: {
    type: Number,
    require: true,
  },
  resturantCity: {
    type: String,
    require: true,
  },
  resturantRegion: {
    type: String,
    require: true,
  },
  resturantAddress: {
    type: String,
    require: true,
  },
  resturantPassword: {
    type: String,
    require: true,
  },
  userRole: {
    type: String,
    enum: ["user", "resturant", "admin"],
    require: true,
  },
  resturantPhone: {
    type: Number,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
  restaurantImage: {
    type: String,
    require: true,
  }
});
resturantSchema.set("timestamps", true);
module.exports = mongoose.model("resturant", resturantSchema);
