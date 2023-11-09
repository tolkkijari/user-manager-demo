import SearchBar from './SearchBar.jsx'
import UserList from './UserList.jsx'
import UpdateButton from './UpdateButton.jsx'
import AddUserButton from './AddUserButton.jsx'
import EditModal from './EditModal.jsx'
import InfoModal from './InfoModal.jsx'
import AddNewUserModal from './AddNewUserModal.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
      <Container>
        <SearchBar />
        <UserList />
        <Row>
          <Col md={2}>
            <AddUserButton />
          </Col>
          <Col md={2}>
            <UpdateButton />
          </Col>
        </Row>
        <EditModal />
        <AddNewUserModal />
        <InfoModal />
      </Container>
    );
}
