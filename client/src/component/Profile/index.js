import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";
import useClickOutside from "../../hooks/useClickOutside";

const Profile = () => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  // Profile images...................
  const [showProfile, setShowProfile] = useState(null)
  const handelProfile = (toggleProfile) => {
    setShowProfile(toggleProfile);
  };
  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  // profile images.....................
  const defaultImage = "/profiledefaultimage.jpg";
  const defaultName = "WhatsApp 0";
  const defaultAbout = "Hey there! I am using WhatsApp";
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

  // Name changes.....................................
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(false);
  };

  // .............................
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://whats-app-clone-server-psi.vercel.app/api/nameuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputValue,
            id: users.id,
          }),
        }
      );

      if (res.status === 400) {
        alert("Invalid Credential!");
      } else {
        await res.json();
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while uploading image.");
    }
  };
  //  About...........................
  const [inputValueabout, setInputValueabout] = useState("");
  const [isEditingabout, setIsEditingabout] = useState(true);

  const handleInputChangeabout = (e) => {
    setInputValueabout(e.target.value);
  };

  const handleEditabout = () => {
    setIsEditingabout(false);
  };
  // .............................
  const handleSubmitabout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://whats-app-clone-server-psi.vercel.app/api/aboutuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userabout: inputValueabout,
            id: users.id,
          }),
        }
      );

      if (res.status === 400) {
        alert("Invalid Credential!");
      } else {
        await res.json();
        setIsEditingabout(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while uploading image.");
    }
  };
  return (
    <div className="profile-animation w-full bg-dark6 h-screen">
      <h1 className="text-xl font-bold p-5 bg-dark6">Profile</h1>
      <div className="flex flex-col p-4 w-full">
        <div className="w-full justify-center items-center flex py-8">
          <div
            className="prof-Images overflow-hidden rounded-full w-40 h-40 bg-white flex justify-center items-center"
            style={{
              backgroundImage: `url(${userData.userimage || defaultImage})`,
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
              <button
                onClick={() => handelProfile("profileImage")}
                className="hover:bg-dark6 py-2 text-sm px-4 w-full"
              >
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
        <div className="p-1 md:p-3">
          <h2 className="my-4 text-whitmix1">Your name</h2>
          <div>
            {isEditing ? (
              <div className="flex flex-row gap-4">
                <h1 className="w-full p-1 font-semibold">
                  {userData.username || defaultName}
                </h1>
                <button onClick={handleEdit} className="text-xl text-slate-200">
                  <MdOutlineModeEdit />
                </button>
              </div>
            ) : (
              <div className="flex flex-row gap-4">
                <input
                  type="text"
                  placeholder={userData.username || defaultName}
                  value={inputValue}
                  onChange={handleInputChange}
                  className="bg-dark6 w-full outline-none border-b-4 border-b-whitmix2 p-1 font-semibold"
                />
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="text-xl text-slate-200"
                >
                  <MdOutlineModeEdit />
                </button>
              </div>
            )}
          </div>
          <h4 className="text-sm text-slate-300 my-2 md:my-4">
            This is not your username or PIN. This name will be visiable to your
            WhatsApp contacts.
          </h4>
          <h2 className="my-4 text-whitmix1">About</h2>
          <div>
            {isEditingabout ? (
              <div className="flex flex-row gap-4">
                <h1 className="w-full p-1 font-semibold">
                  {userData.userabout || defaultAbout}
                </h1>
                <button
                  onClick={handleEditabout}
                  className="text-xl text-slate-200"
                >
                  <MdOutlineModeEdit />
                </button>
              </div>
            ) : (
              <div className="flex flex-row gap-4">
                <input
                  type="text"
                  placeholder={userData.userabout || defaultAbout}
                  value={inputValueabout}
                  onChange={handleInputChangeabout}
                  className="bg-dark6 w-full outline-none border-b-4 border-b-whitmix2 p-1 font-semibold"
                />
                <button
                  onClick={(e) => handleSubmitabout(e)}
                  className="text-xl text-slate-200"
                >
                  <MdOutlineModeEdit />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showProfile === "profileImage" && (
        <div className="absolute w-full h-screen flex flex-col items-start bg-dark2 top-0 left-0 bg-opacity-95 justify-start">
          <div className="flex flex-row justify-between items-center w-full p-3 top-0">
            <div className="flex flex-row items-center gap-3">
              <div
                className="w-[35px] md:w-[50px] h-[35px] md:h-[50px] rounded-full"
                style={{
                  backgroundImage: `url(${userData.userimage || defaultImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <h1 className="font-semibold text-lg md:text-xl">
                {userData.mobile}
              </h1>
            </div>
            <button onClick={()=> setShowProfile(false)} className="text-2xl md:text-4xl"><RxCross2/></button>
          </div>
          <div className="w-full flex justify-center">
            <img src={`${userData.userimage || defaultImage}`} alt="Bird" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
