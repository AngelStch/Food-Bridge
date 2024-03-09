const userSchema = require("../models/userSchema");
const resturantSchema = require("../models/resturantSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  console.log(req.body, "req.body,===");
  const userData = new userSchema(req.body);
  try {
    const isUserExist = await userSchema.findOne({
      userName: req.body.userName,
    });
    if (isUserExist) {
      // req.file ? fs.unlinkSync(req.file.path) : null;
      res.status(409).json({
        success: true,
        messsage: "User вече е регистриран с това име",
      });
    } else {
      if (req.file !== undefined) {
        userData.profilePic = `${req.file.path}`;
      }
      userData.userPassword = await bcrypt.hash(req.body.userPassword, 10);
      await userData.save();
      res.status(201).json({
        success: true,
        messsage: "Потребителят се регистрира успешно",
        data: userData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

const userLogin = async (req, res) => {
  console.log(req.body, "req.body,----------");
  const userData = await userSchema.findOne({ userName: req.body.userName });
  try {
    if (userData) {
      const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        res.status(200).json({
          success: true,
          message: "Влизането на потребител успешно",
          token: token,
          data: userData,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "невалиден имейл или парола",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Потребител, който не е регистриран с това име",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const resturantList = async (req, res) => {
  const { search } = req.query;
  try {
    const resturantData = await resturantSchema.find({
      resturantName: { $regex: search ?? '', $options: "i" },
    }).select('-resturantPassword');
    if (resturantData) {
        res.status(200).json({
          success: true,
          message: "Resturant list.",
          data: resturantData ?? [],
        });
    } else {
      res.status(404).json({
        success: false,
        message: "Ресторанти не са намерени",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = { userSignup, userLogin, resturantList };
