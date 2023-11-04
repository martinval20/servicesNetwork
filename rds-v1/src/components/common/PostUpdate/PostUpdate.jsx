import React, { useState, useMemo } from "react";
import { postStatus, getStatus, updatePost } from "../../../api/FirestoreAPI";
import ModalComponent from "../Modal/Modal";
import PostsCard from "../PostsCard/PostsCard";
import { uploadPostImage } from "../../../api/ImageUpload";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueID } from "../../../helpers/getUniqueId";
import "./PostUpdate.scss";

export default function PostStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      userLastname: currentUser.lastname,
      postID: getUniqueID(),
      userID: currentUser.id,
      postImage: postImage,
    };
    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus("");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);


  return (
    <div className="post-status-main">
      <div className="user-details">
        <img src={currentUser.imageLink} alt="imageLink" />
        <p className="name">
          {currentUser.name} {currentUser.lastname}
        </p>
        <p className="labores">{currentUser.labores}</p>
      </div>
      <div className="post-status">
        <img
          className="post-image"
          src={currentUser.imageLink}
          alt="imageLink"
        />
        <button
          className="open-post-modal"
          onClick={() => {
            console.log(getCurrentTimeStamp("LLLL"));
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Publicar
        </button>
      </div>
      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
      />
      <div>
        {allStatus.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} getEditData={getEditData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
