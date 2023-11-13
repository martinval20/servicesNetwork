import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar({ currentUser }) {
  let location = useLocation();
  const [currentProfile, setCurrentProfile] = useState({});
  console.log(currentUser.lastname);
  useMemo(() => {
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);
  return (
    <div className="navbar">
      <div className="user">
        <img
          src={currentUser.imageLink}
          alt=""
        />
        <span>
          {currentUser.name} {currentUser.lastname}
        </span>
      </div>
    </div>
  );
}
