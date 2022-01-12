import React, { useState, useEffect } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Die from './components/Die'
import { nanoid } from 'nanoid'

const App = () => {
  const { width, height } = useWindowSize()

  // Create object with value of random number
  const generateRandomNum = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  // Create loop to make ten random number
  const allNewDice = () => {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateRandomNum())
    }
    return newDice
  }

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  
  // If all dice have same value 
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
        setTenzies(true) 
    }         
  }, [dice])

  // If Held is true that dice cannot change the value when Roll
  const rollDice = () => {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => die.isHeld ? die : generateRandomNum()))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  // Hold the value of dice when Roll clicked
  const holdDice = (id) => {
    setDice(oldDice => oldDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  // Put the loop of random number to the Dice Component's props
  const diceElements = dice.map((die) => <Die key={dice.id} value={die.value} isHeld={die.isHeld} hold={() => holdDice(die.id)}/>)

  return (
    <div className="w-screen h-screen bg-white flex flex-col justify-center items-center gap-5">
    {tenzies && (<Confetti width={width}height={height}/>)}
      <div className="flex flex-col justify-center items-center">
        <h1 className="sm:text-4xl xs:text-3xl font-bold md:mb-5 xs:mb-[10px]">Tenzies</h1>
        <p className="md:text-lg xs:text-sm text-gray-800 xs:mb-[2px]">Klik Acak sampai menemukan angka yang cocok.</p>
        <p className="md:text-lg xs:text-sm text-gray-800">Klik angka yang sama agar tidak berubah saat di Acak.</p>
      </div>
      <div className="grid grid-cols-5 mt-[-5px] md:gap-5 sm:gap-4 md:p-14 sm:p-10 xs:p-7 xs:gap-3 place-content-center place-items-center xs:rounded-lg sm:rounded-xl lg:rounded-2xl">
        {diceElements}
      </div>
      <button type="button" className="mt-[-15px] font-sans tracking-wider py-2 px-8 border border-gray-500 rounded-lg text-white font-semibold md:text-lg xs:text-md bg-violet-800 active:drop-shadow-xl hover:bg-violet-900 active:shadow-2xl" onClick={rollDice}>{tenzies ? 'New Game' : 'Acak'}</button>
    </div>
  )
}

export default App
