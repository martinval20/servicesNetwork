//CHECK THIS LEATER
import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";

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

  const handleSelect = async () => {
    //Check the group (chats in firestore)exists, if not then create
    // const res = await getDocs(firestore, "chats");
    const combinedId =
      currentUser.id > user.id
        ? currentUser.id + user.id
        : user.id + currentUser.id;
    console.log(user.id);
    console.log(currentUser.id);
    console.log(combinedId);
    try {
      const res = await getDoc(doc(firestore, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(firestore, "chats", combinedId), { messages: [] });

        await updateDoc(doc(firestore, "userChats", currentUser.userID), {
          [combinedId + ".userInfo"]: {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            image: user.imageLink,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(firestore, "userChats", user.userID), {
          [combinedId + ".userInfo"]: {
            id: currentUser.id,
            name: currentUser.name,
            lastname: currentUser.lastname,
            image: currentUser.imageLink,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser([]);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Buscar contacto"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {user.length === 0 ? (
        <></>
      ) : (
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
