import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Authorization = () => {
  
  const navigate = useNavigate(); 

  const [mobileNumber, setMobileNumber] = useState({
    mobile: "",
  });
  
  const submitHandle = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://whats-app-clone-server-psi.vercel.app/api/register&login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mobileNumber),
      }
    );
    if (res.status === 400) {
      alert("Already Exist");
    } else {
      const resData = await res.json();
      localStorage.setItem("users:token", resData.token);
      localStorage.setItem("users:detail", JSON.stringify(resData.users));
      // console.log("Details----->", resData.users)
      navigate("/authprofile"); 
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-dark4">
      <form
        onSubmit={(e) => submitHandle(e)}
        action=""
        className="flex items-center"
      >
        <input
          type="text"
          value={mobileNumber.mobile}
          onChange={(r) =>
            setMobileNumber({ ...mobileNumber, mobile: r.target.value })
          }
          maxLength={10}
          className="w-[100%] bg-slate-100 outline-none p-1 md:p-2 font-bold"
          placeholder="Mobile number"
        />
        <button
          type="submit"
          className="bg-green-800 hover:bg-green-700 text-white p-2 md:p-3 rounded-tr-xl rounded-br-xl"
        >
          <FaArrowRight />
        </button>
      </form>
    </div>
  );
};

export default Authorization;
