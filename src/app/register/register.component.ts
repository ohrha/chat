import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName:string ="";
  passWord:string = "";
  constructor(private userService:UserService) { }

  ngOnInit() {
  }
 submitDetails(){

    console.log(this.userName)
    console.log(this.passWord);
    let userDetails = {

      name: this.userName,
      password: this.passWord

    }
    this.userService.newUser(userDetails).subscribe(data=>{

      console.log(data);

    })


  }

}
