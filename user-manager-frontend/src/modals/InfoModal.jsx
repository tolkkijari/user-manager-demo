import { useSelector, useDispatch } from 'react-redux';
import { isInfoModalShown, closeInfoModal, selectedUser } from '../state/appManagerSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TableRow from './TableRow';

export default function InfoModal() {

  const dispatch = useDispatch();

  const user = useSelector(selectedUser);
  const showInfoModal = useSelector(isInfoModalShown);

  const hide = () => dispatch(closeInfoModal());

  return(
    showInfoModal ?
      <Modal show={showInfoModal} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>User data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableRow title={"Name"} user={user} field={"name"} />
          <TableRow title={"Username"} user={user} field={"username"} />
          <TableRow title={"Email"} user={user} field={"email"} />
          <TableRow title={"Address"} user={user} field={"address"} />
          <TableRow title={"Postal address"} user={user} field={"postalAddress"} />
          <TableRow title={"Phone Number"} user={user} field={"phone"} />
          <TableRow title={"Website"} user={user} field={"website"} />
          <TableRow title={"Company"} user={user} field={"company"} />
        </Modal.Body>
      </Modal>
    : <></>
  );

}