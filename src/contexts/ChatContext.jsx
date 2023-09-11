import React, { useState, useEffect } from 'react';

export const usePersistedChat = (value) => {
  const [chat, setChat] = useState(() => {
    const persistedChat = JSON.parse(localStorage.getItem('chat') || 'null');

    return persistedChat || value;
  });

  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(chat));
  }, [chat]);

  return [chat, setChat];
};

const ChatContext = React.createContext({});

export default ChatContext;
