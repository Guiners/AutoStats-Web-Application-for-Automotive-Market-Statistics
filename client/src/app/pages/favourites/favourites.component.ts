import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FavouritesService } from '../../shared/services/favourites.service';
import {
  IFavourites,
  IGetFavouriteReq,
  IGetFavouriteRes,
} from 'src/app/shared/models/favourite.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  public favourites: IFavourites[] = [];

  constructor(
    private favouritesService: FavouritesService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.getFavourites();
  }

  public getRecord(favourite: IFavourites) {
    return `${favourite.Brand} | ${favourite.Model} | ${favourite.Generation} | ${favourite.Gearbox} | ${favourite.Fueltype} | Przebieg: ${favourite.MilageLow}km - ${favourite.MilageHigh}km | Moc: ${favourite.HorsepowerLow}KM - ${favourite.HorsepowerHigh}KM | Pojemność: ${favourite.CapacityLow} - ${favourite.CapacityHigh} | Cena: ${favourite.PriceLow}PLN - ${favourite.PriceHigh}PLN | Rok produkcji: ${favourite.ProductionYearLow}r - ${favourite.ProductionYearHigh}r`;
  }

  public removeRecord(id: number, index: number): void {
    this.favouritesService
      .removeFavourite({ Id: id })
      .subscribe((response: { message: string }) => {
        if (response && response.message === 'DELETE') {
          this.favourites.splice(index, 1);
        }
      });
  }

  private getFavourites(): void {
    const data: IGetFavouriteReq = {
      userEmail: this.authService.getUserEmail(),
    };

    this.favouritesService
      .getFavourites(data)
      .subscribe((favourites: IGetFavouriteRes) => {
        this.favourites = favourites.message;
      });
  }
}
