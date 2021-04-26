import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {FirebaseService} from './firebase.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseGuard implements CanActivate {

  constructor(private firebaseService: FirebaseService, private router: Router) {
  }

  // tslint:disable-next-line:max-line-length
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
    // @ts-ignore
    return this.firebaseService.userData
      .pipe(
        map(user => user !== null),
        tap(value => {
          if (!value) {
            this.router.navigateByUrl('/login').then();
            return value;
          } else {
            return value;
          }
        })
      );
  }
}
