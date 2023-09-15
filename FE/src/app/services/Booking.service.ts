import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError } from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import { catchError, retry } from 'rxjs/operators'
import { Event2 } from "../entity/Event2";
import { Friend } from "../entity/Friend";
import { Booking } from "../entity/Booking";

@Injectable({providedIn: 'root'})
export class BookingService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public addBooking(id1:number,id2:number,seats:number): Observable<Booking>{
    return this.http.post<Booking>(this.apiServerUrl + '/booking/add/'+id1+'/'+id2, {
        "seats": seats,
    });
  }

  public find(id1:number,id2:number): Observable<Booking>{
    return this.http.post<Booking>(this.apiServerUrl + '/booking/get2/'+id1+'/'+id2, {});
  }

  public getBookings(id:number): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.apiServerUrl + '/booking/getBookings/'+id, {});
  }
}