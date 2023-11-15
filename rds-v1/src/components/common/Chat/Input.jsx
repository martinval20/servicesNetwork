import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useState, useContext } from "react";
import { IoIosAttach } from "react-icons/io";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { firestore, storage } from "../../../firebaseConfig";
import uuid from "react-uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChatContext } from "../context/ChatContext";

export default function Input({ currentUser }) {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    console.log(data.user.id);
    if (img) {
      const storageRef = ref(storage, `chatImages/${uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(firestore, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(firestore, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(firestore, "userChats", currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });
    await updateDoc(doc(firestore, "userChats", data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });

    setText("")
    setImg(null)
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Escribe algo..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <IoIosAttach className="send-icon" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <MdOutlineAddPhotoAlternate className="send-icon" />
        </label>
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}
