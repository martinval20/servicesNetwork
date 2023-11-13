import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { getContacts } from "../../../api/FirestoreAPI";

export default function ContactedUsers({ user, getCurrentUser, currentUser }) {
  const [isContacted, setIsContacted] = useState(false);
  useEffect(() => {
    getContacts(currentUser.id, user.id, setIsContacted);
  }, [currentUser.id, user.id]);
  return isContacted ? (
    <></>
  ) : (
    <div className="grid-child">
      <img src={user.imageLink} />
      <p className="name">
        {" "}
       {user.name} {user.lastname}{" "}
      </p>
      <p className="labores"> {user.labores} </p>
      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUserAdd size={20} />
        Conectar
      </button>
    </div>
  );
}