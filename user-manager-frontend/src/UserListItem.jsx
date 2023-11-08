import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { startToEdit, openInfoModal, deleteUser } from './usersSlice';

export default function UserListItem({userObj}) {
  const dispatch = useDispatch();

  const edit = () => dispatch(startToEdit(userObj.id));
  const showDetails = () => dispatch(openInfoModal(userObj.id));
  const deleteClick = () => dispatch(deleteUser(userObj.id));

  return(
    <Row>
      <Col sm={8}>
        {userObj.fields.name}
      </Col>
      <Col sm={2}>
        <Button onClick={showDetails}>
          Show Details
        </Button>
      </Col>
      <Col m={1}>
        <Button onClick={edit}>
          Edit
        </Button>
      </Col>
      <Col m={1}>
        <Button variant="danger" onClick={deleteClick}>
          Delete
        </Button>
      </Col>
    </Row>
  );
}