import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import Navbar from "../component/Navbar";
import Newgroup from "../component/Newgroup";
import Sattings from "../component/Sattings";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Navbar />} />
      <Route path="/newgroup" element={<Newgroup />} />
      <Route path="/sattings" element={<Sattings />} />
    </Router>
  );
};

export default Routes;
