import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild{

  constructor(private authService:AuthService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.authService.isAuthenticated().then(
      (isAuth:boolean)=>{
        if(isAuth){
          return true;
        }else{
          this.router.navigate(['/']);
        }
      }
    )
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean | UrlTree {
    return this.canActivate(childRoute,state);
  }

}
