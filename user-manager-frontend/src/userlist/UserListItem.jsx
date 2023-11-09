import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { startToEdit, openInfoModal, deleteUser } from '../state/appManagerSlice';

export default function UserListItem({userObj}) {
  const dispatch = useDispatch();

  const edit = () => dispatch(startToEdit(userObj.id));
  const showDetails = () => dispatch(openInfoModal(userObj.id));
  const deleteClick = () => dispatch(deleteUser(userObj.id));

  return(
    <Row style={{marginTop: '10px'}}>
      <Col xs={4} sm={4} lg={{span: 3, offset: 2}}>
        {userObj.fields.name}
      </Col>
      <Col xs={4} sm={4} lg={2}>
        <ButtonGroup>
          <Button onClick={showDetails}>
            Show Details
          </Button>
          <Button onClick={edit}>
            Edit
          </Button>
        </ButtonGroup>
      </Col>
      <Col xs={4} sm={4} lg={1}>
        <Button variant="danger" onClick={deleteClick}>
          Delete
        </Button>
      </Col>
    </Row>
  );
}