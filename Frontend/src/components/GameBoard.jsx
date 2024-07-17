import React, { useEffect, useState } from 'react'
import { RiVipDiamondFill } from "react-icons/ri";
import { FaBomb } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { changeAmount, changeMultiplier, isportal } from '../features/miners/MinerSlice';
import Modal from './Modal';

const GameBoard = () => {
    let [randomBomb,setrandomBomb] = useState([]);
    const bombs = useSelector(state=>state.bombs);
    const portal = useSelector(state=>state.portal);
    const randombomb = useSelector(state=>state.randombomb);

    const count = useSelector(state=>state.gamecount)
    const start = useSelector(state=>state.start);
    const multipliers = useSelector(state=>state.multiplier);
    const [isportalopen,setisportalopen] = useState(false);
    const dispatch = useDispatch();
   
    const amount = useSelector(state=>state.amount);

    const bomb = () => {
        let ran = [];
        while (ran.length < bombs) {
          let r = Math.floor(Math.random() * 25) + 1;
          if (ran.indexOf(r) === -1) ran.push(r);
        }
        console.log(ran);
        setrandomBomb([...ran]);
        console.log(ran);
    }
    
    useEffect(()=>{
        bomb();
    },[count]);
    
    const win = () => {
      let song = new Audio('https://www.myinstants.com/media/sounds/subway-surfers-coin-collect.mp3'); // Corrected URL
      if(start == true)song.play().catch(error => {
          console.error("Error playing audio:", error);
      });
        bombs==5 ? dispatch(changeMultiplier({multiplier:multipliers+0.005})):bombs==8 ? dispatch(changeMultiplier({multiplier:multipliers+0.004})):bombs==11 ? dispatch(changeMultiplier({multiplier:multipliers+0.06})):bombs==12 ? dispatch(changeMultiplier({multiplier:multipliers+0.1})):bombs==15 ? dispatch(changeMultiplier({multiplier:multipliers+0.2})):bombs==16 ? dispatch(changeMultiplier({multiplier:multipliers+0.25})):bombs==18 ? dispatch(changeMultiplier({multiplier:multipliers+0.5})):bombs==22 ? dispatch(changeMultiplier({multiplier:multipliers+2.5})):null;
        
    }
    const handleclick = (e) => {
        let explode = new Audio('https://www.soundjay.com/mechanical/sounds/explosion-01.mp3');
        const temp= e.target.parentElement.parentElement;
        if(start == true)temp.className='opacity-100 pointer-events-none';
        if(start == true)randomBomb.includes(parseInt(temp.id)) ? explode.play().catch((err)=>console.log('error playing')) && dispatch(changeAmount({amount:0})) && dispatch(isportal({isportal:true})): win();
    }
    

  return (
    <div className={`h-[70vh] w-full md:w-[50vw] bg-gray-600 mt-[5px] ml-[5px] grid grid-cols-5 text-white ${portal ? `opacity-40`:''}`}>
     {
       new Array(25).fill(0).map((data,index)=>{
        return (
            randomBomb.includes(index+1)==false ? <div id={index+1} className='border-4 border-sky-400 flex justify-center items-center' >
                <div  id={index+1} className='opacity-0' onClick={handleclick}  >
                <RiVipDiamondFill id={index+1} className='h-[60px] w-[60px] text-green-500 ' style={{objectFit:"cover"}}/>
                </div>
            </div>
            :
            <div id={index+1} className='border-4 border-sky-400 flex justify-center items-center'  >
                <div id={index+1} className='opacity-0 ' onClick={handleclick} >
                <FaBomb id={index+1}   className='h-[60px] w-[60px] text-red-500' style={{objectFit:"cover"}} />
                </div>
            </div>
        )
       })
     }
     {
        portal ? <Modal/>:null
     }

    </div>
  )
}

export default GameBoard;
