const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
    text:{
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

module.exports = mongoose.model("TEXT",textSchema);