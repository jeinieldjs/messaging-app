import React, { useContext } from 'react';
import SessionContext from "../contexts/SessionContext";
import SideNav from "./Sidenav";

const Main = () => {
    
    const { session, setSession } = useContext(SessionContext)
    const logout = (e) => {
        e.preventDefault();
        setSession(null)
        localStorage.setItem('chat', JSON.stringify(null))
    }
    return (
        <>
           <SideNav />
           <div className='bottom-nav'>
                <button className='bottom-btn'><i className='fas fa-sign-out-alt' style={{color: '#eaebea'}} onClick={logout}></i>Logout</button>
            </div>
        </>
    )
}

export default Main;