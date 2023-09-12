const jwt = require("jsonwebtoken");
require('dotenv').config({path: '../config/.env'})

var expiryTime = 604800; //for 7 days 60*60*24*7
module.exports.getToken = (user) => {
  return jwt.sign({id: user._id}, process.env.JWT_KEY, { expiresIn: expiryTime });
};
module.exports.getOTPToken = (otp) => {
  return jwt.sign({otp: otp},process.env.JWT_KEY,{expiresIn: 90});
}
const token = jwt.sign({id: '64fa097d88927d2359098233'},'IDONTKNOWWHATWILLBETHEPASSWORDBYNQ');
console.log(token);


