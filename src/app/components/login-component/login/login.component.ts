import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EMAIL, PASSWORD } from 'src/app/constants/api-constants';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * LoginComponent class is used to
 * enable user login to the movies app 
 */
export class LoginComponent implements OnInit {
  title:string='Sign In';
  signInForm:any;
  submitClicked:boolean=false;
  invalidUserName:boolean=false;
  invalidPassword:boolean=false;
  successfulRegistration:boolean=false;
  message:string = '';
  newUserEmail:any='';
  newUserPassword:any='';
  constructor(private route:Router,private service:LoginService) { }

  ngOnInit(): void {
      this.onLogIn();
  }

  /**
   * onLogIn() sets the 
   * login form
   */
  onLogIn(){
    this.title = 'Sign In';
    localStorage.setItem('successful','N');
    this.signInForm = new FormGroup({
      'username': new FormControl(null,[Validators.required]),
      'password' : new FormControl(null,Validators.required)
    });
    this.signInForm.setValue({'username':"",'password':""});
  }

  /**
   * onSignUp() navigates to
   * signup page for the user
   * to register
   */
  onSignUp(){
    this.route.navigate(['/signup']);
  }

  /**
   * onSubmit() submits
   * the login details.
   * On successful login,
   * it lands to movies page,
   * else it will show errors
   */
  onSubmit(){
    console.log(this.signInForm);
    this.submitClicked=true;
    this.service.setLoggedIn(false);
    //Login with signup user details
      this.newUserEmail = localStorage.getItem('email');
      this.newUserPassword = localStorage.getItem('password');
      this.invalidUserName=false;
      this.invalidPassword=false;
      if(this.signInForm.value.username===this.newUserEmail && this.signInForm.value.password===this.newUserPassword){
        this.invalidUserName=false;
        this.invalidPassword=false;
        this.service.setLoggedIn(true);
        this.route.navigate(['/movies-home']);
      }else if(this.signInForm.value.username!==this.newUserEmail && this.signInForm.value.username){
        this.invalidUserName=true;
        this.invalidPassword=false;
      }else if(this.signInForm.value.password!==this.newUserPassword && this.signInForm.value.password){
        this.invalidPassword=true;
        this.invalidUserName=false;
      }

      //Login with default user details
      if(this.signInForm.value.username===EMAIL && this.signInForm.value.password===PASSWORD){
        this.invalidUserName=false;
        this.invalidPassword=false;
        this.service.setLoggedIn(true);
        this.route.navigate(['/movies-home']);
      }else if(this.signInForm.value.username!==EMAIL && this.signInForm.value.username && this.signInForm.value.username !== this.newUserEmail){
        this.invalidUserName=true;
        this.invalidPassword=false;
      }else if(this.signInForm.value.password!==PASSWORD && this.signInForm.value.password && this.signInForm.value.password !== this.newUserPassword){
        this.invalidPassword=true;
        this.invalidUserName=false;
      }
  }

}
