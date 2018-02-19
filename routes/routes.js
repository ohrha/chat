const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '475223',
    key: 'f756d847238c8314427d',
    secret: 'e2ca54fbf0cf6129e3b2',
    cluster: 'us2',
    encrypted: true
});



router.post('/', (req, res) => {

console.log(req.body.message)
    pusher.trigger('my-channel', 'my-event', {
        "message": req.body.message
    });
    res.json({success: true, message: "Message Recieved..."})
})

module.exports = router;