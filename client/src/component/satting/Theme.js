import React, { useEffect, useState } from "react";
import Input from "../Input";

const Theme = ({ setActiveTheme }) => {
  // User Details
  const [users] = useState(
    () => JSON.parse(localStorage.getItem("users:detail")) || {}
  );
  const [inputValue, setInputValue] = useState({
    value: "",
    label: ""
  });
  const handleSubmit = async (e) => {
    console.log("value", inputValue)
    e.preventDefault();
    try {
      const res = await fetch(
        "https://whats-app-clone-server-psi.vercel.app/api/themeuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usertheme: inputValue.value,
            userthemelabel: inputValue.label,
            id: users.id,
          }),
        }
      );

      if (res.status === 400) {
        alert("Invalid Credential!");
      } else {
        await res.json();
        setActiveTheme(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while uploading image.");
    }
  };
//   GET..........................................
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
  
  return (
    <div className="absolute w-full h-screen left-0 top-0 bg-dark1 z-50 bg-opacity-80 flex justify-center items-center">
      <div
        className="p-6 w-[30%]"
        style={{ backgroundColor: `${userData.usertheme}` }}
      >
        <h1 className="text-lg font-light text-red-500">Theme</h1>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="radio"
            name="theme"
            value="#333"
            onChange={(e) => setInputValue({value: e.target.value, label: "Light"})}
            label="Light"
            className="w-5 h-5"
            checked={userData.usertheme === "#333"}
          />
          <Input
            type="radio"
            name="theme"
            value="#121212"
            onChange={(e) => setInputValue({value: e.target.value, label: "Dark"})}
            label="Dark"
            className="w-5 h-5"
            checked={userData.usertheme === "#121212"}
          />
          <Input
            type="radio"
            name="theme"
            value="#fafafa"
            onChange={(e) => setInputValue({value: e.target.value, label: "System default"})}
            label="System default"
            className="w-5 h-5"
            checked={userData.usertheme === "#fafafa"}
          />
          <div className="flex flex-row w-full justify-end items-center pt-4 gap-4">
            <button
              onClick={() => setActiveTheme(false)}
              className="text-lg px-4 rounded-full bg-dark3 shadow-2xl border hover:text-teal-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-lg px-4 rounded-full text-black bg-teal-600 hover:bg-teal-500"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Theme;
