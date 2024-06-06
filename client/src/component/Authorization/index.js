import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import AuthProfile from "../AuthProfile";

const Authorization = () => {
  const [mobileNumber, setMobileNumber] = useState({
    mobile: "+91",
  });
  const [errorsMsg, setErrorMsg] = useState(null);
  const [successSave, setSuccessSave] = useState(null);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+") && value.length <= 13) {
      setMobileNumber({ mobile: value });
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandle(e);
    }
  };
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
          body: JSON.stringify({ mobile: mobileNumber.mobile }),
        }
      );
      if (res.status === 400) {
        setErrorMsg("A, a, @, $, ., / this atypes are not allowed");
      } else {
        const resData = await res.json();
        setSuccessSave("Register & Login Successfully");
        localStorage.setItem("users:token", resData.token);
        localStorage.setItem("users:detail", JSON.stringify(resData.user));
        setIsLoggedIn(true);
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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorsMsg]);
  useEffect(() => {
    if (successSave) {
      const timer = setTimeout(() => {
        setSuccessSave(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successSave]);
  
  if (isLoggedIn) {
    return <AuthProfile />;
  }
  return (
    <main>
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
        <div className="flex flex-col h-screen w-full justify-center items-center gap-5">
          <div className="animate-rotate-left-to-right border-8 border-t-whitmix1 border-b-whitmix2 border-r-teal-500 border-l-green-500 w-28 sm:w-44 h-28 sm:h-44 overflow-hidden rounded-full">
            <div className="animate-rotate-right-to-left flex flex-row justify-center items-center gap-2 w-full h-full bg-dark6">
              <h1 className="uppercase animate-text-white shadow-sm shadow-cyan-300 font-extrabold text-2xl sm:text-2xl md:text-5xl lg:text-4xl">
                c
              </h1>
              <h1 className="uppercase animate-text-red shadow-sm shadow-cyan-300 text-2xl sm:text-4xl md:text-3xl font-extrabold lg:text-4xl">
                h
              </h1>
              <h1 className="uppercase animate-text-red shadow-sm shadow-cyan-300 text-2xl sm:text-4xl md:text-3xl font-extrabold lg:text-4xl">
                a
              </h1>
              <h1 className="uppercase animate-text-white shadow-sm shadow-cyan-300 font-extrabold text-2xl sm:text-2xl md:text-5xl lg:text-4xl">
                t
              </h1>
            </div>
          </div>
          <div className="my-5">
            <form
              onSubmit={(e) => submitHandle(e)}
              action=""
              className="flex items-center"
            >
              <input
                type="text"
                value={mobileNumber.mobile}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
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
      </div>
      <style>
        {`
      .animate-rotate-left-to-right {
    animation: rotate-left-to-right 4s linear infinite;
}
.animate-rotate-right-to-left {
    animation: rotate-right-to-left 4s linear infinite;
}

@keyframes rotate-left-to-right {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes rotate-right-to-left {
    0% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
.animate-text-white {
    animation: text-animation-white 4s ease infinite alternate;
}

@keyframes text-animation-white {
    0% {
        transform: scale(1);
        color: #0d9488;
    }

    100% {
        transform: scale(1.2);
        color: #6ee7b7;
    }
}
.animate-text-red {
    animation: text-animation-red 4s ease infinite alternate;
}

@keyframes text-animation-red {
    0% {
        transform: scale(1);
        color: #6ee7b7;
    }

    100% {
        transform: scale(1.2);
        color: #0d9488;
    }
}
      `}
      </style>
    </main>
  );
};

export default Authorization;
