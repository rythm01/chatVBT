import React, { useEffect, useState } from 'react';
import Chatting from '../Components/Chatting';
import Sidebar from '../Components/Sidebar';
import '../CSS/Chat.css'
import instance from '../Utils/axios'
import io from 'socket.io-client';

let socket, messageObj, userContact;

function Chat() {
    const [contacts, setContacts] = useState([]);
    const [info, setInfo] = useState({});
    const [name, setName] = useState("");
    const [click, setClick] = useState(false);
    const [messages, setMessages] = useState([])

    const isNewMessage = (isMessage) => {
        messageObj = isMessage;
        setClick(true);
    };

    useEffect(() => {
        const fetchdata = async () => {
            const request = await instance.get('/chat', { headers: { Authorization: localStorage.getItem('token') } });
            setContacts(request.data.contacts);
            setInfo(request.data.info);
        }
        fetchdata();
    }, []);

    const handleName = (name) => {
        contacts.map((contact, index) => {
            if (contact.name === name) {
                if (info.chats.length === 0) {
                    setMessages([]);
                }
                else {
                    info.chats.map((chat) => {
                        if (chat.name === name) {
                            setMessages(chat.chatting)
                            return null;
                        }
                        return null;
                    });
                }
                userContact = contact;
                return null;
            }
            return null;
        })
        setName(name);
    }

    useEffect(() => {
        const ENDPOINT = 'http://localhost:5000/';
        socket = io(ENDPOINT, {
            cors: {
                origin: "http://localhost:5000",
                credentials: true
            }, transports: ['websocket'],
            auth: localStorage
        });

    }, []);

    useEffect(() => {
        if (click) {
            socket.emit('send_message', messageObj);
            socket.on('receive_message', (result) => {
                if (result.status === "200") {
                    setMessages(prevMess => [...prevMess, result.data.chatting])
                }
                else {
                    // toast
                }
            })
        }
        setClick(false);
    }, [click]);

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    return (
        windowSize.innerWidth > 950 ?
            <div className='chat'>
                <div className='chatBody'>
                    <Sidebar contacts={contacts} info={info} onSelected={handleName} />
                    {name ?
                        <Chatting message={messages} myName={info.name} contact={userContact} newMessage={isNewMessage} />
                        :
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1-2rYdlr--oNd6P_H06MjpS6OzsZkgMzWZQ&usqp=CAU' alt="error" style={{ width: "70%" }} />
                    }
                </div>
            </div>
            :
            <div className="chat">
                <div className="chatBody">
                    
                    {name ?
                        <Chatting message={messages} myName={info.name} contact={userContact} newMessage={isNewMessage} />
                        :
                        <Sidebar contacts={contacts} info={info} onSelected={handleName} />
                    }
                </div>
            </div>
    );
};

export default Chat;

/*
userschema :-
mobile-number, 
image-buffer, 
name-string, 
desc-string, 
chats-arrayofchatschema

chatschema :-
name-string,
chatting-arrayofmessageschema

messgage schema :-
message
timestamp
name
received

chats = [
    {
        name: "Dhyey",
        chatting: [
            {
                message
                timestamp
                name
                received
            },
            {....}
        ]
    },
    {
        name: "Ridham",
        chatting: [
            {
                message
                timestamp
                name
                received
            },
            {....}
        ]
    }
]

*/

/* info.chats.map((chats, index) => {
    if (chats.name === name) {
        let user;
        contacts.map((contact) => {
            if (contact.name === name) {
                user = contact;
                return null;
            }
            return null;
        });
        return <Chatting message={chats.chatting} contact={user} key={index} newMessage={isNewMessage} />
    }
    return null;
}); */