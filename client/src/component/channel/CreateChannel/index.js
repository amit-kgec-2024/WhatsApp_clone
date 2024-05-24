import React, { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import getCroppedImg from "../../../utils/cropImage";
import { FaAngleRight, FaArrowLeft, FaCheck } from "react-icons/fa6";
import { IoCameraOutline, IoCheckboxSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Cropper from "react-easy-crop";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const CreateChannel = ({ setIsChannel }) => {
  const [isClick, setIsclick] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleClick = () => setIsclick((prev) => !prev);

  useClickOutside([dropDownRef, buttonRef], () => {
    setIsclick(false);
  });

  // Emoji................
  const [isEmoji, setIsEmoji] = useState(false);
  const emojiDownRef = useRef(null);
  const emojiButtonRef = useRef(null);
  useClickOutside([emojiDownRef, emojiButtonRef], () => {
    setIsEmoji(false);
  });

  const [showToggle, setShowToggle] = useState(null);
  const handelToggle = (toggleBox) => {
    setShowToggle(toggleBox);
  };
  const defaultImage = "/profiledefaultimage.jpg";
  const defaultAbout = "Hey there! I am using WhatsApp";
  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  // Users all...................................
  const [userAll, setUserAll] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://whats-app-clone-server-psi.vercel.app/api/users/all/${users.id}`
        );
        const jsonData = await res.json();
        setUserAll(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [users.id]);
  // .......Group create.........................
  const [groups, setGroups] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const handelGroup = (_id) => {
    setGroups((prevGroups) => {
      if (!prevGroups.some((group) => group.userId === _id)) {
        return [...prevGroups, { userId: _id }];
      }
      return prevGroups;
    });
    setUserIds((prevUserIds) => {
      if (!prevUserIds.includes(_id)) {
        return [...prevUserIds, _id];
      }
      return prevUserIds;
    });
  };
  const fetchUserDetails = async (_id) => {
    try {
      const response = await fetch(
        `https://whats-app-clone-server-psi.vercel.app/api/userDetails/${_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const newUserDetails = {};
      for (const group of groups) {
        if (!userDetails[group.userId]) {
          const details = await fetchUserDetails(group.userId);
          if (details) {
            newUserDetails[group.userId] = details;
          }
        }
      }
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        ...newUserDetails,
      }));
    };

    fetchDetails();
  }, [groups]);

  // Channel name, about..........................
  const [isChannelData, setIsChannelData] = useState({
    channelabout: "",
    channelname: "",
  });
  // ...............................................
  const [imageUrl, setImageUrl] = useState("profiledefaultimage.jpg");
  const [isChannelImage, setChannelImage] = useState("");
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

  const handleSubmitProfileImage = async () => {
    try {
      const croppedImage = await getCroppedImage();

      const formData = new FormData();
      formData.append("file", croppedImage);
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
        setChannelImage(data.secure_url);
        setIsImageSelected(false);
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      console.error("Error uploading profile image", err);
    }
  };
  // ...............Submit Channel..................
  const handleCreateChannel = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/channel/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelname: isChannelData.channelname,
          channelimage: isChannelImage,
          channelabout: isChannelData.channelabout,
          channeladminId: users.id,
        }),
      });
      if (res.status === 400) {
        alert("Invalid Credential!");
      } else {
        await res.json();
        setIsChannel(false);
      }
    } catch (err) {
      console.log("Error Fetching Data", err);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row items-center text-slate-300 p-4 gap-6">
          <button
            onClick={() => setIsChannel(false)}
            className="text-xl md:text-2xl"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-lg md:text-xl font-bold">New channel</h1>
        </div>
        <div className="relative w-full justify-center flex p-5">
          <button
            onClick={handleClick}
            ref={buttonRef}
            className="w-24 md:w-44 h-24 md:h-44 rounded-full flex flex-col justify-center items-center"
            style={{
              backgroundImage: `url(${imageUrl || defaultImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <h1 className="flex flex-col justify-center items-center">
              <IoCameraOutline className="text-xl" />
              <span className="uppercase">Add group icon</span>
            </h1>
          </button>
          {isClick && (
            <div
              ref={dropDownRef}
              className="absolute mt-40 ml-40 py-2 w-[20vh] text-start bg-dark3"
            >
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
              <button className="hover:bg-dark6 py-2 text-sm w-full">
                Emoji & sticker
              </button>
            </div>
          )}
        </div>
        <div className="px-4 md:px-6 py-4 w-full">
          <input
            type="text"
            value={isChannelData.channelname}
            onChange={(e) =>
              setIsChannelData({
                ...isChannelData,
                channelname: e.target.value,
              })
            }
            placeholder="Channel name"
            className="w-full outline-none bg-dark6 border-b-2 p-2 border-b-whitmix1"
          />
          <div className="w-full flex flex-col justify-center px-2 my-3 bg-dark3">
            <h1 className="text-xs text-slate-400 py-1">Channel description</h1>
            <div className="flex flex-row justify-between">
              <textarea
                rows={8}
                cols={40}
                placeholder="Describe your channel. Include information to help people understand what your channel is about."
                value={isChannelData.channelabout}
                onChange={(e) =>
                  setIsChannelData({
                    ...isChannelData,
                    channelabout: e.target.value,
                  })
                }
                className="bg-dark3 outline-none w-full"
              />
              <div className="relative">
                {isEmoji && (
                  <div
                    ref={emojiDownRef}
                    className="absolute ml-5 shadow-xl bg-dark6 w-[300px] h-[300px] rounded-lg"
                  >
                    Amit
                  </div>
                )}
                <button
                  onClick={() => setIsEmoji((prev) => !prev)}
                  ref={emojiButtonRef}
                >
                  <MdOutlineEmojiEmotions className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleCreateChannel}
          className="px-4 py-2 text-sm bg-dark4 hover:bg-whitmix1 text-slate-400 rounded-full"
        >
          Create channel
        </button>
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
                  onClick={handleSubmitProfileImage}
                  className="p-3 mr-[20%] text-xl bg-whitmix1 rounded-full"
                >
                  <FaCheck />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateChannel;
