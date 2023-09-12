const express = require('express');
const { uploadTextPost } = require('../controllers/textController');

const router = express.Router();

router.route("/upload/singletext/:token").post(uploadTextPost);

module.exports = router;