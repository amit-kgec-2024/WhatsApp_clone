import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";


const Chatwalpaper = ({onClick}) => {
  return (
    <div className="profile-animation w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-4 pl-6 pt-16 flex flex-row items-center gap-8">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">Set chat Wallpaper</h1>
      </div>
    </div>
  );
}

export default Chatwalpaper
