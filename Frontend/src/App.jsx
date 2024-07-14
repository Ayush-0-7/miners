import { useState } from 'react'
import React from 'react';
import './App.css'
import GameInfo from './components/GameInfo'
import GameBoard from './components/GameBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col md:flex-row">
    <GameInfo/>
    <GameBoard/>

   </div>
  )
}

export default App
