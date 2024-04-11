import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import useClickOutside from "../../hooks/useClickOutside";

const Profile = () => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  return (
    <div className="profile-animation w-full bg-dark6 h-screen">
      <h1 className="text-xl font-bold p-5 bg-dark6">Profile</h1>
      <div className="flex flex-col p-4 w-full">
        <div className="w-full justify-center items-center flex py-8">
          <div
            className="prof-Images overflow-hidden rounded-full w-40 h-40 bg-white flex justify-center items-center"
            style={{
              backgroundImage: "url('amitimg.png')",
              backgroundPosition: "center",
              backgroundSize: "150px",
            }}
          >
            <button
              onClick={handleClick}
              ref={buttonRef}
              className={`bg-dark1 opacity-55 h-full w-[500px] ${
                isClick
                  ? "flex flex-col justify-center items-center "
                  : "hidden"
              }`}
            >
              <FaCamera />
              <p className="uppercase font-light">Change Profile photo</p>
            </button>
          </div>
          {isClick && (
            <div
              ref={dropDownRef}
              className="absolute mt-40 ml-48 py-2 w-44 lex-col justify-start items-start bg-dark3"
            >
              <button className="hover:bg-dark6 py-2 text-sm px-4 w-full">
                View photo
              </button>
              <button className="hover:bg-dark6 py-2 text-sm px-4 w-full">
                Take photo
              </button>
              <button className="hover:bg-dark6 py-2 text-sm px-4 w-full">
                Upload photo
              </button>
              <button className="hover:bg-dark6 py-2 text-sm px-4 w-full">
                Remove photo
              </button>
            </div>
          )}
        </div>
        <h2 className="my-4 text-whitmix1">Your name</h2>
      </div>
    </div>
  );
};

export default Profile;
