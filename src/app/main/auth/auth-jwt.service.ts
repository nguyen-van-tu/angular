import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtResponse } from "./jwt-response";
import { AuthLoginInfo } from "./login-info";
import { environment } from "src/environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  "Access-Control-Allow-Origin": `${environment.access_control_allow_origin}`,
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};

@Injectable({
  providedIn: "root",
})
export class AuthJwtService {
  loginUrl = `${environment.base_api_url}:${environment.port}/users/login`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */

  public attemptAuth(userinfo: AuthLoginInfo): Promise<JwtResponse> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<JwtResponse>(this.loginUrl, userinfo, httpOptions)
        .subscribe((response: JwtResponse) => {
          resolve(response);
        }, reject);
    });
  }
}
