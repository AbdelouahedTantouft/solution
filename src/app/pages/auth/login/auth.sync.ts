import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSync {
  private loginSuccessSource = new Subject<void>();
  loginSuccess$ = this.loginSuccessSource.asObservable();

  notifyLoginSuccess() {
    this.loginSuccessSource.next();
  }
}
