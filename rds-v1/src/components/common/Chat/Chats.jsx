import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { firestore } from "../../../firebaseConfig";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Chats= () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(firestore, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid ]);
  const handleSelect = (u) =>{
    dispatch({type: "CHANGE_USER", payload: u});
  }

  // console.log(Object.entries(chats));
  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1]?.userInfo)}>
          <img src={chat[1].userInfo.imageLink} alt="" />
          <div className="userChatInfo">
            <span>
              {chat[1].userInfo.name} {chat[1].userInfo.lastname}
            </span>
            <p>{chat[1].userInfo.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;