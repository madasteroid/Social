import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {PostService} from '../services/post.service';
import {Users} from '../models/user';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {Post} from '../models/post';
import {FileService} from '../services/file.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {switchMap} from 'rxjs/operators';
import {FileMetaData} from '../models/file-metadata';



@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  // @ts-ignore
  postFileUrl: string;
  // @ts-ignore
  postFileId: string;
  // @ts-ignore
  fileToUpload: File;
  // @ts-ignore
  text: string;
  // @ts-ignore
  user: Users;
  subs: Subscription[] = [];
  posts: Post[] = [];
  // @ts-ignore
  ppid: string;
  @Output() isLogout = new EventEmitter<void>();
  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  constructor(public firebaseService: FirebaseService, public postService: PostService, private fileservice: FileService, private storage: AngularFireStorage) {
  }

  // tslint:disable-next-line:typedef
  async ngOnInit(): Promise<void> {
    // Need to push current user to view the user in nav bar
    this.subs.push(this.firebaseService.CurrentUser().subscribe(user => {
      this.user = user;
    }));

    this.subs.push(this.postService.getCurrentUserPosts().subscribe(posts => {
      this.posts = posts;
    }));
    this.subs.push(this.fileservice.getProfilePictureIdForUserPage().subscribe(id => {
      this.ppid = id['0'].id;
      this.storage.ref('profilePictures/' + this.ppid)
        .getDownloadURL().subscribe(url => {
        this.user.photoUrl = url;
      });
    }));
  }

  postMessage(form: NgForm): void {
    this.fileservice.uploadPostFile(this.fileToUpload).subscribe(metadata => {
      // @ts-ignore
      this.postFileId = metadata.id;
      return this.storage.ref('postFiles/' + this.postFileId)
        .getDownloadURL().subscribe(url => {
          this.postFileUrl = url;
        });
    });
    const {message} = form.value;
    this.postService.postMessage(message,
      `${this.user.email}`,
      `${this.user.uid}`, {},
      `${this.user.photoUrl}`,
      `${this.postFileUrl}`
    );
    form.resetForm();
  }

  // tslint:disable-next-line:typedef
  deletePostUser(post: Post): Promise<void> {
    // @ts-ignore
    return this.postService.deletePost(post.id);
  }
  // @ts-ignore
  // tslint:disable-next-line:typedef
  Search() {
    if (this.text !== '') {
      this.subs.push(this.postService.getAllPosts().subscribe(() => {
          this.posts = this.posts.filter(res => {
            return res.message.toLowerCase().match(this.text.toLowerCase());
          });
        })
      );
    } else if (this.text === '') {
      return this.ngOnInit();
    }
  }


  // @ts-ignore
  // tslint:disable-next-line:typedef
  upload(event) {
    const file = event.target.files[0];
    this.fileservice.upload(file).subscribe();
  }
  // @ts-ignore
  // tslint:disable-next-line:typedef
  uploadPostFile(event) {
    this.fileToUpload = event.target.files[0];
  }

}
