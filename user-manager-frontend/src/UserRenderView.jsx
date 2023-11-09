import { useDispatch } from 'react-redux';
import { startToEdit } from './appManagerSlice';
import Button from 'react-bootstrap/Button';

export default function UserRenderView({user}) {
  const dispatch = useDispatch();

  const onClick = () => dispatch(startToEdit(user.id));

  return (
    <div>
      <ul>
        <li>Name: {user.fields.name}</li>
        <li>Username: {user.fields.username}</li>
        <li>Email: {user.fields.email}</li>
        <li>Address: {user.fields.address}</li>
        <li>Postal address: {user.fields.postalAddress}</li>
        <li>Phone number: {user.fields.phone}</li>
        <li>Website: {user.fields.website}</li>
        <li>Company: {user.fields.company}</li>
      </ul>
      <Button onClick={onClick} variant="primary">Edit</Button>
    </div>
  );
}