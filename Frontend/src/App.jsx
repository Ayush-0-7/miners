import { useEffect, useState } from 'react'
import React from 'react';
import './App.css'
import GameInfo from './components/GameInfo'
import GameBoard from './components/GameBoard'
import { auth } from './components/Firebase';
import { useNavigate } from 'react-router';

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(!user){
        navigate('/');
      }

    })
  })
  return (
    <div className="flex flex-col md:flex-row">
    <GameInfo/>
    <GameBoard/>

   </div>
  )
}

export default App
