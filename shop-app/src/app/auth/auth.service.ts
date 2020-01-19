import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";


export interface  AuthResponse {
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered:boolean

}

@Injectable({
  providedIn:'root'
})
export class AuthService{

  userSub=new BehaviorSubject<User>(null);

  private tokenExpirationDate:any;

  constructor(private http:HttpClient,private router:Router){}

  autoLogin(){
    const userData:
      {
        email:string,
        id:string,
        _token:string,
        _tokenExpirationDate:string
      }=JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.userSub.next(loadedUser);
      const expirationDuration=new Date(userData._tokenExpirationDate).getTime() -new Date().getTime() ;
      this.autoLogout(expirationDuration);
    }
  }

  singUp(email:string,password:string){
    const returnSecureToken:boolean=true;
   return  this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIBsrVRTZcGhW1cIVYKtoJdmCOi-CH19A',
      {email:email,password:password,returnSecureToken:returnSecureToken})
     .pipe(catchError(this.handelError),tap(responseData=>{
       this.handelAuth(responseData.email,responseData.localId,responseData.idToken,+responseData.expiresIn);
     }));
  }

  login(email:string,password:string){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIBsrVRTZcGhW1cIVYKtoJdmCOi-CH19A',
      {email:email,password:password,returnSecureToken:true}).
    pipe(catchError(this.handelError),tap(responseData=>{
      this.handelAuth(responseData.email,responseData.localId,responseData.idToken,+responseData.expiresIn);
    }));
  }

  logout(){
    this.userSub.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationDate){
      clearTimeout(this.tokenExpirationDate);
    }
    this.tokenExpirationDate=null;
  }

  autoLogout(expirationDate:number){
   this.tokenExpirationDate= setTimeout(()=>{this.logout()},expirationDate);
  }

  private handelAuth(email:string ,userId:string,token:string,expiresIn:number){
    const expirationDate=new Date(new Date().getTime() + expiresIn * 1000);
    const user=new User(email,userId,token,expirationDate);
    this.userSub.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handelError(errorRes:HttpErrorResponse){
    let errorMessage='an unknown error occurred!';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case'EMAIL_EXISTS': errorMessage='this email alerady exists';
      break;
      case 'EMAIL_NOT_FOUND':errorMessage='email not found';
      break;
      case 'INVALID_PASSWORD':errorMessage='worng password';
      break;

    }
    return throwError(errorMessage);
  }
}
