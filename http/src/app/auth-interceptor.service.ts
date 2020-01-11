import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('the request is being sent ');
    const modifiedReq=req.clone({
      headers:req.headers.append('auth','rff')
    });
    return next.handle(req);
  }
}
