import React from "react";
import "./PostsCard.scss";

export default function PostsCard({ posts, id }) {
  return (
    <div className="posts-card" key={id} >
      <p className="name">{posts.userName}</p>
      <p className="lastname">{posts.lastname}</p>
      <p className="timestamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>
    </div>
  );
}
