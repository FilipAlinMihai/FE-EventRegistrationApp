import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError } from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import { catchError, retry } from 'rxjs/operators'
import { Event2 } from "../entity/Event2";
import { Friend } from "../entity/Friend";

@Injectable({providedIn: 'root'})
export class FriendService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public addEvent(id1:number,id2:number): Observable<Friend>{
    return this.http.post<Friend>(this.apiServerUrl + '/friend/add/'+id1+'/'+id2, {});
  }

  public check(id1:number,id2:number): Observable<Friend>{
    return this.http.post<Friend>(this.apiServerUrl + '/friend/check/'+id1+'/'+id2, {});
  }

  public getAll(id1:number): Observable<Friend[]>{
    return this.http.get<Friend[]>(this.apiServerUrl + '/friend/getAll/'+id1, {});
  }


}