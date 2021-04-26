import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Users} from '../models/user';
import {Router} from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  data: any;
  // tslint:disable-next-line:variable-name
  private _user: Observable<firebase.User>;
  // @ts-ignore
  private currentUser: Users;
  // @ts-ignore
  private currentUser$ = new BehaviorSubject<Users>(null);

  constructor(public firebaseAuth: AngularFireAuth, public AFS: AngularFirestore, private router: Router) {
    // @ts-ignore
    this._user = firebaseAuth.authState;
    // @ts-ignore
    this._user.subscribe(user => {
      if (user) {
        this.AFS.collection<Users>('users')
          .doc<Users>(user.uid)
          .valueChanges()
          .subscribe( currentUser => {
            // @ts-ignore
            this.currentUser = currentUser;
            if (currentUser) {
              this.currentUser$.next(currentUser);
            }
          });
      }
    });
  }

  // tslint:disable-next-line:typedef
  async register(email: string, password: string){
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          // @ts-ignore
          this.updateUserData(result.user)
          this.router.navigate(['user']);
          this.SendVerificationEmail();
          // tslint:disable-next-line:no-shadowed-variable
        }).catch((error) => {
          window.alert(error.message);
        });
  }
  // tslint:disable-next-line:typedef
  async login(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
          this.router.navigate(['user']);
        // @ts-ignore
          this.updateUserData(result.user);
        // tslint:disable-next-line:no-shadowed-variable
      }).catch((error) => {
        window.alert(error.message);
    });
  }

  // tslint:disable-next-line:typedef
  SendVerificationEmail(){
    return this.firebaseAuth.onAuthStateChanged((user) => {
      // @ts-ignore
      user.sendEmailVerification().then(() => {
        this.router.navigate(['verifyemailaddress']);
      });
    });
  }


  // tslint:disable-next-line:typedef
  googleSignin(){
    return this.AuthLogin(new GoogleAuthProvider());
  }
  Logout(): void {
    this.firebaseAuth.signOut().then(res => {
      console.log(res);
      // @ts-ignore
      this.currentUser = null;
      this.currentUser$.next(this.currentUser);
      this.router.navigateByUrl('/login').then();
    });
  }

  // tslint:disable-next-line:typedef
  public updateUserData({uid, email, emailVerified}: Users) {
    const userRef: AngularFirestoreDocument<Users> = this.AFS.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      emailVerified
    };
    return userRef.set(data, {merge: true});
  }
  get userData(): Observable<firebase.User> | undefined{
    return  this._user;
  }

  CurrentUser(): Observable<Users>{
    return this.currentUser$.asObservable();
  }
  // tslint:disable-next-line:typedef
  AuthLogin(provider: firebase.auth.AuthProvider){
    return this.firebaseAuth.signInWithPopup(provider)
      .then((result) => {
          this.router.navigate(['user']);
        // @ts-ignore
          this.updateUserData(result.user);
        // tslint:disable-next-line:no-shadowed-variable
      }).catch((error) => {
        window.alert(error);
      });
  }
}

