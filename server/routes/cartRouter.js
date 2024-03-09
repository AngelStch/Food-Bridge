const cartRouter = require("express").Router();
const cart = require("../controllers/cartController");

cartRouter.post(
  "/",
  // signupValidate,
  cart.addToCart
);

cartRouter.post(
  "/checkout",
  // signupValidate,
  cart.checkoutCart
);

cartRouter.get(
  "/:id",
  // signupValidate,
  cart.cartOfferList
);

cartRouter.delete(
  "/:id",
  // signupValidate,
  cart.deleteCartOffer
);

cartRouter.post("/remove-from-cart", cart.removeFromCart);

module.exports = cartRouter;
