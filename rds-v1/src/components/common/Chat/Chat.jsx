import React, { useContext, useMemo, useState } from "react";
import { getContacts } from "../../../api/FirestoreAPI";
import { BsFillCameraVideoFill, BsPersonAdd } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

export default function Chat({ currentUser }) {
  let location = useLocation();
  const [user, setUser] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [isContacted, setIsContacted] = useState(false);
  const {data} = useContext(ChatContext);
  useMemo(() => {
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return isContacted ? (
    <></>
  ) : (
    <div className="chat" >
      <div className="chatInfo">
        <span>{data.user?.name} {data.user?.lastname}</span>
        <div className="chatIcons">
          <BsFillCameraVideoFill className="action-icon" />
          <BsPersonAdd className="action-icon" />
          <FiSettings className="action-icon" />
        </div>
      </div>
      <Messages />
      <Input currentUser={currentUser}/>
    </div>
  );
}
