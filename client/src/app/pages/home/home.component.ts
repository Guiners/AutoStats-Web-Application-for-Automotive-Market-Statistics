import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { ICarBrand, ICarDetails } from 'src/app/shared/models/car.model';
import { IAddFavouriteReq } from 'src/app/shared/models/favourite.model';
import { IFuelTypeRes } from 'src/app/shared/models/fuel-type.model';
import { IGearboxRes } from 'src/app/shared/models/gear-box.model';
import { FavouritesService } from 'src/app/shared/services/favourites.service';
import { FiltersService } from 'src/app/shared/services/filters.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public filtersForm: FormGroup;

  public brands: string[] = [];
  public models: string[] = [];
  public generations: string[] = [];
  public gearboxes: string[] = [];
  public fuelTypes: string[] = [];

  public selectedBrand: string = '';
  public selectedModel: string = '';
  public selectedGeneration: string = '';

  private carBrands: ICarBrand = {};

  constructor(
    private filtersService: FiltersService,
    private formBuilder: FormBuilder,
    private favouritesService: FavouritesService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.filtersForm = this.formBuilder.group({
      brand: [{ value: '', disabled: !this.brands.length }],
      model: [{ value: '', disabled: !this.models.length }],
      generation: [{ value: '', disabled: !this.generations.length }],
      capacityLow: [''],
      capacityHigh: [''],
      horsepowerLow: [''],
      horsepowerHigh: [''],
      milageLow: [''],
      milageHigh: [''],
      fuelType: [{ value: '', disabled: !this.fuelTypes.length }],
      gearbox: [{ value: '', disabled: !this.gearboxes.length }],
      productionYearLow: [''],
      productionYearHigh: [''],
      priceLow: [''],
      priceHigh: [''],
      segment: [{ value: null, disabled: true }],
      driveType: [{ value: null, disabled: true }],
    });
  }

  public ngOnInit(): void {
    this.getCarDetails();
    this.getGearboxes();
    this.getFuelTypes();
  }

  public onBrandChange(newBrand: string) {
    this.selectedBrand = newBrand;
    this.models = Object.keys(this.carBrands[newBrand]);
    this.generations = [];
    this.selectedModel = '';
    this.selectedGeneration = '';

    this.updateControlState('model', this.models);
    this.updateControlState('generation', this.generations);
  }

  public onModelChange(newModel: string) {
    this.selectedModel = newModel;
    this.generations = this.carBrands[this.selectedBrand][newModel] || [];
    this.selectedGeneration = '';

    this.updateControlState('generation', this.generations);
  }

  public clearForm(): void {
    this.filtersForm.reset();
  }

  public addToFavourite(): void {
    const data: IAddFavouriteReq = this.getData();
    this.favouritesService
      .addFavourite(data)
      .subscribe((response: { message: string }) => {
        if (response.message === 'INSERT') {
          const snackbarMessage: string = 'Dodano filtry do ulubionych.';
          this.snackBar.open(snackbarMessage, '', { duration: 2000 });
          this.clearForm();
        } else {
          const snackbarMessage: string = 'Coś poszło nie tak. Sprawdz filtry.';
          this.snackBar.open(snackbarMessage, '', { duration: 2000 });
        }
      });
  }

  private getData(): IAddFavouriteReq {
    const inputColumns: string[] = [];
    const inputValues: any[] = [];
    const nullFields: string[] = [
      'brand',
      'model',
      'generation',
      'gearbox',
      'fuelType',
      'segment',
      'driveType',
    ];

    Object.keys(this.filtersForm.controls).forEach((key) => {
      const control = this.filtersForm.get(key);

      inputColumns.push(key);

      if (control?.value === '' || control?.value === null) {
        if (nullFields.includes(key)) {
          inputValues.push(null);
        } else {
          inputValues.push(0);
        }
      } else {
        inputValues.push(control?.value);
      }
    });

    const data: IAddFavouriteReq = {
      userEmail: this.authService.getUserEmail(),
      queryName: 'queryName',
      inputColumns: inputColumns,
      inputValues: inputValues,
    };

    return data;
  }

  private getCarDetails(): void {
    this.filtersService.getCarDetails().subscribe((carDetails: ICarDetails) => {
      this.carBrands = carDetails.rows;
      this.brands = Object.keys(this.carBrands);
      this.models = [];
      this.generations = [];

      this.updateControlState('brand', this.brands);
    });
  }

  private getGearboxes(): void {
    this.filtersService.getGearboxes().subscribe((gearboxes: IGearboxRes) => {
      this.gearboxes = gearboxes.rows['Gearbox'].filter(
        (gearBox: string) => gearBox !== null
      );

      this.updateControlState('gearbox', this.gearboxes);
    });
  }

  private getFuelTypes(): void {
    this.filtersService.getFuelTypes().subscribe((fuelTypes: IFuelTypeRes) => {
      this.fuelTypes = fuelTypes.rows['Fueltype'];

      this.updateControlState('fueltype', this.fuelTypes);
    });
  }

  private updateControlState(controlName: string, controlElements: string[]) {
    if (controlElements.length) {
      this.filtersForm.get(controlName)?.enable();
    } else {
      this.filtersForm.get(controlName)?.disable();
    }
  }
}
