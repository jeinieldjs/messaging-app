import React from 'react';
import '../App.css';
import ChannelDetails from './GetChannelDetails';

const formatChannelName = (name) => name.replace(/ /g, '-');
export default function ChatTitle({ receiverName, chat }) {
    return (
      <div className="chat-title">
        <h1 className="chat-label">{chat && chat.type === "Channel" ? `#${formatChannelName(chat.name)}`: receiverName}</h1>
        {chat && chat.type === "Channel" ? <ChannelDetails /> : null}
      </div>
    );
  };
  