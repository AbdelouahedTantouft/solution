import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginInfo } from './login/LoginInfo';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl:String ='api';
    constructor(private http: HttpClient) {}

    /*login(loginInfo: LoginInfo): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/login`, loginInfo);
    }*/
    login(loginInfo: LoginInfo) {
        // Simuler une connexion avec un login fictif
        return of({
          id: '12345',
          token: 'fake-jwt-token',
          message: 'Connexion réussie'
        });
      }
      
}
