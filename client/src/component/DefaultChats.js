import React from 'react'

const DefaultChats = () => {
  return (
    <div
      className="w-full h-screen bg-dark3 flex flex-col items-center justify-center"
    //   style={{ backgroundColor: `${imageUrl.usertheme}b21` }}
    >
      <div className="w-full flex justify-center">
        <img src="frontchat.png" alt="Bird" />
      </div>
      <h1 className="text-4xl font-light text-center py-3">
        Download WhatsApp for Windows
      </h1>
      <h1 className="text-sm text-slate-400 w-full text-center py-3">
        Make Calls, share your screen and get a faster experience when you
        download the <br />
        Windows app.
      </h1>
      <div className="w-full flex justify-center py-3">
        <button className="px-5 py-2 rounded-full text-black bg-teal-500">
          Get from Microsoft Store
        </button>
      </div>
    </div>
  );
}

export default DefaultChats
