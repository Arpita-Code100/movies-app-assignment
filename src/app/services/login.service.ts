import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn : boolean = false;
  constructor() { }

  setLoggedIn(isLoginSuccessful:boolean){
    this.isLoggedIn = isLoginSuccessful;
  }

  getLoggedIn(){
    return this.isLoggedIn;
  }


}
