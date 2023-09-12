const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Avatar:{
        type: String,
        required: false
    },
    bio:{
        type: String,
        required: false
    },
    post:{
        photos:[
            {type: mongoose.Types.ObjectId}
        ],
        text:[
            {type: mongoose.Types.ObjectId}
        ]
    }
})

module.exports = mongoose.model('USER',userSchema);