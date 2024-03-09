const resturantRouter = require("express").Router();
// const upload = require("../middleware/imageStorage");
const resturant = require("../controllers/resturantController");
// const { signupValidate, loginValidate } = require("../validation/resturantValidate");

resturantRouter.post(
  "/signup",
  // upload.single("profilePic"),
  // signupValidate,
  resturant.resturantSignup
);
resturantRouter.post(
  "/login",
  // upload.single("profilePic"),
  // signupValidate,
  resturant.resturantLogin
);
// userRouter.post("/forgetpassword", user.forgetPassword);
// userRouter.post("/login", loginValidate, user.userLogin);
// userRouter.post("/resetpassword/:id/:token", user.resetPassword);

module.exports = resturantRouter;
