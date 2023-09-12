const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadSinglePhoto, getAllphotos } = require('../controllers/photoController');
const upload = multer({storage: multer.memoryStorage()});


router.route("/upload/singlephoto/:token").post(upload.single('image'),uploadSinglePhoto);
router.route("/upload/allphotos").get(getAllphotos);

module.exports = router;