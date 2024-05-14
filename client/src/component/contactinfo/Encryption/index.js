import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";


const Encryption = ({onClick}) => {
  return (
    <div className="profile-animation w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-2 pl-6 flex flex-row gap-6">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
        <div className="">
            <h1>Verify security code</h1>
            <h2 className='text-xs text-slate-400'>You, KGEC Nur</h2>
        </div>
      </div>
    </div>
  );
}

export default Encryption
