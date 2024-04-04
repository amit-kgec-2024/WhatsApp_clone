import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import Navbar from "../component/Navbar";
import Profile from "../component/Profile";
import Communities from "../component/Communities";
import Status from "../component/Status";
import Channels from "../component/Channels";
import Newchats from "../component/Newchats";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Navbar />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/communities" element={<Communities />} />
      <Route path="/status" element={<Status />} />
      <Route path="/channels" element={<Channels />} />
      <Route path="/newchats" element={<Newchats />} />
    </Router>
  );
};

export default Routes;
