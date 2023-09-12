const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    image: {
        type: String,
    },
    caption:{
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId, ref: "USER"
    },
    postDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("PHOTO",photoSchema);