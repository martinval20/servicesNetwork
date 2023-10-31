import React, { useState, useMemo } from "react";
import Home from "../Pages/Home";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar/Topbar";

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});
  
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="div-container" >
      <Topbar currentUser={currentUser}/>
      <Home currentUser={currentUser} />
    </div>
  );
}
