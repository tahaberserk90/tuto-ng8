import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import {Post} from "./post.model";
import {PostService} from "./post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts:Post[] = [];
  isFetching=false;
  error=null;

  private errorSub:Subscription;

  constructor(private http: HttpClient,private postService:PostService) {}

  ngOnInit() {
    this.errorSub=this.postService.error.subscribe(errorM=>{
      this.error=errorM;
    })
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(post=>{
      this.isFetching=false;
      this.loadedPosts=post;
    },erros=>{
      this.error=erros.message;
    });
  }

  onCreatePost(postData:Post) {
    this.postService.createAndStorePost(postData.title,postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(posts=>{
      this.isFetching=false;
      this.loadedPosts=posts;
    },erros=>{
      this.error=erros.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(result=>{
      this.loadedPosts=[];
    });
  }


  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
