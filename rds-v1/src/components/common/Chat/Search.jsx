//CHECK THIS LEATER
import React, { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";

export default function Search({ currentUser }) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
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
    // console.log(user.uid);
    // console.log(user.name);
    // console.log(user.lastname);
    // console.log(user.imageLink);
    // console.log(currentUser.uid);
    // console.log(currentUser.name);
    // console.log(currentUser.lastname);
    // console.log(currentUser.imageLink);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(firestore, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(firestore, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(firestore, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid: user.uid,
            name: user.name,
            lastname: user.lastname,
            imageLink: user.imageLink,
          },
          [combinedId+ ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(firestore, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.name,
            lastname: currentUser.lastname,
            imageLink: currentUser.imageLink,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser("");
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
      {/* {username.length === 0 ? (
        <></>
      ) : ( */}

      {err && <span>Usuario no encontrado</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.imageLink} alt="" />
          <div className="userChatInfo">
            <span>
              {user.name} {user.lastname}
            </span>
          </div>
        </div>
      )}
      {/* )} */}
    </div>
  );
}
