import { Injectable } from "@angular/core";
import { AccountInfoDTO } from "../dto/User/UserDTO";

const TOKEN_KEY = "AuthToken";
const USERNAME_KEY = "AuthUsername";
const AUTHORITIES_KEY = "AuthAuthorities";
const ACCOUNT__INFO_KEY = "AccountInfo";
@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() {}

  public logOut(): void {
    window.sessionStorage.clear();
  }

  public setAccountInfo(acc: AccountInfoDTO): void {
    window.sessionStorage.removeItem(ACCOUNT__INFO_KEY);
    window.sessionStorage.setItem(ACCOUNT__INFO_KEY, JSON.stringify(acc));
  }

  public getAccountInfo(): AccountInfoDTO {
    return JSON.parse(sessionStorage.getItem(ACCOUNT__INFO_KEY));
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(
        (authority) => {
          this.roles.push(authority.authority);
        }
      );
    }
    return this.roles;
  }
}
