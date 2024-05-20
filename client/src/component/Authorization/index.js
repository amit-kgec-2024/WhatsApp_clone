import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Authorization = () => {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState({
    mobile: "",
  });
  const [errorsMsg, setErrorMsg] = useState(null);
  const [successSave, setSuccessSave] = useState(null)
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://whats-app-clone-server-psi.vercel.app/api/register/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({mobile: mobileNumber.mobile}),
        }
      );
      if (res.status === 400) {
        setErrorMsg("A, a, @, $, ., / this atypes are not allowed");
      } else {
        const resData = await res.json();
        setSuccessSave("Register & Login Successfully")
        localStorage.setItem("users:token", resData.token);
        localStorage.setItem("users:detail", JSON.stringify(resData.user));
        navigate("/authprofile");
      }
    } catch (error) {
      console.log("Error", error);
      setErrorMsg("Data Fetch Error");
    }
  };
  useEffect(() => {
    if (errorsMsg) {
      const timer = setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorsMsg]);
  useEffect(() => {
    if (successSave) {
      const timer = setTimeout(() => {
        setSuccessSave(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successSave]);
  return (
    <div className="w-full h-screen flex flex-col bg-dark4">
      <div className="w-full flex justify-end p-4 h-[10vh]">
        {errorsMsg && (
          <h1 className=" bg-white px-5 flex items-center rounded-md border-2 border-red-600 text-red-600 font-bold">
            {errorsMsg}
          </h1>
        )}
        {successSave && (
          <h1 className=" bg-white px-5 flex items-center rounded-md border-2 border-green-600 text-green-600 font-bold">
            {successSave}
          </h1>
        )}
      </div>
      <div className="flex flex-col h-screen w-full justify-center items-center ">
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
    </div>
  );
};

export default Authorization;
