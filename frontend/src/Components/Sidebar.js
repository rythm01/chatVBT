import React, { useState } from 'react';
import '../CSS/Sidebar.css';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import SidebarChat from './SidebarChat';

function Sidebar({ contacts, info, onSelected }) {
    const [newChatClick, setNewChatClick] = useState(false);
    const [menuClick, setMenuClick] = useState(false);

    return (
        <div className='sidebar'>
            <div className="sidebarHeader">
                <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-y13RSYAVKrHz7U4RTMdYBkTWbAFFF2_15g&usqp=CAU' style={{ cursor: "pointer" }} />
                <div className="sidebarHeaderRight">
                    <span>
                        <IconButton>
                            <DonutLargeOutlinedIcon />
                        </IconButton>
                    </span>
                    <span onClick={() => { setNewChatClick(!newChatClick) }} className='icons'>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>
                    </span>
                    <div className={`sidebarHeaderDropdown contact ${newChatClick && 'show'}`}>
                        <ul className='sidebarList'>
                            {contacts.map((contact, index) => {
                                return (
                                    <li key={index} className='sidebarListItem' onClick={() => { onSelected(contact.name) }}><Avatar /><h4>{contact.name}</h4></li>
                                );
                            })}
                        </ul>
                    </div>
                    <span onClick={() => { setMenuClick(!menuClick) }} className='icons'>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </span>
                    <div className={`sidebarHeaderDropdown menu ${menuClick && 'show'}`} >
                        <ul className='sidebarList'>
                            <li className='sidebarListItem menuItem'>New Group</li>
                            <li className='sidebarListItem menuItem'>Log-Out</li>
                        </ul>
                    </div> 
                </div>
            </div>
            <div className="sidebarSearch">
                <div className="sidebarSearchContainer">
                    <SearchIcon />
                    <input type="text" placeholder='Search or Start a new Chat' />
                </div>
            </div>

            <div className="sidebarChats">
                {contacts.map((contact, index) => {
                    let lastMess, timeStamp, name;
                    if (info.chats.length === 0) {
                        name = "";
                    }
                    else {
                        info.chats.map((chat) => {
                            if (contact.name === chat.name) {
                                name = chat.name;
                                chat.chatting.map((lastMessage, index) => {
                                    if (index === chat.chatting.length - 1) {
                                        lastMess = lastMessage.message;
                                        timeStamp = lastMessage.timeStamp;
                                    }
                                    return null;
                                });
                                return null;
                            }
                            return null;
                        });
                    }
                    return name === "" ? <div style={{ position: 'relative', top: "10px" }} key={index}><h2 style={{ textAlign: "center" }}>Start a new Conversation</h2></div> : <SidebarChat name={name} profilePhoto={contact.profilePhoto} select={onSelected} lastMessage={lastMess} timeStamp={timeStamp} key={index} />;
                })}
            </div>
        </div>
    );
};

export default Sidebar;