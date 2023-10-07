import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import Button from "../Button/Button";
import "./ProfilePopup.scss";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="popup-card">
      <p className="name">
        {currentUser?.name} {currentUser?.lastname}
      </p>
      <p className="labores">{currentUser?.labores} </p>
      <Button
        title="Ver perfil"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },
          })
        }
      />

      <Button title="Cerrar sesión" onClick={onLogout} />
    </div>
  );
}
