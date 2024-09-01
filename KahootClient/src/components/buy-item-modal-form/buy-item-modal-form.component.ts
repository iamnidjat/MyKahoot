import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ItemToBuy } from '../../models/ItemToBuy';
import {MykahootstoreService} from "../../services/mykahootstore.service";
import Swal from "sweetalert2";
import {GettingCitiesCountriesService} from "../../services/getting-cities-countries.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-buy-item-modal-form',
  templateUrl: './buy-item-modal-form.component.html',
  styleUrls: ['./buy-item-modal-form.component.css']
})
export class BuyItemModalFormComponent implements OnInit{
  @Input() item: ItemToBuy | null = null;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  public address: string = '';
  public quantity: number = 1;

  public city: string = '';
  public cities: string[] = [];
  public filteredCities: string[] = [];
  public country: string = '';
  public countries: string[] = [];
  public filteredCountries: string[] = [];

  constructor(private el: ElementRef, private myKahootService: MykahootstoreService, private gettingDataService: GettingCitiesCountriesService) {}

  private getAllCitiesAndCountries(): void {
    forkJoin({
      cities: this.gettingDataService.getCities(),
      countries: this.gettingDataService.getCountries()
    }).subscribe(res => {
      this.cities = res.cities;
      this.countries = res.countries;
    });
  }

  public filterCities(): void {
    const filterValue = this.city.toLowerCase();
    this.filteredCities = this.cities.filter(city =>
      city.toLowerCase().startsWith(filterValue)
    );
  }

  public selectCity(city: string): void {
    this.city = city;
    this.filteredCities = []; // Hide the list after selection
  }

  public filterCountries(): void {
    const filterValue = this.city.toLowerCase();
    this.filteredCountries = this.countries.filter(country =>
      country.toLowerCase().startsWith(filterValue)
    );
  }

  public selectCountry(country: string): void {
    this.country = country;
    this.filteredCountries = []; // Hide the list after selection
  }

  public ClosePopUp(): void {
    this.close.emit();
  }

  public async buyItemAsync(): Promise<void> {
    if (this.item) {
      if (this.address !== '')
      {
        await this.myKahootService.buyAnItemAsync(this.item.id!, parseInt(localStorage.getItem("userId")!), this.quantity, this.address, this.country, this.city);
        this.ClosePopUp();
      }
      else {
        Swal.fire("Warning", "Specify the address!", "warning");
      }
    }
  }

  ngOnInit(): void {
    this.getAllCitiesAndCountries();
  }
}
