const express  = require('express');
const  userRouter  = require('./routes/userRoute');
const photoRouter = require('./routes/photosRoute')
const textRouter = require('./routes/textRoute');
const { DBConnection } = require('./DB/DBConnection');
const app = express();
require('dotenv').config({path:'./config/.env'});

DBConnection();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1',userRouter);
app.use('/api/v2',photoRouter);
app.use('/api/v3',textRouter);


app.get('/', (req,res)=>{
    res.send("hello");
})
app.use((err,req,res,next)=>{
    const {status, message} = err;
    res.status(status).send({
        success: false,
        status: status,
        message: message
    })
    console.log(message);
})
app.listen(process.env.PORT, ()=>{
    console.log(`http://localhost:${process.env.PORT}`);
})
