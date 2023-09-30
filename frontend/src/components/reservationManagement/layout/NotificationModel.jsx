import React from "react";
import { Button, Modal } from "react-bootstrap";

function NotificationModel(props) {
  const { message, handleModalClose } = props;
  return (
    <>
      <Modal size="md" show={true} onHide={handleModalClose} backdrop="static">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <center>
            <p>
              <b>{message}</b>
            </p>
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NotificationModel;
