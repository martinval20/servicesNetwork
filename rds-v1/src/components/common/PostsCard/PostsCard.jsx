import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getContacts,
} from "../../../api/FirestoreAPI";
import InterestButton from "../InterestButton/InterestButton";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import "./PostsCard.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isContacted, setIsContacted] = useState(false);
  

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getContacts(currentUser.id, posts.userID, setIsContacted);
  }, [currentUser.id, posts.userID]);

  return (
    isContacted ? 
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {currentUser.id === posts.userID ? (
          <div className="action-container">
            <FiEdit
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <MdOutlineDeleteForever
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )}
        <img
          alt="profile-image"
          className="post-image"
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}{" "}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.lastname}
          </p>
          <p className="labores">
            {" "}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.labores}
          </p>
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>

      <p className="status">{posts.status}</p>

      <InterestButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />
    </div> : <></>
  );
}
