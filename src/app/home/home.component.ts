import { Component, OnInit } from '@angular/core';
import { PushService } from '../push.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

recievedMessage:string;
messages: string[] = [];

  constructor( private pushService:PushService) {
      this.pushService.channel.bind('my-event', (message) => {
      console.log(message);
      this.recievedMessage = message.message;
      this.messages.push(message.message)
      console.log(this.recievedMessage)
    });
   }

message:string;
  ngOnInit() {



  }
  sendMessage(){
    console.log(this.message)
    let txtMessage = {
      message: this.message

    }
    this.pushService.pushTrigger(txtMessage).subscribe(data=>{

      console.log(data)

    })
  }

}
