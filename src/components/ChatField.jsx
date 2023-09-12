import React from 'react';
import '../App.css';

const ChatTitle = () => {
    
    return (
        <div className='chat-title'>
            <h1 className='chat-label'>*Name of channel or kachat*</h1>
        </div>
    )
}

const ChatField = () => {
    
    return (
        <>
            <ChatTitle />
            <div className='text-field'>
                <textarea className='chat-input' rows='5' cols='50'> </textarea>
                <button id='submit-chat'><i className="fas fa-paper-plane" style={{color: '#eaebea'}}></i></button>
            </div>
        </>
    )
}

export default ChatField;