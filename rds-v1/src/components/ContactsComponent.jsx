import React, { useEffect, useState } from "react";
import { getAllUsers, addContact } from "../api/FirestoreAPI";
import ContactedUsers from "./common/ContactedUsers/ContactedUsers";
import "../Sass/HomeComponent.scss";

export default function ContactComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  const getCurrentUser = (id) => {
    addContact(currentUser.id, id);
  };

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className="contacts-main">
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <></>
        ) : (
          <ContactedUsers
            currentUser={currentUser}
            user={user}
            getCurrentUser={getCurrentUser}
          />
        );
      })}
    </div>
  );
}
