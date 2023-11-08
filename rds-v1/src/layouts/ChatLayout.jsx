import React, { useState, useMemo } from "react";
import Chats from "../Pages/Chats";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar/Topbar";


export default function ChatLayout() {
  const [currentUser, setCurrentUser] = useState({});
  
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="div-container" >
      <Topbar currentUser={currentUser}/>
      <Chats currentUser={currentUser}/>
    </div>
  );
}