const JWT = require("jsonwebtoken");

exports.requiredSignIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authorization required",
      });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    next();
  } catch (error) {
    console.log(error);
  }
};
