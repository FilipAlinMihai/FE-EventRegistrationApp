import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError } from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import { catchError, retry } from 'rxjs/operators'
import { Event2 } from "../entity/Event2";
import { Invitation } from "../entity/Invitation";

@Injectable({providedIn: 'root'})
export class InvitationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public addInvitation(id1:number,id2:number,id3:number): Observable<Invitation>{
    return this.http.post<Invitation>(this.apiServerUrl + '/invitation/add/'+id1+'/'+id2+'/'+id3, {});
  }

  public getInvitations(id:number): Observable<Invitation[]>{
    return this.http.get<Invitation[]>(this.apiServerUrl + '/invitation/getAll/'+id, {});
  }

}