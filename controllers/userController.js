const USER = require('../DB/models/user');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../utils/ErrorHandler');
const { SuccesHandler } = require('../utils/SuccessHandler');
const { getToken, getOTPToken, getID } = require('../utils/my_jwt');
const { sendEmail } = require('../utils/emailSender');
const { uploadImage } = require("../utils/ImageKit");


module.exports.registration = async (req,res,next) => {
    try{
        const otp = Math.floor(Math.random()*899998)+100000;
        let {name, email, password} = req.body;
        const imageFile = req.file;
        const image = await uploadImage(imageFile.buffer, imageFile.originalname);
        if(await USER.findOne({email: email})){
            return next(new ErrorHandler(402, "Email is already registered"));
        }
        password = await bcrypt.hash(password,12);
        const user = new USER({name,email,password,image,otp});
        console.log(user);
        const token = getToken(user);
        await user.save();
        SuccesHandler(res,200,"user created successfully",token);
    }catch(e){
        console.log(e);
    }
    
}

module.exports.verify_otp = async (req,res) => {
    const {email,otp} = req.body;
    const user = await USER.findOne({email: email});
    const token = getToken(user);
    if(otp == user.otp){
        SuccesHandler(res,200,"OTP Verified",token);
    }else{
        ErrorHandler(401, "OTP NOT VERIFIED");
    }
}

module.exports.Login = async (req,res,next) => {
    const {email, password} = req.body;
    console.log(email,password);
    const user = await USER.findOne({email: email});
    if(!user){
        return next(new ErrorHandler(404, "Email does Not Exist"));
    }
    const isAuthenticate = await bcrypt.compare(password, user.password);
    if(isAuthenticate){
        const token = getToken(user);
        return SuccesHandler(res,200,"Login SuccessFully",token);
    }else{
        return next(new ErrorHandler(401, "Password Incorrect"));
    }
}

module.exports.getUSERDetail = async (req,res) => {
    try{
    const {token} = req.params;
    const {id} = getID(token)
    const user = await USER.findById(id) .populate({
        path: 'post.photos',
        model: 'PHOTO',
        options: { sort: { _id: -1 } } // Replace 'Photo' with your actual photo model name
      })
      .populate({
        path: 'post.text',
        model: 'TEXT' // Replace 'Text' with your actual text model name
      }).sort({_id:-1}).exec();
    SuccesHandler(res,200,user);}catch(e){
        console.log(e);
    }
}

