import React from 'react'

const Die = ({ value, isHeld, hold, start }) => {
    const held = "border border-green-400 bg-green-400 xs:drop-shadow-xl md:drop-shadow-xl md:w-20 md:h-20 xs:w-14 xs:h-14 xs:rounded-md md:rounded-xl lg:rounded-2xl cursor-pointer flex justify-center items-center"
    const notHeld = "border border-gray-300 bg-gray-200 xs:drop-shadow-lg md:drop-shadow-xl md:w-20 md:h-20 xs:w-14 xs:h-14 xs:rounded-md md:rounded-xl lg:rounded-2xl cursor-pointer flex justify-center items-center"

    return (
        <div className={isHeld ? held : notHeld} onClick={hold}>
            <h2 className="angka md:text-4xl sm:text-3xl xs:text-2xl font-bold">{value}</h2>
        </div>
    )
}

export default Die
