// import React from "react";
// import { Route, Routes as Router, Navigate } from "react-router-dom";
// import Authorization from "../component/Authorization";
// import AuthProfile from "../component/AuthProfile";

// // const PrivateRoute = ({ children }) => {
// //   const isUserLoggedIn = window.localStorage.getItem("user:token")
// //     ? true
// //     : false;
// //   const isFromPage = window.location.pathname.includes("account");

// //   if (isUserLoggedIn && !isFromPage) {
// //     return children;
// //   } else if (!isUserLoggedIn && isFromPage) {
// //     return children;
// //   } else {
// //     const redirectUrl = isUserLoggedIn ? "/" : "/account/signin";
// //     return <Navigate to={redirectUrl} replace />;
// //   }
// // };

// const Routes = () => {
//   return (
//     <Router>
//       <Route path="/authprofile" element={<AuthProfile />} />
//       <Route path="/authorization" element={<Authorization />} />
//     </Router>
//   );
// };

// export default Routes;
