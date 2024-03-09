const offerRouter = require("express").Router();
const offer = require("../controllers/offerController");

offerRouter.post(
  "/",
  // signupValidate,
  offer.createOffer
);

offerRouter.get(
  "/:id",
  // signupValidate,
  offer.resturantOfferList
);
offerRouter.get(
  "/single/:id",
  // signupValidate,
  offer.getOffer
);

offerRouter.patch(
  "/:id",
  // signupValidate,
  offer.editOffer
);
offerRouter.delete(
  "/:id",
  // signupValidate,
  offer.deleteOffer
);

offerRouter.get(
  "/details/:id",
  offer.getOfferDetails
);

module.exports = offerRouter;
