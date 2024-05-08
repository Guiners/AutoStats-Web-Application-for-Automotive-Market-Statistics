import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatsFieldConst, StatsTypeConst } from 'src/app/consts/stats-consts';
import { AuthService } from 'src/app/core/services/auth.service';
import { ICarBrand, ICarDetails } from 'src/app/shared/models/car.model';
import { IAddFavouriteReq } from 'src/app/shared/models/favourite.model';
import { IFuelTypeRes } from 'src/app/shared/models/fuel-type.model';
import { IGearboxRes } from 'src/app/shared/models/gear-box.model';
import { ICalcStatReq, IStatType } from 'src/app/shared/models/stat.model';
import { FavouritesService } from 'src/app/shared/services/favourites.service';
import { FiltersService } from 'src/app/shared/services/filters.service';
import { StatService } from 'src/app/shared/services/stat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public filtersError: string = '';
  public statsError: string = '';
  public result: string = '';

  public filtersForm: FormGroup;
  public statsForm: FormGroup;

  public brands: string[] = [];
  public models: string[] = [];
  public generations: string[] = [];
  public gearboxes: string[] = [];
  public fuelTypes: string[] = [];

  public selectedBrand: string = '';
  public selectedModel: string = '';
  public selectedGeneration: string = '';

  public statsType: IStatType[] = StatsTypeConst;
  public statsField: IStatType[] = StatsFieldConst;

  private carBrands: ICarBrand = {};

  constructor(
    private filtersService: FiltersService,
    private formBuilder: FormBuilder,
    private favouritesService: FavouritesService,
    private statService: StatService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.filtersForm = this.formBuilder.group({
      Brand: [{ value: '', disabled: !this.brands.length }],
      Model: [{ value: '', disabled: !this.models.length }],
      Generation: [{ value: '', disabled: !this.generations.length }],
      CapacityLow: [''],
      CapacityHigh: [''],
      HorsepowerLow: [''],
      HorsepowerHigh: [''],
      MilageLow: [''],
      MilageHigh: [''],
      Fueltype: [{ value: '', disabled: !this.fuelTypes.length }],
      Gearbox: [{ value: '', disabled: !this.gearboxes.length }],
      ProductionYearLow: [''],
      ProductionYearHigh: [''],
      PriceLow: [''],
      PriceHigh: [''],
      Segment: [{ value: null, disabled: true }],
      DriveType: [{ value: null, disabled: true }],
    });

    this.statsForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      field: ['', [Validators.required]],
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

    this.updateControlState('Model', this.models);
    this.updateControlState('Generation', this.generations);
  }

  public onModelChange(newModel: string) {
    this.selectedModel = newModel;
    this.generations = this.carBrands[this.selectedBrand][newModel] || [];
    this.selectedGeneration = '';

    this.updateControlState('Generation', this.generations);
  }

  public clearForm(): void {
    this.filtersForm.reset();
  }

  public addToFavourite(): void {
    this.filtersError = '';
    const data: IAddFavouriteReq = this.getAddFavouriteData();

    if (!this.hasAtLeastOneValue(this.filtersForm)) {
      this.filtersError = 'Przynajmniej jeden filtr musi być wybrany.';
      return;
    }

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

  public calculate(): void {
    this.statsError = '';
    this.result = '';

    if (!this.statsForm.valid) {
      this.statsError = 'Pola nie mogą być puste.';
      return;
    }

    const statType: string = this.statsForm.get('type')?.value;
    const data: ICalcStatReq = this.getCalcStatData();

    if (!data.inputColumns.length && !data.inputValues.length) {
      this.statsError = 'Przynajmniej jeden filtr musi być wybrany.';
      return;
    }

    switch (statType) {
      case 'min': {
        this.statService.calcMin(data).subscribe({
          next: (response: { result: any }) => {
            if (response.result) {
              this.result = `Wartość minimalna dla ${this.getLabel(
                data.columnToCount
              )}: ${response.result}`;
            }
          },
          error: (err) => {
            if (err) {
              this.statsError = 'Coś poszło nie tak. Spróbuj ponownie.';
            }
          },
        });
        break;
      }
      case 'max': {
        this.statService.calcMax(data).subscribe({
          next: (response: { result: any }) => {
            if (response.result) {
              this.result = `Wartość maksymalna dla ${this.getLabel(
                data.columnToCount
              )}: ${response.result}`;
            }
          },
          error: (err) => {
            if (err) {
              this.statsError = 'Coś poszło nie tak. Spróbuj ponownie.';
            }
          },
        });
        break;
      }
      case 'avg': {
        this.statService.calcAvg(data).subscribe({
          next: (response: { result: any }) => {
            if (response.result) {
              this.result = `Średnia dla ${this.getLabel(
                data.columnToCount
              )}: ${response.result}`;
            }
          },
          error: (err) => {
            if (err) {
              this.statsError = 'Coś poszło nie tak. Spróbuj ponownie.';
            }
          },
        });
        break;
      }
      case 'median': {
        this.statService.calcMedian(data).subscribe({
          next: (response: { result: any }) => {
            if (response.result) {
              this.result = `Mediana dla ${this.getLabel(
                data.columnToCount
              )}: ${response.result}`;
            }
          },
          error: (err) => {
            if (err) {
              this.statsError = 'Coś poszło nie tak. Spróbuj ponownie.';
            }
          },
        });
        break;
      }
      case 'mode': {
        this.statService.calcMode(data).subscribe({
          next: (response: { result: any }) => {
            if (response.result) {
              this.result = `Dominanta dla ${this.getLabel(
                data.columnToCount
              )}: ${response.result}`;
            }
          },
          error: (err) => {
            if (err) {
              this.statsError = 'Coś poszło nie tak. Spróbuj ponownie.';
            }
          },
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  private hasAtLeastOneValue(form: FormGroup): boolean {
    return Object.keys(form.controls).some((key) => {
      const control = form.controls[key];
      return control.value !== '' && control.value != null;
    });
  }

  private getLabel(value: string): string {
    const field = this.statsField.find(
      (field: IStatType) => field.value === value
    );

    return field ? field?.label : 'null';
  }

  private getAddFavouriteData(): IAddFavouriteReq {
    const inputColumns: string[] = [];
    const inputValues: any[] = [];
    const nullFields: string[] = [
      'Brand',
      'Model',
      'Generation',
      'Gearbox',
      'FuelType',
      'Segment',
      'DriveType',
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

  private getCalcStatData(): ICalcStatReq {
    const inputColumns: string[] = [];
    const inputValues: any[] = [];

    Object.keys(this.filtersForm.controls).forEach((key) => {
      const control = this.filtersForm.get(key);

      if (control?.value !== '' && control?.value !== null) {
        inputColumns.push(key);
        inputValues.push(control?.value);
      }
    });

    const data: ICalcStatReq = {
      inputColumns: inputColumns,
      inputValues: inputValues,
      columnToCount: this.statsForm.get('field')?.value,
    };

    return data;
  }

  private getCarDetails(): void {
    this.filtersService.getCarDetails().subscribe((carDetails: ICarDetails) => {
      this.carBrands = carDetails.rows;
      this.brands = Object.keys(this.carBrands);
      this.models = [];
      this.generations = [];

      this.updateControlState('Brand', this.brands);
    });
  }

  private getGearboxes(): void {
    this.filtersService.getGearboxes().subscribe((gearboxes: IGearboxRes) => {
      this.gearboxes = gearboxes.rows['Gearbox'].filter(
        (gearBox: string) => gearBox !== null
      );

      this.updateControlState('Gearbox', this.gearboxes);
    });
  }

  private getFuelTypes(): void {
    this.filtersService.getFuelTypes().subscribe((fuelTypes: IFuelTypeRes) => {
      this.fuelTypes = fuelTypes.rows['Fueltype'];

      this.updateControlState('Fueltype', this.fuelTypes);
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
