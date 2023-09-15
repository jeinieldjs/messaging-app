import React, { useState, useContext } from 'react';
import '../App.css';
import SessionContext from '../contexts/SessionContext';
import Users from './Users.jsx';
import CreateChannel from './CreateChannel';
import { ChannelDisplay } from './CreateChannel';
import { UserLogo } from './HeaderLogo';

const Sidenav = (props) => {
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
   const {channels, setChannels} = props

return (
    <>
        <div className='sidenav'>
            <div className='logged-user-container'>
                <h3 id='logged-user-line'><UserLogo />{loggedEmail}</h3>
            </div>
            <div className='channel-container'>
                <h1 className='sidenav-label'>
                Channels</h1>
                <div className='channel-list-container'>
                    <ChannelDisplay channels={channels} setChannels={setChannels}/>
                    <CreateChannel channels={channels} setChannels={setChannels}/>
                </div>
            </div>
           
            <div className='dm-container'>
                <h1 className='sidenav-label'> Direct Messages</h1>
                <div className='search-bar'>
                  <input type='text' placeholder='Search Users' id='user-search' value={searchQuery} onChange={handleSearchChange} />
                </div>
                 <div className="user-list-container">
                     <Users searchQuery={searchQuery} />
                 </div>
            </div>
            <div className='logout-container'>
                <button className='bottom-btn'>
                    <i className='fas fa-sign-out-alt' style={{color: '#0c0e0c'}} onClick={logout}></i>Logout
                </button>
            </div>
        </div>
    </>
)
}

export default Sidenav