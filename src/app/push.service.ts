declare const Pusher: any;
import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PushService {

  pusher:any;
  channel:any;
  constructor(private http: Http) {
 this.pusher = new Pusher('f756d847238c8314427d', {
      cluster: 'us2',
      encrypted: true
    });
this.channel = this.pusher.subscribe('my-channel');
    
   }

  pushTrigger(message){

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('/routes',message,{headers:headers})
    .map(res=>res.json())

  }
}

