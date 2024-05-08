import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IAddFavouriteReq,
  IGetFavouriteReq,
  IGetFavouriteRes,
} from '../models/favourite.model';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  public addFavourite(data: IAddFavouriteReq): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/favourite/add`, data);
  }

  public getFavourites(data: IGetFavouriteReq): Observable<IGetFavouriteRes> {
    return this.http.post<any>(
      `${this.apiURL}/favourite/getUserFavParameters`,
      data
    );
  }
}
