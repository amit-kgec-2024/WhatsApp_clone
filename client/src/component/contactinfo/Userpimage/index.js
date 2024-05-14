import React from "react";
import { RxCross1 } from "react-icons/rx";

const Userpimage = ({ onClick }) => {
  return (
    <div className="profile-animation bg-dark6 bg-opacity-90 w-full h-screen">
      <div className="bg-dark6 opacity-100 px-6 py-3 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src="amitimg.png" alt="Bird" />
          </div>
          <h1 className="text-xl">KGEC Nur</h1>
        </div>
        <button onClick={onClick} className="text-lg">
          <RxCross1 />
        </button>
      </div>
      <div className="w-full flex mt-6 justify-center">
        <img src="amitimg.png" alt="Bird" />
      </div>
    </div>
  );
};

export default Userpimage;
