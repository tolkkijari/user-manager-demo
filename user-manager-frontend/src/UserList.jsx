import React from 'react';
import UserItem from './UserItem.jsx'
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { allUsers } from './usersSlice';

export default function UserList() {
  const users = useSelector(allUsers);

  return (
      <>
      {users.map((userObj) => <UserItem key={userObj.id} id={userObj.id} />)}
      </>
    );
}