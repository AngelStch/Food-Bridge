const resturantSchema = require("../models/resturantSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const resturantSignup = async (req, res) => {
  console.log(req.body, "req.body,===");
  const resturantData = new resturantSchema(req.body);
  try {
    const isResturantExists = await resturantSchema.findOne({
      resturantName: req.body.resturantName,
    });
    if (isResturantExists) {
      res.status(409).json({
        success: false,
        messsage: "Ресторантът вече е регистриран с това име",
      });
    } else {
      resturantData.resturantPassword = await bcrypt.hash(req.body.resturantPassword, 10);
      await resturantData.save();
      res.status(201).json({
        success: true,
        messsage: "Ресторантът се регистрира успешно",
        data: resturantData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

const resturantLogin = async (req, res) => {
    const resturantData = await resturantSchema.findOne({ resturantName: req.body.resturantName });
    try {
      if (resturantData) {
        const token = jwt.sign({ resturantData }, process.env.SECRET_KEY, {
          expiresIn: "2h",
        });
        const hashPassword = await bcrypt.compare(
          req.body.resturantPassword,
          resturantData.resturantPassword
        );
        if (resturantData && hashPassword) {
          res.status(200).json({
            success: true,
            message: "Влизането в ресторанта е успешно",
            token: token,
            data:resturantData
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Невалиден имейл или парола",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "Ресторантът не е регистриран с този имейл",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  };

module.exports = { resturantSignup, resturantLogin };
