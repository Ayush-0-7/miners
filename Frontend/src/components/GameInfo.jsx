import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAmount, changeBomb, changegamecount, changeinvestedAmount, changestart, isportal } from '../features/miners/MinerSlice';
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import Modal from './Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { auth, db } from './Firebase';

const GameInfo = () => {
  const dispatch = useDispatch();
  const portals = useSelector(state => state.portal);
  const bombs = useRef();
  const amount = useSelector(state => state.amount);
  const mul = useSelector(state => state.multiplier);
  const count = useSelector(state => state.gamecount);
  const [invest, setinvest] = useState(0);
  const start = useSelector(state => state.start);
  const [balance, setbalance] = useState(0); // Initialize to 0

  useEffect(() => {
    // Fetch the balance initially and set it
    const fetchBalance = async () => {
      
        const docRef = await getDoc(doc(db, 'balance', auth.currentUser.uid));
        setbalance(docRef.data().balance);
    
      
    };
    fetchBalance();
  }, []);

  const handleclick = async () => {
   
      const docRef = await getDoc(doc(db, 'balance', auth.currentUser.uid));
      const balance = docRef.data().balance;
 


    if (invest <= 0) {
      toast("Enter a VALID Amount.");
      return;
    } else if (invest > balance) {
      toast("Not Enough balance.");
      return;
    }

    dispatch(changestart({ start: true }));
    dispatch(changegamecount({ count: count + 1 }));
    dispatch(changeBomb({ bombs: parseInt(bombs.current.value) }));
    dispatch(changeinvestedAmount({ invest }));
    dispatch(changeAmount({ amount: parseFloat(invest) }));
    await setDoc(doc(db,'balance',auth.currentUser.uid),{
      balance:balance-invest
    }).then(()=>setbalance(balance - invest));
    
  };

  const handleclick2 = async () => {
    dispatch(changestart({ start: false }));
    dispatch(isportal({ isportal: true }));

    
  };

  return (
    <div className={`h-[70vh] w-full md:w-[40vw] bg-sky-400 text-center mt-[5px] ml-[5px] ${portals ? `opacity-40` : ''}`}>
      <ToastContainer />
      <p className='font-serif font-bold text-4xl underline'>Money Invested:</p>
      <p className='text-2xl font-bold flex justify-center '>
        <div className='bg-blue-700 flex text-4xl'>
          <TiMinus className='m-3 text-2xl' onClick={() => invest > 0 ? setinvest(invest - 50) : null} /> {"   "}{invest}{"   "} <FaPlus className='m-3 text-2xl' onClick={() => setinvest(invest + 50)} />
        </div>
      </p>
      <label htmlFor="bomb" className='font-serif font-semibold m-2'>Choose no. of Bombs</label>
      <select ref={bombs} name="bomb" id="bomb">
        <option value="5">5</option>
        <option value="8">8</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="22">22</option>
      </select>
      <br />
      <button
        type="button"
        disabled={start}
        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80" onClick={handleclick}
      >
        Start Game
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-2 h-4 w-4"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
      <br />
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-300" onClick={handleclick2}
        disabled={!start}
      >
        Withdraw
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-2 h-4 w-4"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>

      <p className='font-serif text-2xl mt-32 text-left font-semibold p-2'>Multiplier: {mul.toFixed(3) || 1} X</p>
      <p className='font-serif text-2xl mt-4 text-left font-semibold p-2'>Amount: ₹ {amount.toFixed(2)} </p>
      {
        portals ? <Modal /> : null
      }
    </div>
  )
}

export default GameInfo;
