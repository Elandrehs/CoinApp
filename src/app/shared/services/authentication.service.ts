import { Injectable } from '@angular/core';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  public saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  public saveUserId(id: string): void {
    localStorage.setItem(USER_KEY, id);
  }

  public getUserId(): string | null {
    return localStorage.getItem(USER_KEY);
  }


  public removeUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  public logout(): void {
    this.removeToken();
    this.removeUser();
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
