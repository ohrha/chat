const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const webpush = require('web-push');

const vapidKeys = {
    publicKey: "BGgWbdrI76rpqXQXmgTGWsnYHCj0lXGfkpNp8up0TeVZBXuecerKE55gqKayH8soWE7aioU1MheuEZXFsp-hkIs",
    privateKey:"E8gzdDWmSHEXLrgyqs2oJGovtJbLMHydFnubfVcElT4"


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


router.post('/newmessage', (req,res)=>{

     let notificationData ={};
        notificationData.notification ={
            title: "Ohrha",
            icon:"../assets/icon512.png",
            badge:"../assets/icon72.png",
            body:"New Chat Message.",
            requireInteraction:true,
            vibrate:[300,100,400],

        }
        sendNotification(req.body.subscription,JSON.stringify(notificationData));
        


})
router.post('/', (req, res) => {

console.log(req.body.message)
    pusher.trigger('my-channel', 'my-event', {
        "message": req.body.message
    });
    res.json({success: true, message: "Message Recieved..."})
})

  function sendNotification (pushSubscription, payload) {
    webpush.sendNotification(pushSubscription, payload)
      .then(function (response) {
          if(error)throw err;
          if(response){
              console.log("pushsent")
          }
     
      })
  }
      
  
module.exports = router;