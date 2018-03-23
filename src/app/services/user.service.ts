import { Injectable } from '@angular/core';
import { Headers, Http, } from '@angular/http';
import 'rxjs/add/operator/map';  //OBSERVABLE

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  authenticate(userdetails){

    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post('/authenticate',userdetails ,{headers:headers})
    .map(res => res.json())
  }
  newUser(userdetails){

    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post('/newuser', userdetails, {headers:headers})
    .map(res => res.json())


  }

}
