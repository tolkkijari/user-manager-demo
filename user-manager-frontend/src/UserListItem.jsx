import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { startToEdit, openInfoModal, deleteUser } from './appManagerSlice';

export default function UserListItem({userObj}) {
  const dispatch = useDispatch();

  const edit = () => dispatch(startToEdit(userObj.id));
  const showDetails = () => dispatch(openInfoModal(userObj.id));
  const deleteClick = () => dispatch(deleteUser(userObj.id));

  return(
    <Row>
      <Col sm={9}>
        {userObj.fields.name}
      </Col>
      <Col sm={2}>
        <ButtonGroup>
          <Button onClick={showDetails}>
            Show Details
          </Button>
          <Button onClick={edit}>
            Edit
          </Button>
        </ButtonGroup>
      </Col>
      <Col m={1}>
        <Button variant="danger" onClick={deleteClick}>
          Delete
        </Button>
      </Col>
    </Row>
  );
}