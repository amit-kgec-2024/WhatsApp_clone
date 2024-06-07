import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";


const Encryption = ({onClick, userId}) => {
  // User Details........................
  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/userdetails/${userId}`
        );
        const jsonData = await res.json();
        setUserDetails(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [userId]);
  return (
    <div className="profile-animation w-full h-screen">
      <div className="p-2 pl-6 flex flex-row gap-6">
        <button onClick={onClick} className="text-lg">
          <FaArrowLeft />
        </button>
        <div className="">
          <h1>Verify security code</h1>
          <h2 className="text-xs text-slate-400">You, {userDetails.username || userDetails.mobile}</h2>
        </div>
      </div>
    </div>
  );
}

export default Encryption
