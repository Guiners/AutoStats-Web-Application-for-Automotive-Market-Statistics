import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICarDetails } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  public getCarDetails(): Observable<ICarDetails> {
    return this.http.get<ICarDetails>(
      `${this.apiURL}/posts/filter/distinctModel`
    );
  }

  public getGearBox(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/posts/filter/distinctGearBox`);
  }
}
