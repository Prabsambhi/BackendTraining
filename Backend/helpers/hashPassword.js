const bycrpt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bycrpt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashedPassword)=>{
  return bycrpt.compare(password, hashedPassword);
}

module.exports = {hashPassword, comparePassword}