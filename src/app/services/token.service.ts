import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USER_NAME_KEY = 'AuthUserName';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  roles: Array<string> = [];
  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USER_NAME_KEY);
    window.sessionStorage.setItem(USER_NAME_KEY, userName);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USER_NAME_KEY)!;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
