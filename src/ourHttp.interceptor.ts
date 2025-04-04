
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable, finalize, tap, EMPTY, from, switchMap} from 'rxjs';

@Injectable()
export class OurHttpInterceptor implements HttpInterceptor {
  token: string | undefined;
  returnUrl: string | undefined;
  isLogged: boolean | undefined;
//,    private authService:AuthService
  constructor( private router: Router) {
    // this.token =this.authService.isAuthenticated().TOKEN_API;
    // this.store.select(selectToken).subscribe((v) => {
    //   if (v && v !== '') {
    //     this.token = v;
    //   }
    // });
  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // If URL should bypass authentication, handle immediately
        // if (this.bypassAuthentication(request.url)) {
            return this.handleRequest(request, next, false);
        // }

        // Use the synchronous check first for better performance
        // const authState = this.authService.isAuthenticatedSync();
        // if (authState?.TOKEN_API) {
            // return this.handleRequest(request, next, true, authState.TOKEN_API);
        // }

        // // If we don't have a sync value, use the async check
        // return from(this.authService.isAuthenticated()).pipe(
        //     switchMap(auth => {
        //         if (auth?.TOKEN_API) {
        //             return this.handleRequest(request, next, true, auth.TOKEN_API);
        //         }
        //         return EMPTY;
        //     })
        // );
    }

  /*private bypassAuthentication(url: string): boolean {
    const authBypassUrls = ['changePassword', 'login', 'reset-password','change-password', 'forgot-password', 'sigin'];
    return authBypassUrls.some(endpoint => url.endsWith(endpoint));
  }*/
  private checkDocUploadUrl(url: string): boolean {
    const authBypassUrls = ['projets/save'];
    return authBypassUrls.some(endpoint => url.endsWith(endpoint));
  }
    private handleRequest(
        request: HttpRequest<any>,
        next: HttpHandler,
        addAuth: boolean,
        token?: string
    ): Observable<HttpEvent<any>> {
        if (addAuth && token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }

    private bypassAuthentication(url: string): boolean {
        // Your bypass logic here
        const authBypassUrls = ['changePassword', 'login', 'reset-password','change-password', 'forgot-password', 'sigin'];
        return authBypassUrls.some(endpoint => url.endsWith(endpoint));
    }
  /*private handleRequest(
    request: HttpRequest<any>,
    next: HttpHandler,
    withAuthentication: boolean
  ): Observable<HttpEvent<any>> {
    if (withAuthentication && !this.checkDocUploadUrl(request.url)) {
      request = request.clone({
        setHeaders: {
          'Content-type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + this.token
        }
      });
    }
    else  if (withAuthentication){
        request = request.clone({
            setHeaders: { //

              Authorization: 'Bearer ' + this.token
            }
          });
    }
    this.loader.showLoader();
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse && request.method !== 'OPTIONS') {
            if (err.status === 0 || err.status === 401 || err.status === 403) {
              // this.clearStorage();
              // this.router.navigate(['/login']);
            }
          }
        }
      ),
      finalize(() => this.loader.hideLoader())
    );
  }*/


  // clearStorage() {
  //   StorageUtils.clearStorage();
  // }
}
