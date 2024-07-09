import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Wallet = () => {
    
    const balance = useSelector(state=>state.balance);
    const [bal,setbal] = useState(balance);
   

  return (
    <div className='flex justify-center items-center h-[100vh] w-[100vw] bg-white'>
     <div className='md:h-[30vh] md:w-[30vw] h-[50vh] w-full bg-black text-white rounded-md text-left font-serif p-3'>
     <h1 className='text-center font-extrabold text-3xl underline'>My Wallet</h1>
     <h2 className='p-2'><span className='font-bold'>Account Holder's Name</span> :Ayush</h2><hr className='border-1 border-white'></hr>
     <h2 className='p-2'><span className='font-bold'>Balance</span> : {bal!=undefined ? parseInt(bal).toFixed(2):null}</h2> <hr className='border-1 border-white'></hr>
     {/*  */}
     <Link
     to={''}
  type="button"
  className="inline-flex items-center text-black rounded-md bg-white px-3 py-2 text-sm m-2 font-semibold"
>
  Top-Up
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="ml-2 h-4 w-4"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
</Link>

     {/*  */}
    </div>
    </div>
    
  )
}

export default Wallet