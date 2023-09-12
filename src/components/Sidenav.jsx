import React, { useState, useContext } from 'react';
import '../App.css';
import SessionContext from '../contexts/SessionContext';
import Users from './Users.jsx';

const Sidenav = () => {
   const { session, setSession } = useContext(SessionContext)
   const logout = (e) => {
    e.preventDefault();
    setSession(null)
    localStorage.setItem('chat', JSON.stringify(null))
   } 
   const loggedEmail = session.email;
   const [searchQuery, setSearchQuery] = useState('');
   const handleSearchChange = (e) => {
     setSearchQuery(e.target.value);
   }

return (
    <>
        <div className='sidenav'>
            <div className='logged-user-container'>
                <h3><i className='fas fa-user-circle' style={{ color: '#eaebea' }}></i>{loggedEmail}</h3>
            </div>
            <div className='channel-container'>
                <h1 className='sidenav-label'>Channels</h1>
                <span className='add-channel-line'>
                    <button className='add-channel-btn'>
                        <i className='fas fa-plus-square' style={{color: '#eaebea'}}></i>
                    </button>
                    <p>Add Channel</p>
                </span>
            </div>
            <div className='dm-container'>
                <h1 className='sidenav-label'>Direct Messages</h1>
                <div className='search-bar'>
                  <input type='text' placeholder='Search Users' id='user-search' value={searchQuery} onChange={handleSearchChange} />
                </div>
                 <div className="user-list-container">
                     <Users searchQuery={searchQuery} />
                 </div>
            </div>
            <div className='logout-container'>
                <button className='bottom-btn'>
                    <i className='fas fa-sign-out-alt' style={{color: '#eaebea'}} onClick={logout}></i>Logout
                </button>
            </div>
        </div>
    </>
)
}

export default Sidenav