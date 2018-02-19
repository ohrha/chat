import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ConfigService } from './services/config.service';
import { PushService } from './push.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(private configservice: ConfigService, private swPush: SwPush, private pushService:PushService) {


  }
  title = 'app';
  VAPID_PUBLIC_KEY: string;

  ngOnInit() {
    this.VAPID_PUBLIC_KEY = this.configservice.get('VAPID_PUBLIC_KEY')
    console.log(this.VAPID_PUBLIC_KEY)
        this.swPush.requestSubscription({
      
      serverPublicKey: this.VAPID_PUBLIC_KEY

    }).then(pushSubscription => {
      localStorage.setItem('pushsubscription',JSON.stringify(pushSubscription));
   
      console.log(pushSubscription)
    })

  }
}
