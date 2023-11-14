//CHECK THIS LEATER
import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import { createUserChats } from "../../../api/FirestoreAPI";

export default function Search({ currentUser }) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(firestore, "users"),
      where("name", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const combinedId =
    currentUser.id > user.id
      ? currentUser.id + user.id
      : user.id + currentUser.id;

  const handleSelect = async () => {
    //Check the group (chats in firestore)exists, if not then create
    // const res = await getDocs(firestore, "chats");
    console.log(user.length)
    console.log(currentUser.id);
    console.log(combinedId);
    // getChat(combinedId)
    //create user chats
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Buscar contacto"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {user.length == 0 ? (<></>):(
        <div className="userChat" onClick={handleSelect}>
          <img src={user.imageLink} alt="" />
          <div className="userChatInfo">
            <span>
              {user.name} {user.lastname}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
