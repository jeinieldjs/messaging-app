import React, { useContext } from 'react';
import SessionContext from '../contexts/SessionContext';
import SideNav from './Sidenav';
import ChatField from './ChatField';

const Main = () => {
 
    return (
        <>
           <SideNav />
           <ChatField />
        </>
    )
}

export default Main;