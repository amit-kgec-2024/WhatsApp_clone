import "./App.css";
import { Route, Routes as Router } from "react-router-dom";
import Authorization from "./component/Authorization";
import Home from "./component/Home";
import Loaderhome from "./component/Loaderhome";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const userDetails = JSON.parse(localStorage.getItem("users:detail"));
      setUsers(userDetails);
      setLoading(false);
    }, 2000); 
  }, []);

  if (loading) {
    return <Loaderhome />;
  }

  return (
    <Router>
      <Route path="/" element={users ? <Home /> : <Authorization/>} />
    </Router>
  );
}

export default App;
