const USER = require('../DB/models/user');
const TEXT = require('../DB/models/text');
const jwt = require('jsonwebtoken');
const { SuccesHandler } = require('../utils/SuccessHandler');
const ErrorHandler = require('../utils/ErrorHandler');

module.exports.uploadTextPost = async (req,res,next) => {
    //getting user details
    const {token} = req.params;
    const {id} = jwt.verify(token, process.env.JWT_KEY);
    const {text} = req.body;
    console.log("Text is ",text);
    if(!text){
        return next(new ErrorHandler(401,"Text is empty"))
    }
    const user = await USER.findById(id);
    const textpost = new TEXT({text});
    user.post.text.push(textpost);
    await textpost.save();
    await user.save();
    SuccesHandler(res,200,"Text Posted Successfully");
}