import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string ="";
  passWord:string = "";
  constructor( private userService:UserService) { }

  ngOnInit() {
  }
  login(){

    console.log(this.userName)
    console.log(this.passWord);
    let userDetails = {

      name: this.userName,
      password: this.passWord

    }

    this.userService.login(userDetails).subscribe(data=>{

      console.log(data);

    })
}
 
}
