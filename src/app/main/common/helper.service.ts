import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TokenStorageService } from "src/app/main/auth/token-storage.service";

@Injectable()
export class HelperService {
  httpOptions: any;
  baseURL = `${environment.base_api_url}:${environment.port}/`;

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ` + this.tokenStorage.getToken(),
      }),
      "Access-Control-Allow-Origin": `${environment.access_control_allow_origin}`,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    };
  }

  public getList(
    page: number,
    size: number,
    sort: string[],
    search: string,
    isDeleted: number,
    apiURL: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(
          this.baseURL +
            apiURL +
            "?page=" +
            page +
            "&size=" +
            size +
            "&sort=" +
            sort +
            "&search=" +
            search +
            "&isDeleted=" +
            isDeleted,
          this.httpOptions
        )
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  public add(entity: any, apiURL: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>(this.baseURL + apiURL + "/add", entity, this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  public update(entity: any, apiURL: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>(this.baseURL + apiURL + "/save", entity, this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  public delete(entity: any, apiURL: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>(this.baseURL + apiURL + "/delete", entity, this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  public reactive(entity: any, apiURL: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>(this.baseURL + apiURL + "/reactive", entity, this.httpOptions)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  public checkExists(paramCheck: string, apiURL: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(
          this.baseURL + apiURL + "?paramCheck=" + paramCheck,
          this.httpOptions
        )
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
