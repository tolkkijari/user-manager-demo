import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import EditInputFieldWrapper from './EditInputFieldWrapper';

export default function AppModal(props) {

  return(
    <Modal show={props.showModal} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {props.children}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>
          Close
        </Button>
        <Button variant="primary" onClick={props.save}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );

}