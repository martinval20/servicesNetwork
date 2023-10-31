import React, { useState, useMemo } from "react";
import Contacts from "../Pages/Contacts";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar/Topbar";

export default function ContactLayout() {
  const [currentUser, setCurrentUser] = useState({});
  
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="div-container">
      <Topbar currentUser={currentUser}/>
      <Contacts currentUser={currentUser} />
    </div>
  );
}
