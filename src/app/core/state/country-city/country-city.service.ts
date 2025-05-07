import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { CountryCityData } from "./country-city.model";

@Injectable({
  providedIn: "root",
})
export class CountryCityService {
  private data: CountryCityData = {};

  constructor(private http: HttpClient) {}

  /* // Load the JSON data from your assets folder or API
  loadData(): Observable<CountryCityData> {
    return this.http.get<CountryCityData>("../../data/countries.json");
  } */

  getDemoData(): Observable<CountryCityData> {
    const demoData: CountryCityData = {
      USA: ["New York", "Los Angeles", "Chicago", "Houston"],
      Canada: ["Toronto", "Vancouver", "Montreal", "Calgary"],
      UK: ["London", "Manchester", "Birmingham", "Glasgow"],
      Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
    };
    return of(demoData);
  }

  setData(data: CountryCityData): void {
    this.data = data;
  }

  getAllCountries(): string[] {
    return Object.keys(this.data);
  }

  getCitiesByCountry(country: string): string[] {
    return this.data[country] || [];
  }
}
