import { Injectable } from '@angular/core';
import { Headers, Http, } from '@angular/http';
import 'rxjs/add/operator/map';  //OBSERVABLE

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  login(userdetails){

    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/authenticate',userdetails ,{headers:headers})
    .map(res => res.json())
  }
  newUser(userdetails){

    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/newuser', userdetails, {headers:headers})
    .map(res => res.json())


  }

}
