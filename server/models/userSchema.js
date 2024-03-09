const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  userCountry: {
    type: String,
    require: true,
  },
  userPostalCode: {
    type: Number,
    require: true,
  },
  userCity: {
    type: String,
    require: true,
  },
  userRegion: {
    type: String,
    require: true,
  },
  userAddress: {
    type: String,
    require: true,
  },
  userPassword: {
    type: String,
    require: true,
  },
  userRole: {
    type: String,
    enum: ["user", "resturant", "admin"],
    require: true,
  },
  userPhone: {
    type: Number,
    require: true,
  },
  profilePic: {
    type: String,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
});
userSchema.set("timestamps", true);
module.exports = mongoose.model("userData", userSchema);
