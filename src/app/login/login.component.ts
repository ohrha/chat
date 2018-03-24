import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string ="";
  passWord:string = "";
  errorMsg:string = "";
  loginSuccessful:boolean = false;
  loginFailed:boolean = false;
  loginHome:boolean = true;
  constructor( private userService:UserService, private router: Router) { }

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
      console.log(data.token)
      if(data.success){

        this.userService.storeUserData(data.token,data.user);
        this.loginHome = false;
        this.loginSuccessful = true;
        setTimeout(()=>{

          this.loginSuccessful = false;
          this.loginHome = true;

        },4000);
        
                 setTimeout(() => {

            this.router.navigate(['/']);


          }, 3000);

      }else{
        this.loginHome = false;
        this.loginFailed = true;
        this.errorMsg = data.message;
        setTimeout(()=>{

          this.loginHome = true;
          this.loginFailed = false;

        },4000)
      }
      

    })
}
 
}
