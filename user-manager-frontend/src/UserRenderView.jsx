import { useDispatch } from 'react-redux';
import { startToEdit } from './usersSlice';
import Button from 'react-bootstrap/Button';

export default function UserRenderView({user}) {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(startToEdit(user.id));
  };

  return (
    <div>
      <ul>
        <li>Name: {user.fields.name}</li>
        <li>Username: {user.fields.userName}</li>
        <li>Email: {user.fields.email}</li>
        <li>Address: {user.fields.street} {user.fields.suite}</li>
        <li>Postal address: {user.fields.zip} {user.fields.town}</li>
        <li>Phone number: {user.fields.phone}</li>
        <li>Website: {user.fields.website}</li>
        <li>Company: {user.fields.company}</li>
      </ul>
      <Button onClick={onClick} variant="primary">Edit</Button>
    </div>
  );
}