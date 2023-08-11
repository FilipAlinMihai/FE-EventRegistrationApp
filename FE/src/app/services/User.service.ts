import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError } from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import { catchError, retry } from 'rxjs/operators'
import { User } from "../entity/User";

@Injectable({providedIn: 'root'})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public addUser(user:string,email:string,password:string): Observable<User>{
    return this.http.post<User>(this.apiServerUrl + '/user/add', {
      "name": user,
      "email": email,
      "password": password
    }).pipe(catchError(this.handleaddUserError));
  }

  public check(email:string): Observable<User>{
    return this.http.post<User>(this.apiServerUrl + '/user/find2', {
      "name": "",
      "email": email,
      "password": ""
    }).pipe(catchError(this.handlecheckUserError));
  }

  public findUser(email:string,password:string): Observable<User>{
    return this.http.post<User>(this.apiServerUrl + '/user/find', {
      "name": "",
      "email": email,
      "password": password
    }).pipe(catchError(this.handlefindUserError));
  }

  handleaddUserError(error: HttpErrorResponse) {
    window.alert("Could not add user");
    window.location.reload();
    return throwError(error);
  }

  handlefindUserError(error: HttpErrorResponse) {
    window.alert("Could not find user");
    window.location.reload();
    return throwError(error);
  }

  handlecheckUserError(error: HttpErrorResponse) {
    window.alert("Could not verify user");
    //window.location.reload();
    return throwError(error);
  }


}