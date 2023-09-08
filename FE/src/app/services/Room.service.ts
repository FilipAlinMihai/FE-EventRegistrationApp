import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError } from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import { catchError, retry } from 'rxjs/operators'
import { Event2 } from "../entity/Event2";
import { Room } from "../entity/Room";

@Injectable({providedIn: 'root'})
export class RoomService {

    private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public addRoom(name:string,coordinator:string,seats:number,id:number): Observable<Room>{
    return this.http.post<Room>(this.apiServerUrl + '/room/add/'+id, {
      "name": name,
      "coordinator": coordinator,
      "seats": seats
    }).pipe(catchError(this.handleaddRoomError));
  }

  public roomsSeats(id:number): Observable<Number>{
    return this.http.get<Number>(this.apiServerUrl + '/room/seats/'+id, {});
  }

  public roomsEmptySeats(id:number): Observable<Number>{
    return this.http.get<Number>(this.apiServerUrl + '/room/emptyseats/'+id, {});
  }
  public takeSeat(id:number,num:number): Observable<Number>{
    return this.http.post<Number>(this.apiServerUrl + '/room/takeSeat/'+id+'/'+num, {});
  }

  handleaddRoomError(error: HttpErrorResponse) {
    window.alert("Could not add room!");
    window.location.reload();
    return throwError(error);
  }


}