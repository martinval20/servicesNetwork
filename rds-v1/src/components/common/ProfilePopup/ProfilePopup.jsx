import React from "react";
import { onLogout } from "../../../api/AuthAPI";
import "./ProfilePopup.scss";
export default function ProfilePopup() {
  return (
    <div className="popup-card">
      <ul className="popup-options">
        <li className="popup-option" onClick={onLogout}>
          Cerrar sesión
        </li>
      </ul>
    </div>
  );
}
