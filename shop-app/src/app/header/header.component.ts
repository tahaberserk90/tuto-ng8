import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  private subscribtion:Subscription;
  isAuthenticated=false;

  constructor(private dsService:DataStorageService,private authService:AuthService) { }

  ngOnInit() {
    this.subscribtion=this.authService.userSub.subscribe(user=>{
      // if(user.token){
      //   this.isAuthenticated=true;
      // }
      this.isAuthenticated=!!user;
    });
  }

  onSaveRecipeData(){
    this.dsService.storeRecipes();
  }

  onFetchRecipeData(){
    this.dsService.fetchRecipes().subscribe();
  }

  onLogOut(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }


}
