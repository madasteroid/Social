import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserPageComponent} from './user-page/user-page.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {FirebaseGuard} from './services/firebase.guard';
import {VerifyemailaddressComponent} from './verifyemailaddress/verifyemailaddress.component';


const routes: Routes = [
  {path: 'user', component: UserPageComponent, canActivate: [FirebaseGuard]},
  {path: '', redirectTo: '/landing', pathMatch: 'full' },
  {path: 'landing', component: LandingPageComponent},
  {path: 'verifyemailaddress', component: VerifyemailaddressComponent},
  {path: 'login', component: LoginComponent, },
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
