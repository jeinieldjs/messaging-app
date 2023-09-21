import React, { useState, useContext, useEffect } from 'react';
import SessionContext from '../contexts/SessionContext';
import ChatContext from '../contexts/ChatContext';
import '../App.css';


const Users = ({ searchQuery }) => {
  const { session } = useContext(SessionContext);
  const { chat, setChat } = useContext(ChatContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchUsers = async () => {
    try {
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

      const sortedUsers = result.data.sort((a, b) => (a.uid < b.uid ? -1 : 1));
      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users); 
    } else {
      const filtered = users.filter((user) =>
        user.uid.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  return (
    <>
     {loading ? (
        <p style={{
          color: 'black', 
          textAlign: 'center', 
          fontWeight: 'bold'}}>
            Loading users...</p>
      ) : (
      <ul className='users-list'>
        {filteredUsers.map((user) => (
          <li key={user.id} className='indiv-users'>
            <a
              href='#'
              data-id={user.id}
              data-name={user.uid}
              data-type={'User'}
              onClick={selectUser}
            >
              {user.uid}
            </a>
          </li>
        ))}
      </ul>
      )}
    </>
  );
};

export default Users;