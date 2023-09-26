import React from "react";
import { Modal, Button } from "antd";
import "./Modal.scss";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
}) => {
  return (
    <>
      <Modal
        title="Crea una publicación"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            onClick={sendStatus}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            Publicar
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
