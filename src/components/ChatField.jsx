import React, { useState, useContext, useEffect, useRef } from 'react';
import '../App.css';
import SessionContext from '../contexts/SessionContext';
import ChatContext from '../contexts/ChatContext';
import { MessageContext } from '../contexts/MessageContext';


const ChatTitle = ({receiverName}) => {
    
    return (
        <div className='chat-title'>
            <h1 className='chat-label'>{receiverName}</h1>
         </div>
    )
}

const MessageDisplay = () => {
    const { session } = useContext(SessionContext);
    const { chat } = useContext(ChatContext);
    const { messages, setMessages } = useContext(MessageContext);
    const [toggleMessage, setToggleMessage] = useState(false);
    const scrollRef = useRef(null);

    const fetchMessages = () => {
        const endpoint = `http://206.189.91.54/api/v1/messages?receiver_id=${chat.id}&receiver_class=${chat.type}`;
        const method = 'GET';
        const headers = {
            'Content-Type': 'application/json',
            'access-token': session.accessToken,
            'client': session.client,
            'expiry': session.expiry,
            'uid': session.uid,    
    };

    fetch(endpoint, { method, headers })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((result) => {
        setMessages(result.data);
      })
      .catch((error) => {
        console.log('Error');
      });
  };

    useEffect(() => {
        chat && fetchMessages();
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
  }, [messages, toggleMessage]);

    return (
       <div>
        <main>
            <div>
                 <div id = 'message-container' ref={scrollRef}>
                {messages && messages.map((message, index) => {
                    const initial = (JSON.stringify(message.sender.email)[1]).toUpperCase();
                    return (
                        <div className='message' key={'message_' + message.id}>
                            <div className='sender-details'>
                                <div className='initial-container'>
                                    <span className='user-initial'>{initial}</span>
                                </div>
                                <div className='right-side-deets'>
                                    <div className='sender-eadd'>
                                        {message.sender.email}
                                    </div>
                                    <div className='message-time'>
                                        {(new Date(message.created_at)).toLocaleString()}
                                    </div>
                                </div>
                            </div>    
                            <div className= 'actual-message'>
                                {message.body}
                            </div>
                        </div>
        
                    );
             })}
            </div>
        </div>
      </main>
      <div>
        <SendMessage toggleMessage={toggleMessage} setToggleMessage={setToggleMessage} />
      </div>
    </div>
    );
}

const SendMessage =(props) => {
    
    const {session} = useContext(SessionContext);
    const {chat} = useContext(ChatContext); 
    const [message, setMessage] = useState('');
    const { toggleMessage, setToggleMessage } = props;

    const sendMessage = (event) => {
        event.preventDefault();
        const endpoint = 'http://206.189.91.54/api/v1/messages';
        const method = 'POST';
        const headers = {
            'Content-Type': 'application/json',
            'access-token': session.accessToken,
            'client': session.client,
            'expiry': session.expiry,
            'uid': session.uid  
        };
        const body = JSON.stringify({
            receiver_id: chat.id, 
            receiver_class: chat.type,
            body: message

        });
        fetch(endpoint, {method, headers, body})
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log('failed');
                }
            })
            .then((data) => {
                console.log('message sent');
                console.log(data.data[0]);
                setToggleMessage(!toggleMessage);
                setMessage('');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleInputChange = (event) => {
        setMessage(event.target.value);
      };
    

    return (
        <div className='text-field'>
                <textarea 
                    className='chat-input' 
                    rows='5' 
                    cols='50'
                    value={message}
                    onChange={handleInputChange}> 
                </textarea>
                <button 
                    id='submit-chat' 
                    onClick={sendMessage} 
                    disabled={!message || message.length === 0}>
                <i className="fas fa-paper-plane" style={{color: '#eaebea'}}></i>SEND
                </button>
        </div>
    )

    }
        
const ChatField = () => {
    const {session} = useContext(SessionContext);
    const {messages,setMessages} = useContext(MessageContext);
    const [toggleMessage, setToggleMessage] = useState(false);
    const {chat} = useContext(ChatContext); 
    const scrollRef = useRef(null);
    
    return (
        <>
            <ChatTitle receiverName={chat.name}/>
            <MessageDisplay />
            <SendMessage />
            
        </>
    )
}

export default ChatField;