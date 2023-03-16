const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('./Models/userModel');

const app = express();
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("The database connection is successfull"));

const server = http.createServer(app);
const io = socketIO(server);

let user;
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        // return res.status(403).send({message: "A token is required for authentication"});
        console.log("token req");
        return false;
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        user = decoded;
    } catch (err) {
        // return res.status(401).send({message: "Invalid Token"});
        console.log(err);
        return false;
    }
    
    return next();

}).on('connection', (socket) => {

    socket.on('send_message', async (data) => {
        const phoneNum = user.phoneNumber;
        const {myName, name, chatterPhoneNumber, chatting} = data;
        try {
            const foundUser1 = await User.findOne({ phoneNumber: phoneNum, 'chats.name': name });
            const foundUser2 = await User.findOne({ phoneNumber: chatterPhoneNumber, 'chats.name': myName });
            if (foundUser1 && foundUser2) {
                // Here $ in chats.$.chatting represents the index of chats.name:name.
                const messageData1 = await User.updateOne({phoneNumber: phoneNum, 'chats.name': name}, {$push: {'chats.$.chatting': chatting}});
                const messageData2 = await User.updateOne({phoneNumber: chatterPhoneNumber, 'chats.name': myName}, {$push: {'chats.$.chatting': chatting}});
                if (messageData1 && messageData2) {
                    io.emit('receive_message', {status: "200", data: {chatting: chatting}});
                }
                else {
                    io.emit('receive_message', {status: "500", data: {message: "Server is down!"}});
                }
            }
            else {
                const addUserInChat1 = await User.updateOne({phoneNumber: phoneNum}, {$push: {chats: {name: name, chatting: [chatting]}}});
                const addUserInChat2 = await User.updateOne({phoneNumber: chatterPhoneNumber}, {$push: {chats: {name: myName, chatting: [chatting]}}});
                if (addUserInChat1 && addUserInChat2) {
                    io.emit('receive_message', {status: "200", data: {chatting: chatting}});
                }
                else {
                    io.emit('receive_message', {status: "500", data: {message: "Server is down!"}});
                }
            }
        } catch (err) {
            io.emit('receive_message', {status: "500", data: {message: "Server is down!"}});
        }
    });
});

server.listen(port, () => {
    console.log("The server is listening on the port " + port);
});