import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { resetAndFetchUsers } from '../state/appManagerSlice';

export default function UpdateButton() {

  const dispatch = useDispatch();

  const reset = () => dispatch(resetAndFetchUsers());

  return (
    <div>
      <Button onClick={reset} variant="danger">Reset all users</Button>
    </div>
  );
}