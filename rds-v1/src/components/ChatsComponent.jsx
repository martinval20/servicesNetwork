import React from "react";
import Sidebar from "./common/Chat/Sidebar";
import Chat from "./common/Chat/Chat";
import "../Sass/ChatComponent.scss";


function ChatsComponent() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat/>
      </div>
    </div>
  );
}

export default ChatsComponent;
