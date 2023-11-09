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
        <Row style={{marginTop: '30px'}}>
          <Col xs={6} sm={6} lg={{span: 2, offset: 2}}>
            <AddUserButton />
          </Col>
          <Col xs={6} sm={6} lg={{span: 2, offset: 1}}>
            <UpdateButton />
          </Col>
        </Row>
        <EditModal />
        <AddNewUserModal />
        <InfoModal />
      </Container>
    );
}
