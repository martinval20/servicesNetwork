import React, { useState, useMemo } from "react";
import { postStatus, getStatus } from "../../../api/FirestoreAPI";
import ModalComponent from "../Modal/Modal";
import PostsCard from "../PostsCard/PostsCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoments";
import { getUniqueID } from "../../../helpers/getUniqueId";
import "./PostUpdate.scss";

export default function PostStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      userLastname: currentUser.lastname,
      postID: getUniqueID(),
    };
    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
  };
  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <div className="post-status-main">
      <div className="post-status">
        <button className="open-post-modal" onClick={() => setModalOpen(true)}>
          Publicar
        </button>
      </div>
      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
      />
      <div>
        {allStatus.map((posts) => {
          return(
          <div key={posts.id}>
            <PostsCard posts={posts} />
          </div>
          );
        })}
      </div>
    </div>
  );
}
