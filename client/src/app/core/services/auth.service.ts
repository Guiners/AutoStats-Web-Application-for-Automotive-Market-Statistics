import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { LocalStorageConsts } from '../../consts/localstorage-consts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public jwtService: JwtHelperService = new JwtHelperService();
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  public register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/user/register`, registerData);
  }

  public login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/user/login`, loginData).pipe(
      map((data) => {
        const token = { token: data.token } as Token;
        localStorage.setItem(LocalStorageConsts.TOKEN, JSON.stringify(token));
        return true;
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  public userIsAuth(): boolean {
    const localStorageToken = localStorage.getItem(LocalStorageConsts.TOKEN);

    if (localStorageToken) {
      const token = JSON.parse(localStorageToken) as Token;
      const isTokenExpired = this.jwtService.isTokenExpired(token.token);

      if (isTokenExpired) {
        localStorage.removeItem(LocalStorageConsts.TOKEN);
        return false;
      }

      return true;
    }
    return false;
  }

  public getUserEmail(): string {
    const localStorageToken = localStorage.getItem(LocalStorageConsts.TOKEN);

    if (localStorageToken) {
      const token = JSON.parse(localStorageToken) as Token;
      const userInfo = this.jwtService.decodeToken(token.token);
      return userInfo.name;
    }

    return '';
  }
}
