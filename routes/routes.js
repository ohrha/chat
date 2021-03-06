const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const webpush = require('web-push');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const ChatUser = require('../models/chatuser');

const vapidKeys = {
    publicKey: "BGgWbdrI76rpqXQXmgTGWsnYHCj0lXGfkpNp8up0TeVZBXuecerKE55gqKayH8soWE7aioU1MheuEZXFsp-hkIs",
    privateKey: "E8gzdDWmSHEXLrgyqs2oJGovtJbLMHydFnubfVcElT4"


}
const pushSubscriptions = [];
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
var pusher = new Pusher({
    appId: '475223',
    key: 'f756d847238c8314427d',
    secret: 'e2ca54fbf0cf6129e3b2',
    cluster: 'us2',
    encrypted: true
});

router.post('/newuser', (req, res) => {

    let newUser = new ChatUser({

        name: req.body.name,
        password: req.body.password

    })

    ChatUser.findOne({ name: req.body.name }, (err, user) => {

        if (err) throw err;
        if (user) {

            res.json({ success: false, message: "User already exists" })

        } else {
            ChatUser.addUser(newUser, (err, user) => {

                if (err) {
                    res.json({ success: false, message: "User registration failed...", err: err })
                } else {
                    res.json({ success: true, message: "User successfully registered", user })
                }
            })
        }

    })


})
router.post('/authenticate', (req, res) => {

    const username = req.body.name;
    const password = req.body.password;
    console.log(password)
    console.log(username)
    ChatUser.findOne({name:username}, function(err,user) {

        if (err) throw err;
        if (!user) {

            res.json({ success: false, message: "User not found..." })

        } else {
            console.log(user)
            ChatUser.comparePassword(password, user.password, (err, isMatch) => {

                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ data: user }, config.secret, {

                        expiresIn: 604800 //1 week

                    });

                    res.json({
                        success: true, token: 'JWT ' + token, user: {
                            id: user._id,
                            
                            username: user.username
                        

                        }
                    });
                } else {
                    res.json({ success: false, message: 'Wrong Password...',  });
                }

            })
        }

    })
})
router.post('/newmessage', (req, res) => {

    let notificationData = {};

    notificationData.notification = {
        title: "Ohrha",
        icon: "../assets/icon512.png",
        badge: "../assets/icon72.png",
        body: "New Chat Message.",
        requireInteraction: true,
        vibrate: [300, 100, 400],

    }
    sendNotification(req.body.subscription, JSON.stringify(notificationData));



})
router.post('/', (req, res) => {

    console.log(req.body.message)
    pusher.trigger('my-channel', 'my-event', {
        "message": req.body.message
    });
    res.json({ success: true, message: "Message Recieved..." })
})

function sendNotification(pushSubscription, payload) {
    webpush.sendNotification(pushSubscription, payload)
        .then(function (response) {
            if (error) throw err;
            if (response) {
                console.log("pushsent")
            }

        })
}


module.exports = router;