import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { editProfile } from "../../../api/FirestoreAPI";
import "./ProfileEdit.scss";

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };
  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
    //console.log(currentUser?.userID, editInputs);
  };
  //To see what I'm sending...
  //console.log(editInputs);
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
      </div>
      <div className="profile-edit-inputs">
        <label>Nombres: </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Nombre"
          name="name"
          value={editInputs.name}
        />
        <label>Apellidos: </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Apellido"
          name="lastname"
          value={editInputs.lastname}
        />
        <label>Habilidades: </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Habilidades"
          name="skills"
          value={editInputs.skills}
        />
        <label>Labores: </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Labores"
          name="labores"
          value={editInputs.labores}
        />
        <label>Ciudad: </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Ciudad"
          name="city"
          value={editInputs.city}
        />
        <label>Distrito: </label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Distrito"
          name="district"
          value={editInputs.district}
        />
        <label>Sobre mí</label>
        <textarea
          placeholder="Sobre mí"
          onChange={getInput}
          className="common-textArea"
          rows={5}
          name="aboutme"
          value={editInputs.aboutme}
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Guardar
        </button>
      </div>
    </div>
  );
}
