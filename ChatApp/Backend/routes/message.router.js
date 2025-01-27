const User =  require('../models/user.model');
const Message = require('../models/message.model');
const express = require('express');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/allusers',  auth, async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const users = await User.find({ _id: { $ne: currentUserId } });
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/allmessages/:id', auth, async (req, res) => {
    try {
        const currentUserId = req.user._id;
        otherUser  = req.params.id;
        const messages = await Message.find(
            { $or:
                [
                    { currentUserId: currentUserId, otherUser: otherUser },
                    { currentUserId: otherUser, otherUser: currentUserId }
                ] 
            }
        );
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/sendmessage/:id', auth, async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const otherUser = req.params.id;
        const { message, image } = req.body;

        let imageURL
        if(image) {
            uploadResponse = await cloudinary.uploader.upload(image)
            imageURL = uploadResponse.url
        }

        const newMessage = new Message({
            currentUserId,
            otherUser,
            message,
            image: imageURL
        });
        newMessage.save();
        res.status(201).json(newMessage);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
