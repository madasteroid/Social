import { Component, OnInit, HostListener } from '@angular/core';
import {PostService} from '../services/post.service';
import {Subscription} from 'rxjs';
import {FirebaseService} from '../services/firebase.service';
import {Post} from '../models/post';
import {Users} from '../models/user';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  // @ts-ignore
  text: string;
  posts: Post[] = [];
  subs: Subscription[] = [];
  constructor(private postService: PostService, private firebaseService: FirebaseService) {
  }
  // tslint:disable-next-line:typedef
  async ngOnInit(): Promise<void> {
    this.subs.push(this.postService.getAllPosts().subscribe(async (posts) => {
      this.posts = posts;
    }));
  }

  @HostListener('window:resize')
  // tslint:disable-next-line:typedef
  onWindowResize() {
  }
  // @ts-ignore
  // tslint:disable-next-line:typedef
  Search(){
    if (this.text !== ''){
      this.subs.push(this.postService.getAllPosts().subscribe(() => {
          this.posts = this.posts.filter(res => {
            return res.message.toLowerCase().match(this.text.toLowerCase()) || res.ownerName.toLowerCase().match(this.text.toLowerCase());
          });
        })
      );
    } else if ( this.text === ''){
      return this.ngOnInit();
    }
  }
}

