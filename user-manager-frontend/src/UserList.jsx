import { useEffect } from 'react';
import UserListItem from './UserListItem.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { userList, fetchUsers } from './appManagerSlice';

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(userList);

  useEffect(() => { dispatch(fetchUsers())}, []);

  return (
      <>
      {users.map((userObj) => <UserListItem key={userObj.id} userObj={userObj} />)}
      </>
    );
}