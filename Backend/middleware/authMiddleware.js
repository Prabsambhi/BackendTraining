const JWT = require("jsonwebtoken");

exports.requiredSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log(decode);
    next();
  } catch (error) {
    console.log(error);
  }
};
