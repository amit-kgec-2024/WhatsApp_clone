import React, { useEffect, useState } from 'react'

const DefaultChats = () => {
  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  //   GET..........................................
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/userdetails/${users.id}`
        );
        const jsonData = await res.json();
        setUserData(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [users.id]);
  return (
    <div
      className="w-full h-screen bg-dark3 flex flex-col items-center justify-center"
      style={{ backgroundColor: userData.usertheme === "#000000" ? "#233138" : "#f1f5f9" }}
    >
      <div className="w-full flex justify-center">
        <img src="frontchat.png" alt="Bird" />
      </div>
      <h1
        className="text-4xl font-light text-center py-3"
        style={{ color: userData.usertheme === "#000000" ? "#ffffff" : "#000000" }}
      >
        Download WhatsApp for Windows
      </h1>
      <h1 className="text-sm text-slate-400 w-full text-center py-3">
        Make Calls, share your screen and get a faster experience when you
        download the <br />
        Windows app.{userData.usertheme}
      </h1>
      <div className="w-full flex justify-center py-3">
        <button className="px-5 py-2 rounded-full text-black bg-teal-500">
          Get from Microsoft Store
        </button>
      </div>
    </div>
  );
}

export default DefaultChats
