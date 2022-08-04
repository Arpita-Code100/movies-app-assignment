import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginCanActivateGuard implements CanActivate {

  constructor(private service:LoginService, private route:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let isloggedIn = this.service.getLoggedIn();
    if(isloggedIn) return true;
    else {
      this.route.navigate(['/login']);
      return false;
    };
  }
  
}
