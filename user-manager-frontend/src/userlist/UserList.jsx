import { useEffect } from 'react';
import UserListItem from './UserListItem.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { userList, fetchUsers } from '../state/appManagerSlice';

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(userList);

  useEffect(() => { dispatch(fetchUsers())}, []);

  return (
      <div style={{marginTop: '20px'}}>
      {users.map((userObj) => <UserListItem key={userObj.id} userObj={userObj} />)}
      </div>
    );
}