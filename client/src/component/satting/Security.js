import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";


const Security = ({onClick}) => {
  return (
    <div className="profile-animation w-full h-screen">
      <div className="p-4 pl-6 flex flex-row items-center gap-8">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">Security</h1>
      </div>
    </div>
  );
}

export default Security
