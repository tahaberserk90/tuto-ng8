import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {map, tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class PostService{

  error=new Subject<string>();

  constructor(private http:HttpClient){}

  createAndStorePost(title:string,content:string){
    // Send Http request
    const newPost:Post={title:title,content:content};

    this.http
      .post<{name:string}>(
        'https://ng-tuto-963e1.firebaseio.com/posts.json',
        newPost,{
          observe:'response'
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      },error=>{
        this.error.next(error.message);
      });
  }

  fetchPosts(){
   return this.http.get<{[key:string]:Post}>('https://ng-tuto-963e1.firebaseio.com/posts.json',{
     headers:new HttpHeaders({'custom-header':'hello'}),
     params:new HttpParams().set('print','pretty')
   })
      .pipe(map(responceData=>{
        const postsArray:Post[]=[];
        for(const key in responceData){
          if(responceData.hasOwnProperty(key)){
            postsArray.push({ ...responceData[key],id:key});
          }
        }
        return postsArray;
      }));
  }

  deletePosts(){
    return this.http.delete('https://ng-tuto-963e1.firebaseio.com/posts.json',{observe:'events'}).
    pipe(tap(events=>{
      console.log(events);
    }));
  }

}
