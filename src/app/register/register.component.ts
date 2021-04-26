import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSignedIn = false;
  public accountErrorMessage: string | undefined;
  constructor(public firebaseService: FirebaseService) { }


  // tslint:disable-next-line:typedef
  ngOnInit(){
    // @ts-ignore
    if (localStorage.getItem('user' !== null)){
      this.isSignedIn = true;
    }
    else{
      this.isSignedIn = false;
    }
  }

}
