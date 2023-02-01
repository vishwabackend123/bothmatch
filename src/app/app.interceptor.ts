import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './core/services/auth.service';
import { FunctionService } from './core/services/function.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    public tostr: ToastrService,
    public fun: FunctionService,
    public auth: AuthService
  ) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.auth.logout();
      this.fun.isLoginLoader = false
      this.fun.checkToken = false;
      return of(err.message);
    }
    return throwError(err);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(Promise.resolve(localStorage.getItem('loginToken'))).pipe(
      switchMap((token) => {
        const branch = localStorage.getItem('loginToken');
        const headers = req.headers.set('Authorization', `${branch}`);
        const requestClone = req.clone({ headers });
        return next
          .handle(requestClone)
          .pipe(catchError((err) => this.handleAuthError(err)));
      })
    );
  }
}
