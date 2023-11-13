//CHECH THIS LEATER
import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
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
    console.log(username);
    console.log(username.user);
  };

  const handleSelect = async ()=>{
    //Check the group (chats in firestore)exists, if not then create
    const res= await getDocs(firestore, "chats")

    //create user chats
  }

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
      {err && <span>Usuario no encontrado</span>}
      {user && (
        <div className="userChat">
          <img src={user.imageLink} alt="" />
          <div className="userChatInfo">
            <span>{user.name} {user.lastname}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
