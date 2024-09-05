const userModel = require("../Model/userModel");
const { hashPassword, comparePassword } = require("../helpers/hashPassword");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User Already registered with this email",
      });
    }

    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: "User Registered succcessfully",
      name,
      email,
      phone,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // This will generate a JWT token for our user

    res.status(200).send({
      success: true,
      message: "Login Successfull",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token, // Send the token to our client (Frontend)
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

exports.dashboardController = (req, res) => {
  res.send("You are on dashboard page");
};

exports.forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not found",
      });
    }

    const resetToken = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // localhost:5173/reset-password/token

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      text: `Click on the link to reset the password ${resetLink}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).send({
          success: false,
          message: "Error sending email",
          error,
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Sent password reset link ",
          resetLink,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
  }
};

exports.resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(404).send({
        success: false,
        message: "Password required",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid user",
      });
    }

    const match = await comparePassword(newPassword, user.password);

    if (match) {
      return res.status(404).send({
        success: false,
        message: "Your password can't be same as old password",
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;

    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch {
    res.status(500).send({
      success: false,
      message: "Error in reset password",
      error,
    });
  }
};
