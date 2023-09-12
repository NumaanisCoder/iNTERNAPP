const nodemailer = require("nodemailer");
const { otptemplate } = require("./emailFormat/OTPtemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nkblogs.no.reply@gmail.com",
    pass: "cqqrpnrlqrrmfwol",
  },
});

module.exports.sendEmail = async (email = "", otp) => {
  const template = otptemplate(otp);
  const details = {
    from: "nkblogs.no.reply@gmail.com",
    to: email,
    subject: "OTP VERIFICATION",
    html: template,
  };
  await transporter.sendMail(details);
};
