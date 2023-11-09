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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYEfJo6j7axefgRh1oPdPgcwOBc8PeIw8LHR6QXMlosA&s"
          alt=""
        />
        <span>
          {currentUser.name} {currentUser.lastname}
        </span>
      </div>
    </div>
  );
}
