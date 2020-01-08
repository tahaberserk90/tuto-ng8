import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userActivated=false;
  constructor(private userSerive:UserService) {}

  ngOnInit() {
    this.userSerive.activatedEmmiter.subscribe(didActivated=>{
      this.userActivated=didActivated;
    })
  }
}
