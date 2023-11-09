import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { openAddUserModal } from '../state/appManagerSlice';

export default function AddUserButton() {

  const dispatch = useDispatch();

  const clickButton = () => dispatch(openAddUserModal());

  return (
    <div>
      <Button onClick={clickButton}>Add new user</Button>
    </div>
  );
}