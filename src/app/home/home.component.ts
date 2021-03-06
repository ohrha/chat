import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { PushService } from '../push.service';
import { SwPush } from '@angular/service-worker';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  recievedMessage: string;
  VAPID_PUBLIC_KEY: string;
  messages: string[] = [];
  msgSent: boolean = false;
  loginHome:boolean = true;

  constructor(private pushService: PushService, private swPush: SwPush, private configservice: ConfigService, public userservice:UserService) {
    
    this.pushService.channel.bind('my-event', (message) => {
      console.log(message);
      console.log(this.msgSent)
      this.recievedMessage = message.message;
      this.messages.push(message.message)

      let pushSubscription = JSON.parse(localStorage.getItem('pushsubscription'));

      if (!this.msgSent) {
        this.pushService.newMessage(pushSubscription).subscribe(data => {

          console.log(data)
          this.msgSent = false;
        })
      }else{
        this.msgSent = false;
      }


      console.log(this.recievedMessage)
    });
  }

  message: string;
  ngOnInit() {

  }
  
  sendMessage() {
    console.log(this.message)
    let pushSubscription = JSON.parse(localStorage.getItem('pushsubscription'));
    this.msgSent = true;
    let txtMessage = {
      message: this.message,
      pushsubscription: pushSubscription

    }

    this.pushService.pushTrigger(txtMessage).subscribe(data => {

      console.log(data)
      if (data.success) {
 
      }

    })
  }

}
