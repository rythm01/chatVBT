const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const verifyToken = require('../MiddleWare/auth');

router.post('/', async (req, res) => {
    const num = req.body;
    const user = new User(num);
    try {
        const foundUser = await User.findOne({ phoneNumber: num.phoneNumber });
        if (foundUser) {
            const token = jwt.sign(
                { id: foundUser._id, phoneNumber: foundUser.phoneNumber },
                process.env.TOKEN_KEY
            );
            res.status(200).send({ "message": "User Already exists", "token": token })
        } else {
            const userNum = await user.save();
            const token = jwt.sign(
                { id: userNum._id, phoneNumber: userNum.phoneNumber },
                process.env.TOKEN_KEY
            );
            res.status(200).send({ "message": "Successfully Registered", "token": token });
        }
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

router.post('/profile', verifyToken, async (req, res) => {
    const profileData = req.body;
    const phoneNum = req.user.phoneNumber;
    try {
        const foundUser = await User.findOne({ phoneNumber: phoneNum });
        if (foundUser) {
            try {
                const updateUser = await User.updateOne({ phoneNumber: phoneNum }, { name: profileData.name, description: profileData.description, profilePhoto: profileData.profilePhoto });
                res.status(200).send({ "message": "Profile Updated Successfully" });
            } catch (error) {
                res.status(500).send({ error: err });
            }
        }
    } catch (err) {
        res.status(500).send({ error: err });
    }
})

router.get('/chat', verifyToken, async (req, res) => {
    const phoneNum = req.user.phoneNumber;
    try {
        const findOtherUser = await User.find({ phoneNumber: { $ne: phoneNum } }, { phoneNumber: 1,name: 1, profilePhoto: 1, description: 1 });
        const myDetails = await User.findOne({ phoneNumber: phoneNum })
        res.status(200).send({ "contacts": findOtherUser, "info": myDetails });
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

module.exports = router;

// router.post('/chatting', verifyToken, async (req, res) => {
//     const {myName, name, chatterPhoneNumber, chatting} = req.body;
//     console.log(myName);
//     console.log(chatterPhoneNumber);
//     const phoneNum = req.user.phoneNumber;
//     // This will save data in my object
//     try {
//         const foundUser1 = await User.findOne({ phoneNumber: phoneNum, 'chats.name': name });
//         const foundUser2 = await User.findOne({ phoneNumber: chatterPhoneNumber, 'chats.name': myName });
//         if (foundUser1 && foundUser2) {
//             // Here $ in chats.$.chatting represents the index of chats.name:name.
//             const messageData1 = await User.updateOne({phoneNumber: phoneNum, 'chats.name': name}, {$push: {'chats.$.chatting': chatting}});
//             const messageData2 = await User.updateOne({phoneNumber: phoneNum, 'chats.name': name}, {$push: {'chats.$.chatting': chatting}});
//             res.status(200).send({ "message": "The message is stored successfully"});
//         }
//         else {
//             const addUserInChat1 = await User.updateOne({phoneNumber: phoneNum}, {$push: {chats: {name: name, chatting: [chatting]}}});
//             const addUserInChat2 = await User.updateOne({phoneNumber: chatterPhoneNumber}, {$push: {chats: {name: myName, chatting: [chatting]}}});
//             res.status(200).send({ "message": "The message is stored successfully"});
//         }
//     } catch (err) {
//         res.status(500).send({ error: err });
//     }
// });

// router.post('/sidebarChat', verifyToken, async (req, res) => {
//     const chat = req.body;
//     console.log(chat);
//     const phoneNum = req.user.phoneNumber;
//     try {
//         // const foundUser = await User.findOne({ phoneNumber: num.phoneNumber,  });
//         // const updateUser = await User.updateOne({phoneNumber: phoneNum}, {$push: {chats: chat}})
//     } catch (err) {
//         res.status(500).send({ error: err });
//     }
// });

// router.post('/chat', async (req, res) => {
//     const phoneNum = /req.user.phoneNumber ||/ '+919408257927';
//     const chatMessages = {
//         name: "Mom",
//         chatting: [
//             {
//                 message: "hi Rishi",
//                 name: "Mom",
//                 timeStamp: "9:8 pm",
//                 received: false
//             },
//             {
//                 message: "Hi mom",
//                 name: "Rishabh",
//                 timeStamp: "9:9 pm",
//                 received: true
//             }
//         ]
//     }
//     try {
//         const foundUser = await User.updateOne({ phoneNumber: phoneNum }, { $push: { chats: chatMessages } });
//         res.status(200).send({"message": "Successfully updated", "data": foundUser});
//     } catch (error) {
//         res.status(500).send({ error: error });
//     }
// });