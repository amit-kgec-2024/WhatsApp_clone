import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthProfile = () => {
  const navigate = useNavigate();
  // userdetails....................
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );

  // image..................................

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("profiledefaultimage.jpg");
  const [userImage, setUserImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", document.getElementById("fileInput").files[0]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { secure_url } = await uploadImage();
      console.log("Image URL:", secure_url);
      console.log("Image URL:", userImage);

      const res = await fetch(
        "https://whats-app-clone-server-psi.vercel.app/api/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userimage: secure_url,
            username: name,
            id: users.id,
          }),
        }
      );

      if (res.status === 400) {
        alert("Invalid Credential!");
      } else {
        await res.json();
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while uploading image.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-dark4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
          name="fileInput"
        />
        <label htmlFor="fileInput">
          <div
            className="border-2 cursor-pointer hover:opacity-80 w-[10rem] h-[10rem] rounded-full overflow-hidden flex justify-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </label>
        <input
          type="text"
          placeholder="Name"
          className="px-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-between w-full mt-4">
          <Link
            to={"/"}
            className="uppercase text-white hover:text-whitmix1 bg-whitmix2 hover:bg-white font-semibold px-3 py-1 rounded-xl"
          >
            Skip
          </Link>
          <button
            type="submit"
            className="uppercase text-white hover:text-whitmix1 bg-whitmix2 hover:bg-white font-semibold px-3 py-1 rounded-xl"
          >
            Save
          </button>
        </div>
      </form>
      <h1>{users.mobile}</h1>
      <h1>{users.id}</h1>
    </div>
  );
};

export default AuthProfile;
