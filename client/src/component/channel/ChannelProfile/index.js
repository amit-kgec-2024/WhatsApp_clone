import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/cropImage";
import { RxCross2 } from "react-icons/rx";
import { FaAngleRight, FaCheck, FaPlus } from "react-icons/fa6";
import { MdOutlinePublic } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { GoAlertFill } from "react-icons/go";
import { IoKeypad } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiUserShared2Fill } from "react-icons/ri";
import { IoExitOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { TiArrowForward } from "react-icons/ti";
import { MdInsertLink } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { BiSolidDislike } from "react-icons/bi";
import Starredmessage from "../../Starredmessage";
import Medialink from "../../contactinfo/Medialink";
import Disappearing from "../../contactinfo/Disappearing";
import Encryption from "../../contactinfo/Encryption";
import useClickOutside from "../../../hooks/useClickOutside";
import ChannelImage from "../ChannelImage";

const ChannelProfile = ({ onClick, channelId, groupId }) => {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  // Group image handel..................
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });
  //  Group About...........................
  const [profileImg, setProfileImg] = useState("")
  const [channelAbout, setchannelAbout] = useState("");
  const [channelName, setchannelName] = useState("");
  const [isEditingabout, setIsEditingabout] = useState(true);
  const [isEditingname, setIsEditingname] = useState(true);

  const handleEditabout = () => {
    setIsEditingabout(false);
  };
  const handleEditname = () => {
    setIsEditingname(false);
  };
  const [isProfilePicture, setProfilePicture] = useState(false);
  // User Details.............................
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  const [isAllChannel, setIsAllChannel] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/channel/details/${channelId}`
        );
        const jsonData = await res.json();
        setIsAllChannel(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [channelId]);
  // Channel delete..............................
  const handleChannelDelet = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/channel/delete/${channelId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 400){
        console.log("Invalide Creadintial!")
      }else{
        await response.json();
        alert("Succesfully Delete Channel!");
      }
    } catch (error) {
      console.error("Error updating group name:", error);
    }
  };
  // channelAbout Update...........................
  const handleSubmitchannelAbout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/channel/update/about/${channelId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ channelabout: channelAbout }),
        }
      );
      if (response.status === 400) {
        alert("Invalid Credential!");
      } else {
        await response.json();
        setIsEditingabout(true);
      }
    } catch (error) {
      console.error("Error updating group name:", error);
    }
  };
  // channelName Update...........................
  const handleSubmitchannelName = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/channel/update/name/${channelId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channelname: channelName,
          }),
        }
      );
      if (response.status === 400) {
        alert("Invalid Credential!");
      } else {
        await response.json();
        setIsEditingname(true);
      }
    } catch (error) {
      console.error("Error updating group name:", error);
    }
  };
  // channel Remove Update...........................
  const handleChannelRemove = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/channel/deletemember/${channelId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberId: users.id,
          }),
        }
      );
      if (response.status === 400) {
        alert("Invalid Credential!");
      } else {
        await response.json();
        alert("Unfollow Succesfully!");
      }
    } catch (error) {
      console.error("Error updating unfollow:", error);
    }
  };
  // Group profile update..................
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

  const handleSubmitGroupImage = async (e) => {
    e.preventDefault();
    try {
      const croppedImage = await getCroppedImage();
      const { secure_url } = await uploadImage(croppedImage);
      console.log("Image URL:", secure_url);
      console.log("Image URL:", userImage);
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/groups/update/profile/images/${groupId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ groupimage: secure_url }),
        }
      );
      if (response.status === 400) {
        alert("Invalid Credential!");
      } else {
        await response.json();
        setIsImageSelected(false);
      }
    } catch (error) {
      console.error("Error updating group name:", error);
    }
  };
  // Groupe Image Remove ...........................
  const handleRemoveGroupImage = async () => {
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/groups/update/profile/images/remove/${groupId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ groupimage: null }),
        }
      );
      if (response.status === 400) {
        alert("Invalid Credential!");
      } else {
        await response.json();
        setImageUrl("profiledefaultimage.jpg");
        setIsclick(false);
      }
    } catch (error) {
      console.error("Error removing group image:", error);
    }
  };
  return (
    <div className="user-left-border w-full h-screen bg-dark2">
      <div className={`${activeButton ? "hidden" : ""}`}>
        <div className="flex flex-row gap-10 h-14 justify-start items-center bg-dark3">
          <button onClick={onClick} className="ml-8">
            <RxCross2 />
          </button>
          <h1>Channel info</h1>
        </div>
        <div className="scrollbaruser overflow-y-scroll h-screen">
          <div className="w-full flex p-6 flex-col justify-center items-center bg-dark1">
            {isAllChannel?.channelDetails?.channeladminId === users.id ? (
              <button
                onClick={handleClick}
                ref={buttonRef}
                className="w-48 h-48 rounded-full overflow-hidden"
                style={{
                  backgroundImage: `url(${isAllChannel?.channelDetails?.channelimage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></button>
            ) : (
              <button
                onClick={() => setProfileImg((prev) => !prev)}
                className="w-48 h-48 rounded-full overflow-hidden"
                style={{
                  backgroundImage: `url(${isAllChannel?.channelDetails?.channelimage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></button>
            )}
            {isClick && (
              <div
                ref={dropDownRef}
                className="absolute mt-40 ml-48 py-2 w-44 lex-col justify-start items-start bg-dark3"
              >
                <button
                  onClick={() => setProfilePicture((prev) => !prev)}
                  className="hover:bg-dark6 py-2 text-sm px-4 w-full"
                >
                  View photo
                </button>
                <button className="hover:bg-dark6 py-2 text-sm px-4 w-full">
                  Take photo
                </button>
                <button className="hover:bg-dark6 cursor-pointer py-2 text-sm px-4 w-full">
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
                  onClick={handleRemoveGroupImage}
                  className="hover:bg-dark6 py-2 text-sm px-4 w-full"
                >
                  Remove photo
                </button>
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
                      onClick={(e) => handleSubmitGroupImage(e)}
                      className="p-3 mr-[20%] text-xl bg-whitmix1 rounded-full"
                    >
                      <FaCheck />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isProfilePicture && (
              <div className="absolute w-full h-screen left-0 top-0">
                <ChannelImage
                  channelname={isAllChannel?.channelDetails?.channelname}
                  channelimage={isAllChannel?.channelDetails?.channelimage}
                  onClick={() => setProfilePicture(false)}
                />
              </div>
            )}
            {profileImg && (
              <div className="absolute w-full h-screen left-0 top-0">
                <ChannelImage
                  onClick={() => setProfileImg(false)}
                  channelname={isAllChannel?.channelDetails?.channelname}
                  channelimage={isAllChannel?.channelDetails?.channelimage}
                />
              </div>
            )}
            {isAllChannel?.channelDetails?.channeladminId === users.id ? (
              <div className="bg-dark1 mt-2 py-6 px-8">
                {isEditingname ? (
                  <div className="flex flex-row gap-4">
                    <h1 className="w-full p-1 font-light text-sm text-slate-300">
                      {isAllChannel?.channelDetails?.channelname}
                    </h1>
                    <button
                      onClick={handleEditname}
                      className="text-xl text-slate-200"
                    >
                      <MdModeEdit />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row gap-4 border-b-2 border-b-whitmix2">
                    <input
                      type="text"
                      value={channelName}
                      onChange={(e) => setchannelName(e.target.value)}
                      className="bg-dark1 w-full outline-none p-1 font-semibold"
                    />
                    <button
                      onClick={(e) => handleSubmitchannelName(e)}
                      className="text-xl text-slate-300"
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <h1 className="w-full text-center my-4 p-1 font-light text-sm text-slate-300">
                {isAllChannel?.channelDetails?.channelname}
              </h1>
            )}
            <h3 className="font-light text-slate-400">
              Channel . {isAllChannel?.memberDetails?.length} followers
            </h3>
            <div className="flex justify-center gap-16 items-center w-full my-3">
              {isAllChannel?.channelDetails?.channeladminId === users.id || (
                <button className="flex flex-col text-whitmix1 text-3xl gap-2 items-center">
                  <IoMdCheckmark />
                  <span className="text-sm">Following</span>
                </button>
              )}
              <button className="flex flex-col text-whitmix1 text-3xl gap-2 items-center">
                <TiArrowForward />
                <span className="text-sm">Forward</span>
              </button>
              <button className="flex flex-col text-whitmix1 text-3xl gap-2 items-center">
                <MdInsertLink />
                <span className="text-sm">Copy link</span>
              </button>
            </div>
          </div>
          {isAllChannel?.channelDetails?.channeladminId === users.id ? (
            <div className="bg-dark1 mt-2 py-6 px-8">
              {/* Edit group About */}
              {isEditingabout ? (
                <div className="flex flex-row gap-4">
                  <h1 className="w-full p-1 font-light text-sm text-slate-300">
                    {isAllChannel?.channelDetails?.channelabout}
                  </h1>
                  <button
                    onClick={handleEditabout}
                    className="text-xl text-slate-200"
                  >
                    <MdModeEdit />
                  </button>
                </div>
              ) : (
                <div className="flex flex-row gap-4 border-b-2 border-b-whitmix2">
                  <input
                    type="text"
                    value={channelAbout}
                    onChange={(e) => setchannelAbout(e.target.value)}
                    className="bg-dark1 w-full outline-none p-1 font-semibold"
                  />
                  <button
                    onClick={(e) => handleSubmitchannelAbout(e)}
                    className="text-xl text-slate-300"
                  >
                    <FaCheck />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <h1 className="w-full p-1 font-light text-sm bg-dark1 mt-2 py-6 px-8 text-slate-300">
              {isAllChannel?.channelDetails?.channelabout}
            </h1>
          )}
          <div className="w-full py-4 bg-dark1 mt-4 px-8">
            {isAllChannel?.channelDetails?.channeladminId === users.id || (
              <button
                onClick={() => handleButtonClick("encryption")}
                className="py-4 w-full flex items-center text-2xl gap-4"
              >
                <IoIosNotifications />
                <h1 className="text-lg">Mute</h1>
              </button>
            )}
            <button className="flex flex-row justify-start items-center py-4 w-full text-4xl gap-4">
              <MdOutlinePublic />
              <div className="flex flex-col justify-start items-start text-lg">
                <h1>Public channel</h1>
                <h2 className="text-xs text-start text-slate-400">
                  What you share is visiable to anyone, but you phone number
                  isn`t. Click to learn more.
                </h2>
              </div>
            </button>
            {isAllChannel?.channelDetails?.channeladminId === users.id && (
              <div className="">
                <button className="flex flex-row items-center py-4 gap-4 text-3xl w-full">
                  <IoMdSettings />
                  <div className="flex flex-row items-center text-xl justify-between w-full">
                    <h1>Channel setting</h1>
                    <FaAngleRight />
                  </div>
                </button>
                <button className="flex flex-row gap-4 text-2xl items-center py-4 w-full">
                  <GoAlertFill />
                  <div className="text-xl">Channel alerts</div>
                </button>
              </div>
            )}
            {isAllChannel?.channelDetails?.channeladminId === users.id || (
              <button className="py-4 w-full">
                <div className="flex flex-row items-center gap-5 text-2xl">
                  <IoKeypad />
                  <div className="flex flex-col text-start">
                    <h1 className="text-xl">Profile privacy</h1>
                    <h1 className="text-xs text-slate-400">
                      The channel has added privacy for your profile and phone
                      number. Click to learn more.
                    </h1>
                  </div>
                </div>
              </button>
            )}
          </div>
          {isAllChannel?.channelDetails?.channeladminId === users.id && (
            <div className="w-full py-1 my-2 bg-dark1">
              <button className="flex flex-row items-center py-2 gap-6 text-xl px-10 w-full hover:bg-dark3">
                <h1 className="p-2 bg-whitmix1 rounded-full">
                  <FaPlus />
                </h1>
                <h1>Invite admins</h1>
              </button>
              <button className="flex flex-row items-center py-2 gap-6 text-xl px-10 w-full hover:bg-dark3">
                <h1 className="p-2 bg-whitmix1 rounded-full">
                  <MdInsertLink />
                </h1>
                <h1>Channel link</h1>
              </button>
              <div className="flex flex-row justify-start items-center gap-4 py-4 px-10">
                <div className="">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{
                      backgroundImage: `url(${isAllChannel?.adminChannels?.userimage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
                <div className="flex flex-row w-full justify-between">
                  <div className="flex flex-col items-start">
                    <h1 className="">You</h1>
                    <h2 className="text-xs text-slate-400">
                      You`re not visiable to followers
                    </h2>
                  </div>
                  <button className="text-xs p-1 bg-slate-600 flex text-start my-3">
                    Owner
                  </button>
                </div>
              </div>
              <div className="user-top-border p-2 text-sm text-slate-400">
                You can only view individual followers who are contacts or
                admins.
              </div>
            </div>
          )}
          <div className="w-full py-4 bg-dark1 mb-16">
            {isAllChannel?.channelDetails?.channeladminId === users.id && (
              <button className="flex flex-row items-center py-2 gap-6 text-xl px-10 text-whitmix1 w-full hover:bg-dark3">
                <RiUserShared2Fill />
                <h1>Transfer ownership</h1>
              </button>
            )}
            {isAllChannel?.channelDetails?.channeladminId === users.id && (
              <button
                onClick={handleChannelDelet}
                className="flex flex-row items-center py-2 gap-6 text-xl px-10 text-red-700 w-full hover:bg-dark3"
              >
                <RiDeleteBin6Line />
                <h1>Delete channel</h1>
              </button>
            )}
            {isAllChannel?.channelDetails?.channeladminId === users.id || (
              <button
                onClick={(e) => handleChannelRemove(e)}
                className="flex flex-row items-center py-2 gap-6 text-xl px-10 text-red-700 w-full hover:bg-dark3"
              >
                <IoExitOutline />
                <h1>Unfollow</h1>
              </button>
            )}
            <button className="flex flex-row items-center py-2 gap-6 text-xl px-10 text-red-700 w-full hover:bg-dark3">
              <BiSolidDislike />
              <h1>Report Group</h1>
            </button>
          </div>
        </div>
      </div>
      {activeButton === "starredmessages" && (
        <Starredmessage onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "medialinks" && (
        <Medialink onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "disappearingmessages" && (
        <Disappearing onClick={() => setActiveButton(false)} />
      )}
      {activeButton === "encryption" && (
        <Encryption onClick={() => setActiveButton(false)} />
      )}
    </div>
  );
};

export default ChannelProfile;
