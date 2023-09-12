import React from 'react';

export const MessageContext = React.createContext(null);

export const MessageObject = {
  id: 0,
  body: '',
  created_at: '',
  sender: {},
  receiver: {},
};

const User = {
  id: 0,
  provider: '',
  uid: '',
  allow_password_change: false,
  email: '',
  created_at: '',
  updated_at: '',
};
