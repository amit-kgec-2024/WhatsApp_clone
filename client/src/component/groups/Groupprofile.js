import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import { RxCross2 } from "react-icons/rx";
import { FaAngleRight, FaCheck } from "react-icons/fa6";
import {
  IoStar,
  IoNotificationsSharp,
  IoTimer,
  IoExitOutline,
} from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { BiSolidDislike } from "react-icons/bi";
import Starredmessage from "../menu/Starredmessage";
import Medialink from "../contactinfo/Medialink";
import Disappearing from "../contactinfo/Disappearing";
import Encryption from "../contactinfo/Encryption";
import useClickOutside from "../../hooks/useClickOutside";
import Groupinfocard from "../card/Groupinfocard";
import Groupimage from "./Groupimage";

const Groupprofile = ({ onClick, groupId, theme }) => {
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
  const defaultGroupAbout = "Add group description";
  const [groupAbout, setGroupAbout] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isEditingabout, setIsEditingabout] = useState(true);
  const [isEditingname, setIsEditingname] = useState(true);

  const handleEditabout = () => {
    setIsEditingabout(false);
  };
  const handleEditname = () => {
    setIsEditingname(false);
  };
  const [isProfilePicture, setProfilePicture] = useState(false);
  // User Details........................
  const defauGroupImage = "/defaultgroupimage.png";

  // Group details........GET..........
  const [groupDetails, setGroupDetails] = useState("");

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/show/groups/${groupId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch group details");
        }
        const data = await response.json();
        setGroupDetails(data.data[0]);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);
  const { adminDetails, userDetails } = groupDetails;
  // GroupAbout Update...........................
  const handleSubmitGroupAbout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/groups/updat/about/${groupId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ groupabout: groupAbout }),
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
  // GroupName Update...........................
  const handleSubmitGroupName = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/groups/name/update/${groupId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ groupname: groupName }),
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
  // Group Exit.......................
  const handleSubmitExit = async () => {
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/groups/remove-ids/${groupId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminId: groupDetails.adminId,
            userIds: groupDetails.userIds,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  return (
    <div
      className={`user-left-border w-full h-screen ${
        theme === "#000000" ? "bg-dark2" : "bg-slate-200"
      }`}
    >
      <div className={`${activeButton ? "hidden" : ""}`}>
        <div
          className={`flex flex-row gap-10 h-14 justify-start items-center ${
            theme === "#000000" ? "bg-dark3" : "bg-slate-200"
          }`}
        >
          <button onClick={onClick} className="ml-8">
            <RxCross2 />
          </button>
          <h1>Group info</h1>
        </div>
        <div className="scrollbaruser overflow-y-scroll h-screen">
          <div
            className={`w-full flex p-6 flex-col justify-center items-center ${
              theme === "#000000" ? "bg-dark1" : "bg-slate-100"
            }`}
          >
            <button
              onClick={handleClick}
              ref={buttonRef}
              className="w-48 h-48 rounded-full overflow-hidden"
              style={{
                backgroundImage: `url(${
                  groupDetails?.groupimage || defauGroupImage
                })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></button>
            {isClick && (
              <div
                ref={dropDownRef}
                className={`absolute mt-40 ml-48 py-2 w-44 lex-col justify-start items-start ${theme === "#000000" ? "bg-dark3" : "bg-slate-200"}`}
              >
                <button
                  onClick={() => setProfilePicture((prev) => !prev)}
                  className={`${theme === "#000000" ? "hover:bg-dark6" : "hover:bg-slate-100"} py-2 text-sm px-4 w-full`}
                >
                  View photo
                </button>
                <button className={`${theme === "#000000" ? "hover:bg-dark6" : "hover:bg-slate-100"} py-2 text-sm px-4 w-full`}>
                  Take photo
                </button>
                <button className={`${theme === "#000000" ? "hover:bg-dark6" : "hover:bg-slate-100"} cursor-pointer py-2 text-sm px-4 w-full`}>
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
                  className={`${theme === "#000000" ? "hover:bg-dark6" : "hover:bg-slate-100"} py-2 text-sm px-4 w-full`}
                >
                  Remove photo
                </button>
              </div>
            )}
            {isImageSelected && (
              <div className="bg-dark6 p-5 absolute w-full h-screen flex items-center justify-center top-0 left-0 bg-opacity-85">
                <div className={`w-[30%] ${theme === "#000000" ? "bg-dark3" : "bg-slate-200"}`}>
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
                <Groupimage
                  theme={theme}
                  groupId={groupId}
                  onClick={() => setProfilePicture(false)}
                />
              </div>
            )}
            <div className="mt-2 py-6 px-8">
              {isEditingname ? (
                <div className="flex flex-row gap-4">
                  <h1 className="w-full p-1 font-light text-sm text-slate-300">
                    {groupDetails?.groupname}
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
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className={`${theme === "#000000" ? "bg-dark1" : "bg-slate-100"} w-full outline-none p-1 font-semibold`}
                  />
                  <button
                    onClick={(e) => handleSubmitGroupName(e)}
                    className="text-xl text-slate-300"
                  >
                    <FaCheck />
                  </button>
                </div>
              )}
            </div>
            <h3 className="font-light text-slate-400">
              Group . {groupDetails?.userIds?.length + 1} members
            </h3>
          </div>
          <div
            className={`${
              theme === "#000000" ? "bg-dark1" : "bg-slate-100"
            } mt-2 py-6 px-8`}
          >
            {/* Edit group About */}
            {isEditingabout ? (
              <div className="flex flex-row gap-4">
                <h1 className="w-full p-1 font-light text-sm text-slate-300">
                  {groupDetails?.groupabout || (
                    <div className="text-sm font-light text-whitmix1">
                      {defaultGroupAbout}
                    </div>
                  )}
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
                  value={groupAbout}
                  onChange={(e) => setGroupAbout(e.target.value)}
                  className={`${theme === "#000000" ? "bg-dark1" : "bg-slate-100"} w-full outline-none p-1 font-semibold`}
                />
                <button
                  onClick={(e) => handleSubmitGroupAbout(e)}
                  className="text-xl text-slate-300"
                >
                  <FaCheck />
                </button>
              </div>
            )}
          </div>
          <div
            className={`${theme === "#000000" ? "bg-dark1" : "bg-slate-100"}`}
          >
            <button
              onClick={() => handleButtonClick("medialinks")}
              className="flex flex-row w-full text-sm text-slate-300 justify-between items-center mt-2 py-4 px-8"
            >
              <h1 className="font-light">Media, links and docs</h1>
              <h1 className="flex flex-row items-center gap-1 font-light">
                16
                <FaAngleRight />
              </h1>
            </button>
            <div className="w-full h-[130px]"></div>
          </div>
          <div className={`w-full py-4 ${theme === "#000000" ? "bg-dark1" : "bg-slate-100"} mt-4 px-8`}>
            <button
              onClick={() => handleButtonClick("starredmessages")}
              className="flex flex-row justify-between items-center py-4 w-full"
            >
              <div className="flex flex-row items-center gap-5">
                <IoStar />
                <h1>Starred messages</h1>
              </div>
              <FaAngleRight />
            </button>
            <button className="flex flex-row justify-between items-center py-4 w-full">
              <div className="flex flex-row items-center gap-5">
                <IoNotificationsSharp />
                <h1>Mute notifications</h1>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handleButtonClick("disappearingmessages")}
              className="flex flex-row justify-between items-center py-4 w-full"
            >
              <div className="flex flex-row items-center gap-5">
                <IoTimer />
                <h1 className="flex flex-col items-start">
                  Diseppearing messages{" "}
                  <span className="text-xs font-light">Off</span>
                </h1>
              </div>
              <FaAngleRight />
            </button>
            <button
              onClick={() => handleButtonClick("encryption")}
              className="py-4 w-full"
            >
              <div className="flex flex-row items-center gap-5">
                <IoMdLock />
                <h1 className="flex flex-col items-start">
                  Encryption{" "}
                  <span className="text-xs font-light">
                    Messages are End-to-end encrypted. Click to verify.
                  </span>
                </h1>
              </div>
            </button>
          </div>
          <div className={`w-full ${theme === "#000000" ? "bg-dark1" : "bg-slate-100"} max-h-[50vh] overflow-y-scroll scrollbaruser`}>
            <Groupinfocard
              key={adminDetails?._id}
              adminid={adminDetails?._id}
              adminDetails={adminDetails}
              userabout={adminDetails?.userabout}
              username={adminDetails?.username || adminDetails?.mobile}
              userimage={adminDetails?.userimage}
              groupId={groupId}
              theme={theme}
            />
            {userDetails?.map((user, index) => (
              <Groupinfocard
                key={user._id}
                userId={user._id}
                userabout={user.userabout}
                username={user.username || user.mobile}
                userimage={user.userimage}
                groupId={groupId}
                theme={theme}
              />
            ))}
          </div>
          <div className={`w-full py-4 bg-dark1 mb-16 ${theme === "#000000" ? "bg-dark1" : "bg-slate-100"}`}>
            <button
              onClick={handleSubmitExit}
              className={`flex flex-row items-center py-2 gap-6 text-xl px-10 text-red-700 w-full ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}
            >
              <IoExitOutline />
              <h1>Exit group</h1>
            </button>
            <button className={`flex flex-row items-center py-2 gap-6 text-xl px-10 text-red-700 w-full ${theme === "#000000" ? "hover:bg-dark3" : "hover:bg-slate-200"}`}>
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
        <Medialink theme={theme} onClick={() => setActiveButton(false)} />
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

export default Groupprofile;