import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, public userservice:UserService) { }

  ngOnInit() {
  }
  closeSidebar(){

    document.getElementById('closemenu').click();
  }
  logOut(){

    localStorage.removeItem('id_token')
    setTimeout(()=>{

      this.router.navigate(['/']);
    })
  }

}
