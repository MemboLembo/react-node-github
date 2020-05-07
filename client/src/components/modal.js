import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function Mymodal({modalIsOpen, onClose = () => {}, buttonType, ...props}) {
  return (
    <Modal
      show={modalIsOpen}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please, enter your details below
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.children}</Modal.Body>

      <Modal.Footer>
        <Button 
        variant="outline-danger" 
        type="submit" 
        onClick={onClose}>
        Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Mymodal;