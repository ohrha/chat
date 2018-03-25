import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService } from './services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
 
  constructor(private userService:UserService, private router:Router){}
 canActivate(){
   if(localStorage.getItem('id_token')){
        
        return true;

    }
    this.router.navigate(['/login']);
    return false
  } 

        
}
