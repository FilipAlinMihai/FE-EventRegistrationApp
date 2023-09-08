import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError } from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import { catchError, retry } from 'rxjs/operators'
import { Event2 } from "../entity/Event2";
import { Request2 } from "../entity/Request2";

@Injectable({providedIn: 'root'})
export class RequestService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }


  public addRequest(id1:number,id2:number): Observable<Request>{
    return this.http.post<Request>(this.apiServerUrl + '/request/add/'+id1+'/'+id2,{}
    ).pipe(catchError(this.handleaddRequestError));
  }

  public getAllMyRequests(id:number): Observable<Request2[]> {
    return this.http.get<Request2[]>(this.apiServerUrl + '/request/getAll/'+id)
}

public deleteRequest(id:number): Observable<Request2> {
  return this.http.delete<Request2>(this.apiServerUrl + '/request/delete/'+id)
}

public check(id1:number,id2:number): Observable<Request2>{
  return this.http.post<Request2>(this.apiServerUrl + '/request/check/'+id1+'/'+id2, {});
}

  handleaddRequestError(error: HttpErrorResponse) {
    window.alert("Could not add room!");
    window.location.reload();
    return throwError(error);
  }
}