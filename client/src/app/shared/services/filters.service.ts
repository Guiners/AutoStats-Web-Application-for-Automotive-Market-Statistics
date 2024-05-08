import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICarDetails } from '../models/car.model';
import { IGearboxRes } from '../models/gear-box.model';
import { IFuelTypeRes } from '../models/fuel-type.model';

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

  public getGearboxes(): Observable<IGearboxRes> {
    return this.http.get<IGearboxRes>(
      `${this.apiURL}/posts/filter/distinctGearBox`
    );
  }

  public getFuelTypes(): Observable<IFuelTypeRes> {
    return this.http.get<IFuelTypeRes>(
      `${this.apiURL}/posts/filter/distinctFuelType`
    );
  }
}
