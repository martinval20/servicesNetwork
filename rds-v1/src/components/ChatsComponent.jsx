import React from "react";
import Sidebar from "./common/Chat/Sidebar";
import Chat from "./common/Chat/Chat";
import "../Sass/ChatComponent.scss";

export default function ChatsComponent({ currentUser }) {
  return (
    <div className="home">
      <div className="container">
        <Sidebar currentUser={currentUser} />
        <Chat currentUser={currentUser} />
      </div>
    </div>
  );
}
