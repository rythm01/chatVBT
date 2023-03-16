import React from 'react';
import '../CSS/SidebarChat.css';
import { Avatar } from '@mui/material';
import instance from '../Utils/axios';

function SidebarChat({ name, profilePhoto, select, lastMessage, timeStamp }) {
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className='sidebarChat' onClick={() => {select(name);}}>
      <Avatar />
      <div className="sidebarChatInfo">
        <h2>{name}</h2>
        <p>{name}: {truncate(lastMessage, 15)}</p>
      </div>
      <div className="timeStamp">
        <p>{timeStamp}</p>
      </div>
    </div>
  );
};

export default SidebarChat;