const mongoose = require('mongoose');

module.exports.DBConnection = () =>{ mongoose.connect(process.env.MONGODB_LOCALHOST_URL).then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log(`DB Cannot be Connected due to ${err}`);
})
};