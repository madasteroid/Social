import {Component, OnInit, Provider} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // @ts-ignore
  constructor(public firebaseService: FirebaseService, private router: Router) {
  }

  isSignedIn = false;
  public accountErrorMessage: string | undefined;

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // @ts-ignore
    if (localStorage.getItem('user' !== null)){
      this.isSignedIn = true;
    }
    else{
      this.isSignedIn = false;
    }
  }

  // tslint:disable-next-line:typedef
  logInUser(email: string, password: string) {
    this.firebaseService.login(email, password).then(() => {
        this.router.navigate(['user']);
      // tslint:disable-next-line:no-shadowed-variable
    }).catch((error) => {
      this.accountErrorMessage = (error.message).toString();
    });
  }




}
