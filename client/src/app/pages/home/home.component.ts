import { Component, OnInit } from '@angular/core';
import { LocalStorageConsts } from 'src/app/consts/localstorage-consts';
import { ICarBrand, ICarDetails } from 'src/app/shared/models/car.model';
import { FiltersService } from 'src/app/shared/services/filters.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public brands: string[] = [];
  public models: string[] = [];
  public generations: string[] = [];

  public selectedBrand: string = '';
  public selectedModel: string = '';
  public selectedGeneration: string = '';

  private carBrands: ICarBrand = {};

  constructor(private filtersService: FiltersService) {}

  public ngOnInit(): void {
    this.filtersService.getCarDetails().subscribe((carDetails: ICarDetails) => {
      this.carBrands = carDetails.rows;
      this.brands = Object.keys(this.carBrands);
      this.models = [];
      this.generations = [];
    });

    this.filtersService.getGearBox().subscribe((res: any) => {
      console.log(res);
    });
  }

  public onBrandChange(newBrand: string) {
    this.selectedBrand = newBrand;
    this.models = Object.keys(this.carBrands[newBrand]);
    this.generations = [];
    this.selectedModel = '';
    this.selectedGeneration = '';
  }

  public onModelChange(newModel: string) {
    this.selectedModel = newModel;
    this.generations = this.carBrands[this.selectedBrand][newModel] || [];
    this.selectedGeneration = '';
  }

  public onGenerationChange(newGeneration: string) {
    this.selectedBrand = newGeneration;
  }

  public logout(): void {
    localStorage.removeItem(LocalStorageConsts.TOKEN);
    window.location.reload();
  }
}
