const express  = require('express');
const  userRouter  = require('./routes/userRoute');
const photoRouter = require('./routes/photosRoute')
const textRouter = require('./routes/textRoute');
const { DBConnection } = require('./DB/DBConnection');
const cors = require('cors');
const app = express();
require('dotenv').config({path:'./config/.env'});

DBConnection();

const urlSupported = ['http://localhost:3000', 'http://localhost:3001'];
   
app.use(cors({
    origin: urlSupported,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1',userRouter);
app.use('/api/v2',photoRouter);
app.use('/api/v3',textRouter);

app.get('/', (req,res)=>{
    res.status(200).json({
        message: "Server is ON ;)"
    }); 
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
