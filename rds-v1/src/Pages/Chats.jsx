import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader/Loader";
import ChatsComponent from "../components/ChatsComponent";
import { ChatContextProvider } from "../components/common/context/ChatContext";

export default function Contacts({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <ChatContextProvider currentUser={currentUser}>
      <ChatsComponent currentUser={currentUser} />;
    </ChatContextProvider>
  );
}
