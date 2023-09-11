import React, { useState, useContext, useEffect } from 'react';
import SessionContext from '../contexts/SessionContext';
import ChatContext from '../contexts/ChatContext';


const Users = () => {
  const { session } = useContext(SessionContext);
  const { chat, setChat } = useContext(ChatContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const endpoint = 'http://206.189.91.54/api/v1/users';
    const method = 'GET';
    const headers = {
      'Content-Type': 'application/json',
      'access-token': session.accessToken,
      'client': session.client,
      'expiry': session.expiry,
      'uid': session.uid
    };

    const response = await fetch(endpoint, { method, headers });
    const result = await response.json();

    setUsers(result.data.sort((a, b) => { return a.uid < b.uid ? -1 : 1 }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectUser = (event) => {
    setChat({
      id: event.target.getAttribute('data-id'),
      name: event.target.getAttribute('data-name'),
      type: event.target.getAttribute('data-type')
    });
  };

  return (
    <>
      <ul className='users-list'>
        {users && users.map(user => {
          return (
            <li key={user.id}>
              <a href='#' data-id={user.id} data-name={user.uid} data-type={'User'} onClick={selectUser}>{user.uid}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Users;