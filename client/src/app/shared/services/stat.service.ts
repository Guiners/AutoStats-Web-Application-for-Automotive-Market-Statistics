import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICalcStatReq } from '../models/stat.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  public calcMin(data: ICalcStatReq): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/calc/min`, data);
  }

  public calcMax(data: ICalcStatReq): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/calc/max`, data);
  }

  public calcAvg(data: ICalcStatReq): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/calc/avg`, data);
  }

  public calcMedian(data: ICalcStatReq): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/calc/median`, data);
  }

  public calcMode(data: ICalcStatReq): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/calc/mode`, data);
  }
}
