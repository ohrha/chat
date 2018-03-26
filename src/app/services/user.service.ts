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
  loggedIn(){

    if(localStorage.getItem('id_token')){

      return true

    }
    return false

  }
  newUser(userdetails){

    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post('routes/newuser', userdetails, {headers:headers})
    .map(res => res.json())


  }
    storeUserData(token, user) {

    localStorage.setItem('id_token', token); //WHEN ANGULAR JWT VALIDATES THE TOKEN IT LOOKS FOR A PROPERTY NAMED...'ID_TOKEN""
    //localStorage.setItem('user', JSON.stringify(user));
   // this.authToken = token;
    //this.user = user;
  }

}
