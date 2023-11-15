import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState, useContext } from "react";
import { IoIosAttach } from "react-icons/io";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { firestore, storage } from "../../../firebaseConfig";
import uuid from "react-uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Input({ currentUser }) {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

   const { currentUser1 } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    console.log(data.id);
    if (img) {
      const storageRef = ref(storage, `chatImages/${uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(firestore, "chats", data.user.uid), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.id,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(firestore, "chats", data.user.id), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.id,
          date: Timestamp.now(),
        }),
      });
    }
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Escribe algo..."
        onChange={(e) => setText(e.target.value)}
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
