const cartSchema = require("../models/cartSchema");
const offerSchema = require("../models/offerSchema");

const addToCart = async (req, res) => {
  console.log(req.body, "req.body,===");
  const { body } = req;
  const cartData = new cartSchema(body);
  try {
    const offer = await offerSchema.findById(body.offerId);
    if(offer.quantity <= 0) {
      return res.status(404).json({
        success: false,
        data: {},
        message: "Артикулът е изчерпан"
      })
    }
    const isCartExists = await cartSchema.findOne({
      $and: [{ offerId: body.offerId }, { userId: body.userId }],
    });
    if (isCartExists) {
      if (offer.quantity < (isCartExists.quantity + body.quantity)) {
        return res.status(400).json({
          success: false,
          data: {},
          message: "Добавянето на количество надвишава наличното количество на офертата!",
        });
      }
      
      await cartSchema.findByIdAndUpdate(
        isCartExists?._id,
        { quantity: isCartExists?.quantity + body?.quantity },
        {
          new: true,
        }
      );
      res.status(201).json({
        success: true,
        data: {},
        messsage: "Офертата е добавена в количката.",
      });
    } else {
      await cartData.save();
      res.status(201).json({
        success: true,
        data: {},
        messsage: "Офертата е добавена в количката.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};


const checkoutCart = async (req, res) => {
  const { body } = req;
  try {
    const cartItems = await cartSchema.find({ userId: body.userId });

    // Iterate through cart items
    for (const cartItem of cartItems) {
      // Find corresponding offer
      const offer = await offerSchema.findOne({ _id: cartItem.offerId });

       // Check if cart item quantity exceeds offer quantity
       if (cartItem.quantity > offer.quantity) {
        return res.status(400).json({
          success: false,
          message: `Количеството на артикул надвишава наличното количество в офертата.`,
        });
      }
      
      // Update offer quantity
      if (offer) {
        const newQuantity = offer.quantity - cartItem.quantity;
        await offerSchema.updateOne({ _id: cartItem.offerId }, { quantity: newQuantity });
      }
    }

    await cartSchema.deleteMany({ userId: body.userId });

    return res.status(200).json({
      success: true,
      data: cartItems,
      message: "Артикулите от количката са премахнати успешно от списъка!",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

const removeFromCart = async (req, res) => {
  const { body } = req;
  try {
    const cartItem = await cartSchema.findOne({
      $and: [{ _id: body.offerId }, { userId: body.userId }],
    });
    console.log("CHECKING:: OFFER ID: BODY:   ", body.offerId);
    console.log("CHECKING:: User ID: BODY:   ", body.userId);
    console.log("CHECKING:: CartItem:   ", cartItem);
    if (cartItem) {
      if (cartItem.quantity === 1) {
        // If there's only one item, remove it from the cart
        await cartSchema.findByIdAndDelete(cartItem._id);
      } else {
        // If there are multiple items, decrease the quantity by one
        await cartSchema.findByIdAndUpdate(cartItem._id, {
          quantity: cartItem.quantity - 1,
        });
      }
      res.status(200).json({
        success: true,
        message: "Артикулът е премахнат от количката.",
      });
    } else {
      res.status(404).json({
        success: false,
        data: cartItem,
        message: "Артикулът не е намерен в количката.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occurred: ${error.message}`,
    });
  }
};

const deleteCartOffer = async (req, res) => {
  try {
    const cart = await cartSchema.findById(req?.params?.id);
    if (cart) {
      await cartSchema.findByIdAndDelete(req?.params?.id);
      res.status(200).json({
        success: true,
        messsage: "cart deleted successfully.",
      });
    } else {
      res.status(200).json({
        success: true,
        messsage: "cart not found.",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

const cartOfferList = async (req, res) => {
  try {
    const cartList = await cartSchema
      .find({
        userId: req?.params?.id,
      })
      .populate({ path: "offerId" });
    if (cartList) {
      res.status(200).json({
        success: true,
        messsage: "Cart list fetch successfully.",
        data: cartList,
      });
    } else {
      res.status(200).json({
        success: true,
        messsage: "cart is empty.",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

module.exports = { addToCart, deleteCartOffer, cartOfferList, removeFromCart, checkoutCart };
