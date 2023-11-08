import React from "react";
import { BsFillCameraVideoFill, BsPersonAdd } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Martin</span>
        <div className="chatIcons">
          <BsFillCameraVideoFill className="action-icon" />
          <BsPersonAdd className="action-icon" />
          <FiSettings className="action-icon" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
