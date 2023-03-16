import React, { useState } from 'react';
import '../CSS/Chatting.css'
import { Avatar, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import VideoCallIcon from '@mui/icons-material/VideoCall';
// import AddIcCallIcon from '@mui/icons-material/AddIcCall';
// import instance from '../Utils/axios';
import ScrollToBottom from 'react-scroll-to-bottom';

let messObj;

function Chatting({ message, contact, newMessage, myName }) {
    const date = new Date();
    const hours = date.getHours();
    const hours12 = hours === 12 ? '12' : hours % 12;
    const minutes = date.getMinutes();

    const [input, setInput] = useState("");
    const [isMessage, setClickMessage] = useState(false);

    const handleChange = (e) => {
        if (isMessage === false) {
            setClickMessage(true);
        }
        if (e.target.value === "") {
            setClickMessage(false);
        }
        setInput(e.target.value);
    }

    // const handleSend = (e) => {
    //     e.preventDefault();
    //     instance.post('/chatting', {
    //         myName: myName,
    //         name: contact.name,
    //         chatterPhoneNumber: contact.phoneNumber,
    //         chatting: {
    //             message: input,
    //             name: "Rishabh",
    //             timeStamp: `${hours12}:${minutes} ${hours > 12 ? "pm" : 'am'}`,
    //         }
    //     }, {headers: {Authorization: localStorage.getItem('token')}});
    //     setInput('');
    //     setClickMessage(false);
    //     newMessage(true);
    // }

    const handleSend = (e) => {
        e.preventDefault();
        messObj = {
            myName: myName,
            name: contact.name,
            chatterPhoneNumber: contact.phoneNumber,
            chatting: {
                message: input,
                name: "Rishabh",
                timeStamp: `${hours12}:${minutes} ${hours > 12 ? "pm" : 'am'}`,
            }
        };
        setInput('');
        setClickMessage(false);
        newMessage(messObj);
    }

    return (
        <div className='chatting'>
            <div className="chattingHeader">
                <Avatar style={{ cursor: "pointer" }} />
                <div className="chattingHeaderInfo">
                    <h3>{contact.name}</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chattingHeaderRight">
                    <span onClick={() => {window.location.reload()}}>
                        <IconButton>
                            <ArrowBackIcon />
                        </IconButton>
                    </span>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <ScrollToBottom className="chattingBody">
                <div>
                    {message.map((msg, index) => {
                        return (
                            <div className={`chattingMessage ${msg.name === myName ? "chatSender" : ""}`} key={index}>
                                <span className='chattingPersonName'>{msg.name === myName && "You"}</span>
                                {msg.message}
                                <span className='chattingTimestamp'>{msg.timeStamp}</span>
                            </div>
                        );
                    })}
                </div>
            </ScrollToBottom>


            <div className="chattingFooter">
                <InsertEmoticonIcon />
                <AttachFileIcon />
                <form>
                    <input
                        type="text"
                        value={input}
                        onChange={handleChange}
                        placeholder="Type a message"
                    />
                </form>
                <button onClick={handleSend}>{isMessage ? <SendIcon /> : <KeyboardVoiceIcon />}</button>
            </div>
        </div>
    );
};

export default Chatting;