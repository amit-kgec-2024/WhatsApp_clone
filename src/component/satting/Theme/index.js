import React from "react";
import Input from "../../Input";

const Theme = ({ onClick }) => {
  return (
    <div className="absolute w-full  bg-dark6 bg-opacity-80 z-50 h-screen flex justify-center items-center">
      <div className="bg-dark3 p-8 w-[30%] rounded-lg">
        <h1 className="text-lg font-semibold">Theme</h1>
        <form action="">
          <Input type="radio" name="theme" label="Light" className="w-5 h-5"/>
          <Input type="radio" name="theme" label="Dark" className="w-5 h-5"/>
          <Input type="radio" name="theme" label="System default" className="w-5 h-5"/>
        </form>
        <div className="w-full flex flex-row justify-end items-center gap-10">
        <button onClick={onClick} className="text-sm px-6 py-2 rounded-full text-green-500 hover:text-green-400 bg-dark3 shadow">Cancel</button>
        <button onClick={onClick} className="text-sm px-6 py-2 rounded-full text-black bg-teal-500 hover:bg-teal-400">OK</button>

        </div>
      </div>
    </div>
  );
};

export default Theme;
