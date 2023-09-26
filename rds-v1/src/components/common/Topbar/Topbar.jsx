import React, { useState } from "react";
import "./Topbar.scss";
import snLogo from "../../../assets/snLogo.png";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiSolidBriefcaseAlt2 } from "react-icons/bi";
import { TbMessageCircle2 } from "react-icons/tb";
import { BsBell } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../ProfilePopup/ProfilePopup";
import user from "../../../assets/user.png";

export default function Topbar() {
  const [popupVisible, setPopupVisible] = useState(false);
  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };
  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

      <img className="snLogo" src={snLogo} alt="snLogo" />
      <div className="react-icons">
        <AiOutlineSearch size={30} className="react-icon" />
        <AiOutlineHome
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/home")}
        />
        <AiOutlineUserSwitch
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/profile")}
        />
        <BiSolidBriefcaseAlt2 size={30} className="react-icon" />
        <TbMessageCircle2 size={30} className="react-icon" />
        <BsBell size={30} className="react-icon" />
      </div>
      <img className="user-icon" src={user} alt="user" onClick={displayPopup} />
    </div>
  );
}
