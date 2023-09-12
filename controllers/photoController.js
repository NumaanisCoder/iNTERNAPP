const PHOTO = require("../DB/models/photo");
const jwt = require('jsonwebtoken');
const { uploadImage } = require("../utils/ImageKit");
const { SuccesHandler } = require("../utils/SuccessHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const USER = require('../DB/models/user');
const TEXT = require('../DB/models/text');

module.exports.uploadSinglePhoto = async (req,res,next) => {
    try{
    const imageFile = req.file;
    const {caption} = req.body;
    const {token} = req.params;
    const image = await uploadImage(imageFile.buffer, imageFile.originalname);
    const {id} = await jwt.verify(token, process.env.JWT_KEY);
    const user = await USER.findById(id);
    const photo = new PHOTO({image,caption});
    photo.user = user;
    user.post.photos.push(photo);
    await user.save();
    await photo.save();
    SuccesHandler(res,200,"photo uploaded successfully");}catch(e){next(new ErrorHandler(400, "Something Went Wrong In Uploading Photo"))};
}

module.exports.getAllphotos = async (req,res) =>{
    const photos = await PHOTO.find({}).populate("user").sort({_id: -1}).exec();
    SuccesHandler(res,200,photos);
}

