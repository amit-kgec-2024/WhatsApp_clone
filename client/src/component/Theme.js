// import React, { useState, useEffect } from "react";

// const ColorRadio = ({ color, checked, onChange }) => {
//   return (
//     <label
//       style={{
//         backgroundColor: color,
//         padding: "10px",
//         borderRadius: "50%",
//         marginRight: "10px",
//       }}
//     >
//       <input
//         type="radio"
//         value={color}
//         checked={checked}
//         onChange={onChange}
//         style={{ display: "none" }}
//       />
//     </label>
//   );
// };

// const ColorPicker = () => {
//     const [displayShow, setDisplayShow] = useState(false);
//   const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFFF33"]; 
//   const [selectedColor, setSelectedColor] = useState("");

//   useEffect(() => {
//     const savedColor = localStorage.getItem("selectedColor");
//     if (savedColor) {
//       setSelectedColor(savedColor);
//     }
//   }, []);

//   const handleColorChange = (event) => {
//     const newColor = event.target.value;
//     setSelectedColor(newColor);
//   };

//   const handleSave = () => {
//     localStorage.setItem("selectedColor", selectedColor);
//     console.log("Color saved!");
//     setDisplayShow(false);
//   };

//   const handleClose = () => {
//     alert("Close button clicked!");
//   };

//   return (
//     <div>
//       {colors.map((color, index) => (
//         <ColorRadio
//           key={index}
//           color={color}
//           checked={selectedColor === color}
//           onChange={handleColorChange}
//         />
//       ))}
//       <div
//         style={{
//           marginTop: "20px",
//           backgroundColor: selectedColor,
//           width: "200px",
//           height: "200px",
//         }}
//       >
//         {/* Display area with selected color */}
//       </div>
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={handleSave} style={{ marginRight: "10px" }}>
//           Save
//         </button>
//         <button onClick={handleClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default ColorPicker;

// // // ThemeButton.js
// // import React, { useState } from "react";

// // const Theme = ({ setActiveTheme }) => {
// //   // State to track the selected color, saved color, and whether the color selection is shown
// //   const [selectedColor, setSelectedColor] = useState("#ff0000");
// //   const [savedColor, setSavedColor] = useState("");
// //   // Function to handle color change
// //   const handleColorChange = (event) => {
// //     setSelectedColor(event.target.value);
// // };

// // // Function to handle saving color
// // const handleSaveColor = () => {
// //     setSavedColor(selectedColor);
// //     // setActiveTheme(false);
// //     console.log('color=>', selectedColor, "save=>",savedColor);
// //   };

// //   // Apply selected color
// //   const buttonStyle = {
// //     backgroundColor: selectedColor,
// //     color: "#ffffff",
// //   };

// //   return (
// //     <div className="absolute w-full h-screen left-0 top-0 bg-dark1  opacity-90 flex justify-center items-center">
// //       <div className="bg-dark5 p-6 w-[30%]">
// //         <h1 className="text-lg font-light">Theme</h1>
// //         <div>
// //           <div>
// //             <input
// //               type="radio"
// //               id="red"
// //               name="color"
// //               value="#ff0000"
// //               checked={selectedColor === "#ff0000" || savedColor === "#ff0000"}
// //               onChange={handleColorChange}
// //             />
// //             <label htmlFor="red">Red</label>
// //           </div>
// //           <div>
// //             <input
// //               type="radio"
// //               id="green"
// //               name="color"
// //               value="#00ff00"
// //               checked={selectedColor === "#00ff00" || savedColor === "#00ff00"}
// //               onChange={handleColorChange}
// //             />
// //             <label htmlFor="green">Green</label>
// //           </div>
// //           <div>
// //             <input
// //               type="radio"
// //               id="blue"
// //               name="color"
// //               value="#0000ff"
// //               checked={selectedColor === "#0000ff" || savedColor === "#0000ff"}
// //               onChange={handleColorChange}
// //             />
// //             <label htmlFor="blue">Blue</label>
// //           </div>
// //           <div>
// //             <input
// //               type="radio"
// //               id="yellow"
// //               name="color"
// //               value="#ffff00"
// //               checked={selectedColor === "#ffff00" || savedColor === "#ffff00"}
// //               onChange={handleColorChange}
// //             />
// //             <label htmlFor="yellow">Yellow</label>
// //           </div>
// //         </div>
// //         <div className="flex flex-row w-full justify-end items-center pt-4 gap-4">
// //           <button
// //             onClick={() => setActiveTheme(false)}
// //             className="text-lg px-4 rounded-full bg-dark3 shadow-2xl border hover:text-teal-600"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             style={buttonStyle}
// //             onClick={handleSaveColor}
// //             className="text-lg px-4 rounded-full text-black bg-teal-600 hover:bg-teal-500"
// //           >
// //             Save Color
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Theme;
