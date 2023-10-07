import React, { useEffect, useState } from "react";
import { getContacts } from "../../../api/FirestoreAPI";

export default function ContactedUsers({ user, getCurrentUser, currentUser }) {
  const [isContacted, setIsContacted] = useState(false);
  useEffect(() => {
    getContacts(currentUser.id, user.id, setIsContacted);
  }, [currentUser.id, user.id]);
  return isContacted ? (
    <></>
  ) : (
    <div className="grid-child" onClick={() => getCurrentUser(user.id)}>
      <p>
        {" "}
        {user.name} {user.lastname}{" "}
      </p>
      <p> {user.labores} </p>
    </div>
  );
}
