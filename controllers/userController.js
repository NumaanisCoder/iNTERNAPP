const USER = require('../DB/models/user');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../utils/ErrorHandler');
const { SuccesHandler } = require('../utils/SuccessHandler');
const { getToken, getOTPToken } = require('../utils/my_jwt');
const { sendEmail } = require('../utils/emailSender');


module.exports.registration = async (req,res,next) => {
    try{
        const otp = Math.floor(Math.random()*899998)+100000;
        const otpToken = getOTPToken(otp);
        res.cookie("OTPBYNQ",otpToken);
        let {name, email, password, avatar} = req.body;
        if(await USER.findOne({email: email})){
            return next(new ErrorHandler(402, "Email is already registered"));
        }
        password = await bcrypt.hash(password,12);
        sendEmail(email,otp);
        const user = new USER({name,email,password});
        await user.save();
        const token = getToken(user);
        SuccesHandler(res,200,"user created successfully",token)
    }catch(e){
        console.log(e);
    }
    
}

module.exports.Login = async (req,res,next) => {
    let {email, password} = req.body;
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

