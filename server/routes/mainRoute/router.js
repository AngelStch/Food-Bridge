const router = require("express").Router();
// const validateToken = require("../../middleware/validateToken");
// const cartRouter = require("../cartRouter");
// const productRouter = require("../productRouter");
// const reviewRouter = require("../reviewRouter");
const userRouter = require("../userRouter");
const resturantRouter = require("../resturantRouter");
const offerRouter = require("../offerRouter");
const cartRouter = require("../cartRouter");

router.use("/user", userRouter);
router.use("/resturant", resturantRouter);
router.use("/offer", offerRouter);
router.use("/cart", cartRouter);
// router.use(validateToken);
// router.use("/review", reviewRouter);
// router.use("/product", productRouter);
// router.use("/cart", cartRouter);

module.exports = router;
