import { useSelector, useDispatch } from 'react-redux';
import { selectUserById } from './usersSlice';
import Button from 'react-bootstrap/Button';
import UserRenderView from './UserRenderView.jsx'
import UserEditView from './UserEditView.jsx'

export default function UserItem({id}) {
  const dispatch = useDispatch();
  const user = useSelector(state => selectUserById(state, id));

  const onClick = () => {
    dispatch(startToEdit(id));
  };

  return (
    !!user ?
      !!user.isUnderEdit ?
        <UserEditView user={user} />
      :
        <UserRenderView user={user} />
    :
      <div></div>
  );
}