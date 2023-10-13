const express = require('express');
const router = express.Router();
const { uploadSinglePhoto, getAllphotos } = require('../controllers/photoController');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});


router.route("/upload/singlephoto/:token").post(upload.single('image'),uploadSinglePhoto);
router.route("/get/allphotos").get(getAllphotos);

module.exports = router;