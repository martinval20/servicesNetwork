import React, { useMemo, useState } from "react";
import {
  interestPost,
  getInterestsByUser,
  postComment,
  getComments,
} from "../../../api/FirestoreAPI";
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import "./InterestButton.scss";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";

export default function InterestButton({ userId, postId, currentUser }) {
  const [interestsCount, setInterestsCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [interested, setInterested] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const handleInterest = () => {
    interestPost(userId, postId, interested);
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(
      postId,
      comment,
      getCurrentTimeStamp("LLLL"),
      currentUser?.name,
      currentUser?.lastname
    );
    setComment("");
  };

  useMemo(() => {
    getInterestsByUser(userId, postId, setInterested, setInterestsCount);
    getComments(postId, setComments);
  }, [userId, postId]);
  return (
    <div className="interest-container">
      <p>{interestsCount} Personas les interesó esta publicación</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="interest-comment">
        {/* <p>{interested ? "Te interesa" : "Me interesa"}</p> */}
        <div className="interests-comment-inner" onClick={handleInterest}>
          {interested ? (
            <AiFillLike size={30} color="orange" />
          ) : (
            <SlLike size={30} color="orange" />
          )}
          <p className={interested ? "orange" : "black"}>Me interesa</p>
        </div>
        <div
          className="interests-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <FaRegCommentDots
            size={30}
            color={showCommentBox ? "orange" : "#212121"}
          />
          <p className={showCommentBox ? "orange" : "black"}>Comentarios</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            placeholder="Comentar"
            className="comment-input"
            autoComplete="off"
            name="comment"
            value={comment}
          />
          <button
            disabled={comment.length > 0 ? false : true}
            className="add-comment-btn"
            onClick={addComment}
          >
            Comentar
          </button>
          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="all-comments">
                  <p className="name">
                    {comment.name} {comment.lastname}
                  </p>
                  <p className="comment">{comment.comment}</p>

                  <p className="timestamp">{comment.timeStamp}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
