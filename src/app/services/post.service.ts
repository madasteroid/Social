import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
// @ts-ignore
import firebase from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FirebaseService} from './firebase.service';
import {Users} from '../models/user';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // @ts-ignore
  currentUser: Users;
  // @ts-ignore
  users: Users;

  constructor(private AFS: AngularFirestore, private firebaseAuth: AngularFireAuth, private firebaseService: FirebaseService) {
    this.firebaseService.CurrentUser().subscribe(user => this.currentUser = user);
  }

  getAllPosts(): Observable<any>{
    return this.AFS.collection<any>('posts', ref => ref.orderBy('time', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(item => {
            const id = item.payload.doc.id;
            const data = item.payload.doc.data() as Post;
            return{
              id,
              ...data,
            };
          });
        })
      );
  }
  getCurrentUserPosts(): Observable<any>{
    // @ts-ignore
    return this.AFS.collection<any>('posts', ref => ref.where('uid', '==', firebase.auth().currentUser.uid))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(item => {
            return{
              id: item.payload.doc.id,
              ...item.payload.doc.data(),
            };
          });
        })
      );
  }

  deletePost(id: string): Promise<void> {
    return this.AFS.doc('posts/' + id).delete();
  }

  postMessage(message: string, ownerName: string, uid: string, otherItem: any, profilePictureURL: string, postFileUrl: string): Promise<void>{
     return this.AFS.collection('posts').add({
      message,
      ownerName,
      uid,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      ...otherItem,
       profilePictureURL,
       postFileUrl
    }).then();
  }
}
