import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../../firebaseConfig";

export default function Chats({ currentUser }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(firestore, "userChats", currentUser.userID),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };

    currentUser.userID && getChats();
  }, [currentUser.userID]);

  console.log(Object.entries(chats));
  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat)=>(
      <div className="userChat" key={chat[0]}>
        <img
          src={chat[1].userInfo.image}
          alt=""
        />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.name} {chat[1].userInfo.lastname}</span>
          <p>{chat[1].userInfo.lastMessage?.text}</p>
        </div>
      </div>))}
    </div>
  );
}
