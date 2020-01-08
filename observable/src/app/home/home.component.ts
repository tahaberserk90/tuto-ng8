import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  private subscribtion:Subscription;
  constructor() { }

  ngOnInit() {

   // this.subscribtion= interval(1000).subscribe(
   //    count=>{
   //      console.log(count);
   //    }
   //  );
    const customObs=new Observable(
      observer=>{
        let count=0;
        setInterval(()=>{
          observer.next(count);
          if(count == 2){
            observer.complete();
          }
          if(count>3){
            observer.error(new Error('eroor'));
          }
          count++;
        },1000);
      }
    );


   this.subscribtion= customObs.pipe(map(
     (data:number)=>{
       return 'Round '+ (data + 1);
     }
   )).subscribe(data=>{
      console.log(data);
    },error=>{
     console.log(error);
   })
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

}
