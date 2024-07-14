require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT ;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./api/orderRoute');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api',router);
app.get('/sucess',(req,res)=>{
    res.send("Payment is successful.")    
})
app.get('/fail',(req,res)=>{
    res.send("Payment is unsuccessful")    
})
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});