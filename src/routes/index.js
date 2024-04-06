import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import Navbar from "../component/Navbar";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Navbar />} />
    </Router>
  );
};

export default Routes;
