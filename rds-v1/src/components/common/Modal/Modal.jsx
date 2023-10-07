import React from "react";
import { Modal, Button } from "antd";
import "./Modal.scss";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
  isEdit,
  updateStatus,
}) => {
  return (
    <>
      <Modal
        title={isEdit ? "Editar Publicación":"Crea una publicación"}
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
        }}
        footer={[
          <Button
            onClick={isEdit? updateStatus: sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            {isEdit ? "Actualizar" : "Publicar"}
          </Button>,
        ]}
      >
        <input
          className="modal-input"
          placeholder="¿Tienes algún trabajo disponible o necesitas asistencia en algo?"
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
