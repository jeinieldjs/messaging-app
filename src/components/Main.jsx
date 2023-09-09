import React, { useState, useContext } from 'react';
import SessionContext from "../contexts/SessionContext";

const Main = () => {
    
    const { session, setSession } = useContext(SessionContext)
    const logout = (e) => {
        e.preventDefault();
        setSession(null)
        localStorage.setItem('chat', JSON.stringify(null))
    }
    return (
        <>
           <div className='bottom-nav'>
                <button className='bottom-btn'><i className='fas fa-home' style={{color: '#eaebea'}} onClick={logout}></i>Logout</button>
            </div>
        </>
    )
}

export default Main;