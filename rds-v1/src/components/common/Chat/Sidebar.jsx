import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

export default function Sidebar({ currentUser }) {
  return (
    <div className="sidebar">
      <Navbar currentUser={currentUser} />
      <Search currentUser={currentUser} />
      <Chats />
    </div>
  );
}