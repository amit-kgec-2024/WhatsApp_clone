import React, { useState } from "react";

const AuthProfile = () => {
    const [users] = useState(
      () => JSON.parse(localStorage.getItem("user:detail")) || {}
    );
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-50">
      <form action="">
        <div className="">
            <div className="border w-[10rem] h-[10rem] rounded-full overflow-hidden flex justify-center">
                <img src="favicon.ico" alt="Bird" />
            </div>
          <input type="file" placeholder=""/>
        </div>
      </form>
      <h1 className="bg-red-500 p-6 text-black">{users.mobile}oo</h1>
    </div>
  );
};

export default AuthProfile;
