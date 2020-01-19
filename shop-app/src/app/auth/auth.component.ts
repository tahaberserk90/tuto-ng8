import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponse, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode=true;
  isLoading=false;
  error:string=null;
  constructor(private authService:AuthService,private router:Router) { }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    const email =form.value.email;
    const password=form.value.password;
    this.isLoading=true;
    let authObser:Observable<AuthResponse>;
    if(this.isLoginMode){
      authObser=this.authService.login(email,password);
    }else {
      authObser=this.authService.singUp(email,password);
    }

    authObser.subscribe(response=>{
      console.log(response);
      this.isLoading=false;
      this.router.navigate(['/recipes']);
    },errorMessage => {
      console.log(errorMessage);
      this.error=errorMessage;
      this.isLoading=false;
    });

    form.reset();
  }

  onCloseAlert(){
    this.error=null;
  }

}
