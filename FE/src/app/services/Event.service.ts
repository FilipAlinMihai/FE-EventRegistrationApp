import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError } from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import { catchError, retry } from 'rxjs/operators'
import { Event2 } from "../entity/Event2";

@Injectable({providedIn: 'root'})
export class EventService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public addEvent(name:string,type:string,rooms:number,id:number): Observable<Event2>{
    return this.http.post<Event2>(this.apiServerUrl + '/event/add/'+id, {
      "name": name,
      "type": type,
      "rooms": rooms
    }).pipe(catchError(this.handleaddEventError));
  }

  public getAllMyEvents(id:number): Observable<Event2[]> {
    return this.http.get<Event2[]>(this.apiServerUrl + '/event/getAll/'+id)
}

  handleaddEventError(error: HttpErrorResponse) {
    window.alert("Could not add event");
    window.location.reload();
    return throwError(error);
  }

  public check(name:string,id:number): Observable<Event>{
    return this.http.post<Event>(this.apiServerUrl + '/event/check/'+id, {
      "name": name,
      "email": "",
      "password": ""
    }).pipe(catchError(this.handlecheckEventError));
  }

  handlecheckEventError(error: HttpErrorResponse) {
    window.alert("Could not verify event");
    //window.location.reload();
    return throwError(error);
  }

}