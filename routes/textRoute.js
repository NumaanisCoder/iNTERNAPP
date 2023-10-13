const express = require('express');
const { uploadTextPost } = require('../controllers/textController');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

const router = express.Router();

router.route("/upload/singletext/:token").post(upload.single(''),uploadTextPost);

module.exports = router;