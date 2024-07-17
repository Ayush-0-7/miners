import React from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'
import { useDispatch, useSelector } from 'react-redux'
import { IoCloseCircle } from "react-icons/io5";
import {isportal } from '../features/miners/MinerSlice';
const Modal = () => {
  const amount = useSelector(state=>state.amount)
  const bombs = useSelector(state=>state.bombs)
  const dispatch = useDispatch();
  const invest = useSelector(state=>state.investedAmount)
  const handleclick = async() => {
    window.location.reload();
  }

  return createPortal (
    <div id='score' className='flex justify-center items-center h-full w-full'>
      <div className='md:h-[30vh] md:w-[30vw] h-[70vh] w-full bg-black rounded-md p-2'>
      <div className='flex justify-between'>
      <h1 className='text-white underline font-serif font-bold text-2xl text-center'>Score</h1>
      <button onClick={handleclick}><IoCloseCircle className='text-white h-7 w-7'/></button>
      </div>
      <h3 className='text-white font-semibold p-2'>Money Invested:{invest}</h3><hr className='border-0.5 border-white'></hr>
      <h3 className='text-white font-semibold p-2'>Money made:{amount.toFixed(2)}</h3><hr className='border-0.5 border-white'></hr>
      <h3 className='text-white font-semibold p-2'>No. of Bombs: {bombs}</h3>
      </div>
    </div>,
    document.getElementById("scorecard")
  )
}

export default Modal