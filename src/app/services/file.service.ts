import { Injectable } from '@angular/core';
import {defer, from, Observable} from 'rxjs';
import {FileMetaData} from '../models/file-metadata';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import firebase from 'firebase';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  posts: Post[] = [];

  constructor(private storage: AngularFireStorage, private AFS: AngularFirestore) {
  }

  upload(file: File): Observable<FileMetaData>{
    return this.addFileMetaData(
      {
        name: file.name,
        type: file.type,
        size: file.size,
        lastChanged: file.lastModified,
        // @ts-ignore
        uid: firebase.auth().currentUser.uid
      }
    ).pipe(
      switchMap( fileMeta => {
        return  defer(() =>
        this.storage.ref('profilePictures/' + fileMeta.id)
          .put(file)
          .then()
        ).pipe(
          map(fileRef => {
            return fileMeta;
          })
        );
      })
    );
  }

  addFileMetaData(meta: FileMetaData): Observable<FileMetaData>{
    return defer( () =>
      this.AFS.collection('files')
        .add(meta)
    ).pipe(
      map(documentRef => {
        meta.id = documentRef.id;
        return meta;
      })
    );
  }

  getProfilePictureIdForUserPage(): Observable<any> {
     // @ts-ignore
    return this.AFS.collection('files', ref => ref.where('uid', '==', firebase.auth().currentUser.uid))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(item => {
            const id = item.payload.doc.id;
            return{
              id
            };
          });
        })
      );
  }

  uploadPostFile(file: File): Observable<FileMetaData>{
    return this.addPostFileMetaData(
      {
        name: file.name,
        type: file.type,
        size: file.size,
        lastChanged: file.lastModified,
        // @ts-ignore
        uid: firebase.auth().currentUser.uid
      }
    ).pipe(
      switchMap( fileMeta => {
        return  defer(() =>
          this.storage.ref('postFiles/' + fileMeta.id)
            .put(file)
            .then()
        ).pipe(
          map(fileRef => {
            return fileMeta;
          })
        );
      })
    );
  }
  addPostFileMetaData(meta: FileMetaData): Observable<FileMetaData>{
    return defer( () =>
      this.AFS.collection('postFiles')
        .add(meta)
    ).pipe(
      map(documentRef => {
        meta.id = documentRef.id;
        return meta;
      })
    );
  }
}
