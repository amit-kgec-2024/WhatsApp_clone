import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";


const Medialink = ({onClick}) => {
    const [activeNavbar, setActiveNavbar] = useState("media");
    const handelNavbarClick = (navbarIndex)=>{
        setActiveNavbar(navbarIndex)
    }
  return (
    <div className="profile-animation w-full bg-dark6 h-screen">
      <div className="bg-dark3 p-4 pl-6">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
      </div>
      <div className="w-full bg-dark3 flex flex-row justify-around">
        <button onClick={()=> handelNavbarClick('media')} className={`w-full text-sm text-slate-400 p-3 border-b-4 ${activeNavbar === 'media' ? "text-teal-400 border-teal-400" : "border-dark3"}`}>Media</button>
        <button onClick={()=> handelNavbarClick('docs')} className={`w-full text-sm text-slate-400 p-3 border-b-4 ${activeNavbar === 'docs' ? "text-teal-400 border-teal-400" : "border-dark3"}`}>Docs</button>
        <button onClick={()=> handelNavbarClick('links')} className={`w-full text-sm text-slate-400 p-3 border-b-4 ${activeNavbar === 'links' ? "text-teal-400 border-teal-400" : "border-dark3"}`}>Links</button>
        <button onClick={()=> handelNavbarClick('products')} className={`w-full text-sm text-slate-400 p-3 border-b-4 ${activeNavbar === 'products' ? "text-teal-400 border-teal-400" : "border-dark3"}`}>Products</button>
      </div>
      <div className="w-full">
        {activeNavbar === 'media' && (
            <div className="text-center">No media</div>
        )}
        {activeNavbar === 'docs' && (
            <div className="text-center">No docs</div>
        )}
        {activeNavbar === 'links' && (
            <div className="text-center">No links</div>
        )}
        {activeNavbar === 'products' && (
            <div className="text-center">No products</div>
        )}
      </div>
    </div>
  );
}

export default Medialink
