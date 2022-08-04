import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

/**
 * SignupComponent class used to register
 * the user details
 */
export class SignupComponent implements OnInit {
  title : string = 'Sign Up';
  signUpForm:any;
  signInForm:any;
  submitClicked:boolean=false;
  invalidUserName:boolean=false;
  invalidPassword:boolean=false;
  successfulRegistration:boolean=false;
  message:string = '';
  newUserEmail:any='';
  newUserPassword:any='';

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null),
      'password' : new FormControl(null)
    });
  }

  /**
   * onSubmit() submits
   * the signup details.
   * On successful signup/registration,
   * the user can login to the movies app,
   * else it will show errors
   */
  onSubmit(){
      this.invalidUserName = false;
      this.invalidPassword = false;
      this.submitClicked = true;
      if(this.signUpForm.value.username===localStorage.getItem('email')){
        this.successfulRegistration=false;
        this.message = "Email Id is already registered!!"
        this.signUpForm.reset();
      }else if(this.signUpForm.value.username && this.signUpForm.value.password){
          localStorage.setItem('email',this.signUpForm.value.username);
          localStorage.setItem('password',this.signUpForm.value.password);
          this.successfulRegistration=true;
          this.message = "Registration is successful !!"
          this.signUpForm.reset();
      }else{
        this.successfulRegistration=false;
        this.message = "Please enter values to Sign Up!!"
      }
    }

  /**
   * onLogIn() user can navigate to
   * login component
   */
  onLogIn(){
    this.route.navigate(['/login']);
  }

}
