import React, { useState } from 'react';
import SessionContext from '../contexts/SessionContext';
import Sidenav from './Sidenav';
import ChatField from './ChatField';
import {MessageContext, MessageObject} from '../contexts/MessageContext';
import ChatContext, {usePersistedChat} from '../contexts/ChatContext';


const Main = () => {
    const [chat, setChat] = usePersistedChat(null);
    const [messages, setMessages] = useState([]);

    return (
        <>
         <ChatContext.Provider value={{ chat, setChat }}>
            <div>
                <div>
                    <div>
                        <MessageContext.Provider value={{ messages, setMessages }}>
                            <Sidenav />
                            {chat ? <ChatField /> : null}
                        </MessageContext.Provider>
                    </div>
                </div>
            </div>
        </ChatContext.Provider>
        </>
    )
}

export default Main;