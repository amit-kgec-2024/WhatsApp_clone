import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";
import getCroppedImg from "../../utils/cropImage";
import Cropper from "react-easy-crop";
import useClickOutside from "../../hooks/useClickOutside";
import { FaCheck } from "react-icons/fa6";

const Profile = () => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  // Profile images...................
  const [showProfile, setShowProfile] = useState(null);
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
        console.log('mmmm--->', jsonData)
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

  // ..........userName Update...................
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
  // ...........UserAbout Update..................
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
  // delet profile images......Remove..................
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/deleteProfilePhoto/${users.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: users.id,
          }),
        }
      );

      if (res.status === 400) {
        alert("Invalid Credential!");
      } else {
        await res.json();
        setIsclick(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while Delete image.");
    }
  };
  // ...............................................
  const [imageUrl, setImageUrl] = useState("profiledefaultimage.jpg");
  const [userImage, setUserImage] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setIsImageSelected(true);
    }
  };

  const handleClose = () => {
    setIsImageSelected(false);
    setImageUrl(null);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
      return croppedImage;
    } catch (e) {
      console.error(e);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "WhatsApp-profile");
    formData.append("cloud_name", "dn2tlzn9b");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dn2tlzn9b/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      setUserImage(data.secure_url);
      return data;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleSubmitProfileImage = async (e) => {
    e.preventDefault();
    try {
      const croppedImage = await getCroppedImage();
      const { secure_url } = await uploadImage(croppedImage);
      console.log("Image URL:", secure_url);
      console.log("Image URL:", userImage);

      const res = await fetch(
        "https://whats-app-clone-server-psi.vercel.app/api/users/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userimage: secure_url,
            id: users.id,
          }),
        }
      );

      if (res.status === 400) {
        alert("Invalid Credential!");
      } else {
        await res.json();
        setIsImageSelected(false)
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
        <div className="">{userData.mobile}</div>
        <div className="w-full justify-center items-center flex py-8">
          <div
            className="prof-Images overflow-hidden rounded-full w-32 h-32 md:w-48 md:h-48 bg-white flex justify-center items-center"
            style={{
              backgroundImage: `url(${userData.userimage || defaultImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
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
              className="absolute mt-40 ml-40 py-2 w-[20vh] text-start bg-dark3"
            >
              <button
                onClick={() => handelProfile("profileImage")}
                className="hover:bg-dark6 py-2 text-sm w-full"
              >
                View photo
              </button>
              <button className="hover:bg-dark6 py-2 text-sm w-full">
                Take photo
              </button>
              <button className="hover:bg-dark6 py-2 text-sm w-full">
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  name="fileInput"
                />
                <label htmlFor="fileInput">Upload photo</label>
              </button>
              <button
                onClick={(e) => handleDelete(e)}
                className="hover:bg-dark6 py-2 text-sm w-full"
              >
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
        <div className="absolute w-full h-screen flex flex-col items-start bg-dark2 top-0 left-0 z-50 bg-opacity-95 justify-start">
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
            <button
              onClick={() => setShowProfile(false)}
              className="text-2xl md:text-4xl"
            >
              <RxCross2 />
            </button>
          </div>
          <div className="w-full flex justify-center">
            <img
              src={`${userData.userimage || defaultImage}`}
              width={500}
              height={500}
              alt="Bird"
            />
          </div>
        </div>
      )}
      {isImageSelected && (
        <div className="bg-dark6 p-5 absolute w-full h-screen flex items-center justify-center top-0 left-0 bg-opacity-85">
          <div className="w-[30%] bg-dark3">
            <div className="p-2 w-full flex flex-row items-center text-lg gap-4">
              <button onClick={handleClose}>
                <RxCross2 />
              </button>
              <h1>Drag the image to adjust</h1>
            </div>
            <div className="relative w-full h-64">
              <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="w-full flex justify-end">
              <button
                onClick={(e) => handleSubmitProfileImage(e)}
                className="p-3 mr-[20%] text-xl bg-whitmix1 rounded-full"
              >
                <FaCheck />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
