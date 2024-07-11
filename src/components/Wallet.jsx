import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { changebalance, changepayment } from '../features/miners/MinerSlice';
import { cashfree } from './util';

const Wallet = () => {
    const dispatch = useDispatch();
    const psi = useSelector(state=>state.psi)
    const oid = useSelector(state=>state.oid)

    const balance = useSelector(state=>state.balance);
    const [bal,setbal] = useState(balance);
    const topup = useRef();
    const navigate = useNavigate();
    const handlepayment = async() => {
      await fetch('http://localhost:5000/api/order',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({topup:topup.current.value})
      }).then(async(res)=>{
        const data1 = await res.json();
        console.log(data1);
        localStorage.setItem('oid',data1.order_id);
        dispatch(changepayment({psi:data1.psi,oid:data1.order_id}));
        return data1.psi;
      })
      .then((res)=>{

      
      let checkoutOptions = {
        paymentSessionId:res,
        returnUrl: "http://localhost:5173/wallet",
        
      }
      cashfree.checkout(checkoutOptions).then(function(result){



        if(result.error){
          alert(result.error.message);
          navigate('/wallet');
          
        }
        if(result.redirect){
          console.log("Redirection")
        }
      });
     })
     /*.then(async()=>{
     
     await fetch('http://localhost:5000/api/paymentStatus',{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({oid:oid})
     }).then(async(res)=>{
      const data =  await res.json();
      console.log(data.order_status);
     }).catch((err)=>{
       console.log(err);
     })
    })*/
     .catch((error)=>{
      console.log(error);
    })
    }
    const handlevalidate = async() => {
      const oid = localStorage.getItem('oid');
      await fetch(`http://localhost:5000/api/paymentStatus/${oid}`,{
        method:'GET',
        headers:{
          "Content-Type":"application/json"
        }
      }).then(async(res)=>{
        const data = await res.json();
        console.log(data.order_data);
        const total_balance = parseInt(balance) + data.order_data.order_amount;
        dispatch(changebalance({balance:total_balance}));
        localStorage.setItem('balances',total_balance);
        localStorage.setItem('oid',"");
      }).catch((error)=>{
        console.log(error);
      })
      
    }
  return (
    <div className='flex justify-center items-center h-[100vh] w-[100vw] bg-white'>
     <div className='md:h-[35vh] md:w-[30vw] h-[50vh] w-full bg-black text-white rounded-md text-left font-serif p-3'>
     <h1 className='text-center font-extrabold text-3xl underline'>My Wallet</h1>
     <h2 className='p-2'><span className='font-bold'>Account Holder's Name</span> :Ayush</h2><hr className='border-1 border-white'></hr>
     <h2 className='p-2'><span className='font-bold'>Balance</span> : {parseInt(balance)}</h2> <hr className='border-1 border-white'></hr>
     {/*  */}
     <div className='flex'>
     <Link
     to={''}
  type="button"
  className="inline-flex items-center text-black rounded-md bg-white px-3 py-2 text-sm m-2 font-semibold"
  onClick={handlepayment}
>
  Top-Up
  
</Link>
<button className='bg-white rounded-md text-black font-semibold m-2' onClick={handlevalidate}>Validate Payment</button>
<div className="w-full md:w-[10vw] m-2">
  <input
    ref={topup}
    className="flex h-12 w-full rounded-md bg-transparent px-3 py-2 text-sm placeholder:text-gray-600  disabled:cursor-not-allowed disabled:opacity-50 border-white border-2"
    type="text"
    placeholder="Amount"
  />
</div>
</div>
     {/*  */}
    </div>
    </div>
    
  )
}

export default Wallet