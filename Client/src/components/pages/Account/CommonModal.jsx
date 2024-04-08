import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditAccountModal = ({ show, handleClose, fields }) => {
    console.log(fields)
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field, index) => (
            <Form.Group key={index}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control type={field.type} placeholder={field.placeholder} />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAccountModal;
