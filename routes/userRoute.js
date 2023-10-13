const express = require('express');
const { registration, Login, verify_otp, getUSERDetail } = require('../controllers/userController');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

const route = express.Router();

route.route('/registration').post(upload.single('image'),registration);
route.route('/otpverify').post(verify_otp);
route.route('/login').post(upload.single(''),Login);
route.route('/getuserdetail/:token').get(getUSERDetail);
 

module.exports = route;

