import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-verifyemailaddress',
  templateUrl: './verifyemailaddress.component.html',
  styleUrls: ['./verifyemailaddress.component.css']
})
export class VerifyemailaddressComponent implements OnInit {

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

}
