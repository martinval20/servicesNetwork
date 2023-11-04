import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard/PostsCard";
import { BsPencil } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../Modal/FileUploadModal";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import "./ProfileCard.scss";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatus, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
    setCurrentImage({});
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        {/* {currentUser.id === location?.state?.id ? (
          <div className="edit-btn">
            <BsPencil className="edit-icon" onClick={onEdit} />
          </div>
        ) : (
          <></>
        )} */}
        <div className="profile-info">
          <div className="edit-btn">
            <BsPencil className="edit-icon" onClick={onEdit} />
          </div>
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}{" "}
              {Object.values(currentProfile).length === 0
                ? currentUser.lastname
                : currentProfile?.lastname}
            </h3>

            <p className="labores">
              {Object.values(currentProfile).length === 0
                ? currentUser.labores
                : currentProfile?.labores}
            </p>
            <p className="skills">
              <span className="skill-label">Trabajos de</span>:&nbsp;
              {Object.values(currentProfile).length === 0
                ? currentUser.skills
                : currentProfile?.skills}
            </p>
            <p>
              {Object.values(currentProfile).length === 0
                ? `${currentUser.district}, ${currentUser.city}`
                : currentProfile?.location}
            </p>
          </div>

          <div className="right-info">
            <p>
              {Object.values(currentProfile).length === 0
                ? currentUser.labores
                : currentProfile?.labores}
            </p>
            <p>
              {Object.values(currentProfile).length === 0
                ? currentUser.skills
                : currentProfile?.skills}
            </p><p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutme
            : currentProfile?.aboutme}
        </p>
          </div>
        </div>
        
      </div>

      <div className="post-status-main">
        {allStatus?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}
