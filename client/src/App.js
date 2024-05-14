import "./App.css";
import { Route, Routes as Router, Navigate } from "react-router-dom";
import AuthProfile from "./component/AuthProfile";
import Authorization from "./component/Authorization";
import Home from "./component/Home";


function App() {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/authprofile" element={<AuthProfile />} />
      <Route path="/authorization" element={<Authorization />} />
    </Router>
  );
}

export default App;
