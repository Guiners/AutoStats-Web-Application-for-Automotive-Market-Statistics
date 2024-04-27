import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICarBrand, ICarDetails } from 'src/app/shared/models/car.model';
import { IFuelTypeRes } from 'src/app/shared/models/fuel-type.model';
import { IGearboxRes } from 'src/app/shared/models/gear-box.model';
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
    private formBuilder: FormBuilder
  ) {
    this.filtersForm = this.formBuilder.group({
      brand: [
        { value: '', disabled: !this.brands.length },
        Validators.required,
      ],
      model: [{ value: '', disabled: !this.models.length }],
      generation: [{ value: '', disabled: !this.generations.length }],
      gearbox: [{ value: '', disabled: !this.gearboxes.length }],
      fueltype: [{ value: '', disabled: !this.fuelTypes.length }],
      milageLow: [''],
      milageHigh: [''],
      horsepowerLow: [''],
      horsepowerHigh: [''],
      capacityLow: [''],
      capacityHigh: [''],
      priceLow: [''],
      priceHigh: [''],
      productionYearLow: [''],
      productionYearHigh: [''],
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
