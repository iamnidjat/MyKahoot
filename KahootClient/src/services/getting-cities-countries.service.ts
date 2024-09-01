import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GettingCitiesCountriesService {
  private citiesUrl: string = 'assets/cities.json';
  private countriesUrl: string = 'assets/countries.json';

  constructor(private http: HttpClient) {}

  public getCities(): Observable<string[]> {
    return this.http.get<string[]>(this.citiesUrl);
  }

  public getCountries(): Observable<string[]> {
    return this.http.get<string[]>(this.countriesUrl);
  }
}
