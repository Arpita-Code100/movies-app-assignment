import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login-component/login/login.component';
import { MoviesHomeComponent } from './components/movies-home-component/movies-home/movies-home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginCanActivateGuard } from './guards/login-can-activate.guard';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'signup',
    component: SignupComponent,
  },
  {
    path:'movies-home',
    component: MoviesHomeComponent,
    canActivate: [LoginCanActivateGuard]
  },
  {
    path:'error',
    component: ErrorComponent,
  },
  {
    path:'**',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
