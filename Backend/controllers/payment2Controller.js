
const { default: axios, Axios } = require('axios');
const express = require('express');
const paymentStatus = async(req,response) => {
    const orderId = req.params.orderid;
    const options = {
        method:'GET',
        url:`https://sandbox.cashfree.com/pg/orders/${orderId}`,
        headers:{
            "x-client-id":"TEST10246360134f563e0152a9f48ea406364201",
            "x-client-secret":"cfsk_ma_test_0a2b0b8a30ba9784204b9547d9a7c0c1_a8e157ad",
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
