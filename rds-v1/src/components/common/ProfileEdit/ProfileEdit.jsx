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
      <div className="edit-btn1">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
      </div>
      <div className="edit-inputs">
        <div className="edit-inputs">
          <input
            onChange={getInput}
            className="common-input"
            autoComplete="off"
            type="text"
            name="name"
            value={editInputs.name}
            id="name"
          />
          <label className="label" htmlFor="name">
            Nombres{" "}
          </label>
        </div>
        <div className="edit-inputs">
          <input
            onChange={getInput}
            className="common-input"
            autoComplete="off"
            type="text"
            name="lastname"
            value={editInputs.lastname}
            id="lastname"
          />
          <label className="label" htmlFor="lastname">
            Apellidos{" "}
          </label>
        </div>
        <div className="edit-inputs">
          <input
            onChange={getInput}
            className="common-input"
            autoComplete="off"
            type="text"
            name="skills"
            value={editInputs.skills}
            id="skills"
          />
          <label className="label" htmlFor="skills">
            Habilidades{" "}
          </label>
        </div>
        <div className="edit-inputs">
          <input
            onChange={getInput}
            className="common-input"
            autoComplete="off"
            type="text"
            name="labores"
            value={editInputs.labores}
            id="labores"
          />{" "}
          <label className="label" htmlFor="labores">
            Labores{" "}
          </label>
        </div>
        <div className="edit-inputs">
          <input
            onChange={getInput}
            className="common-input"
            autoComplete="off"
            type="text"
            name="city"
            value={editInputs.city}
            id="city"
          />{" "}
          <label className="label" htmlFor="city">
            Ciudad{" "}
          </label>
        </div>
        <div className="edit-inputs">
          <input
            onChange={getInput}
            className="common-input"
            type="text"
            autoComplete="off"
            name="district"
            value={editInputs.district}
            id="district"
          />
          <label className="label" htmlFor="district">
            Distrito{" "}
          </label>
        </div>
        <div className="edit-inputs">
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
    </div>
  );
}
