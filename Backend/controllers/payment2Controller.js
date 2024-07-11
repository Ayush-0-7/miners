
const { default: axios, Axios } = require('axios');
const express = require('express');
const paymentStatus = async(req,response) => {
    const orderId = req.params.orderid;
    const options = {
        method:'GET',
        url:`https://sandbox.cashfree.com/pg/orders/${orderId}`,
        headers:{
            "x-client-id":process.env.ID,
            "x-client-secret":process.env.SECRET,
            "x-api-version":"2023-08-01",
            accept:"application/json",
           
        }

    };
    axios.request(options)
    .then(async(res)=>{
      
       console.log("*******",res.data);
       response.json({order_data:res.data});
    })
}
module.exports = paymentStatus ;
