import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar({ currentUser }) {

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
