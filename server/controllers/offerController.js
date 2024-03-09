const offerSchema = require("../models/offerSchema");
const resturantSchema = require("../models/resturantSchema");
const { formatDistanceToNow, parseISO, parse } = require('date-fns');

const createOffer = async (req, res) => {
  console.log(req.body, "req.body,===");
  const offerData = new offerSchema(req.body);
  try {
    await offerData.save();
    res.status(201).json({
      success: true,
      messsage: "Офертата е създадена успешно",
      data: offerData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

const resturantOfferList = async (req, res) => {
  try {
    const offerList = await offerSchema
      .find({
        resturantId: req?.params?.id,
      })
      .populate({ path: "resturantId", select: "-resturantPassword" });

      const restaurant = await resturantSchema.findOne({
        _id: req?.params?.id,
      });
    if (offerList) {
      res.status(200).json({
        success: true,
        messsage: "Offer list fetch successfully.",
        data: { offerList, restaurant },
      });
    } else {
      res.status(200).json({
        success: true,
        messsage: "Offers not found.",
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

const getOffer = async (req, res) => {
  try {
    const offerList = await offerSchema
      .findOne({
        _id: req?.params?.id,
      })
    if (offerList) {
      res.status(200).json({
        success: true,
        messsage: "Offer fetch successfully.",
        data: offerList,
      });
    } else {
      res.status(200).json({
        success: true,
        messsage: "Offers not found.",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

const getOfferDetails = async (req, res) => {
  try {
    const offerList = await offerSchema
      .findOne({
        _id: req?.params?.id,
      })
    if (offerList) {
      const timeAgo = formatDistanceToNow(offerList.createdAt);

      const response = {
        createdAt: timeAgo,
        _id: offerList._id,
        updatedAt: offerList.updatedAt,
        offerImage: offerList.offerImage,
        resturantId: offerList.resturantId,
        price: offerList.price,
        quantity: offerList.quantity,
        mealName: offerList.mealName,
        ingrediants: offerList.ingrediants,
        description: offerList.description,
      }


      res.status(200).json({
        success: true,
        messsage: "Offer details fetched successfully.",
        data: response,
      });
    } else {
      res.status(200).json({
        success: true,
        messsage: "Offers not found.",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

const editOffer = async (req, res) => {
  try {
    const offer = await offerSchema.findById(req?.params?.id);
    if (offer) {
      const updateOffer = await offerSchema.findByIdAndUpdate(
        req?.params?.id,
        req.body,
        { new: true }
      );
      res.status(202).json({
        success: true,
        messsage: "Офертата е актуализирана успешно.",
        data: updateOffer,
      });
    } else {
      res.status(200).json({
        success: true,
        messsage: "Оферти не са намерени.",
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

const deleteOffer = async (req, res) => {
  try {
    const offer = await offerSchema.findById(req?.params?.id);
    if (offer) {
      await offerSchema.findByIdAndDelete(req?.params?.id);
      res.status(200).json({
        success: true,
        messsage: "Офертата е изтрита успешно.",
      });
    } else {
      res.status(200).json({
        success: true,
        messsage: "Оферти не са намерени.",
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

module.exports = { createOffer, resturantOfferList, editOffer, deleteOffer, getOffer, getOfferDetails };
