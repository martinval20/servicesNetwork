import React from "react";
import "./Modal.scss";
import { Button, Modal, Progress } from "antd";

export default function FileUploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) {
  return (
    <div>
      <Modal
        title="Agregar una Foto de Perfil"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            disabled={currentImage.name ? false : true}
            key="submit"
            type="primary"
            onClick={uploadImage}
          >
            Subir foto de perfil
          </Button>,
        ]}
      >
        <div className="image-upload-main1">
          <p>{currentImage.name}</p>
          <label className="upload-btn1" htmlFor="image-upload">
            Seleccione una Imagen{" "}
          </label>
          {progress == 0 ? (
            <></>
          ) : (
            <div className="progress-bar1">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          <input
            hidden
            id="image-upload"
            type={"file"}
            accept="image/*"
            onChange={getImage}
          />
        </div>
      </Modal>
    </div>
  );
}
