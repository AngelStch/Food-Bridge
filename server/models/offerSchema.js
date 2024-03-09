const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
  mealName: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    default: 0,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  ingrediants: {
    type: String,
    require: true,
  },
  resturantId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "resturant",
  },
  offerImage: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
});
offerSchema.set("timestamps", true);
module.exports = mongoose.model("offers", offerSchema);
