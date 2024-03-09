const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  offerId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "offers",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "userData",
  },
  isActive: {
    type: Boolean,
    require: true,
  },
});
cartSchema.set("timestamps", true);
module.exports = mongoose.model("cart", cartSchema);
