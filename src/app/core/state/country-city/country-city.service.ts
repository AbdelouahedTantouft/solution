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
      USA: ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco"],
      Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
      UK: ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"],
      Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
      Morocco: ["Casablanca", "Rabat", "Marrakech", "Fes", "Tangier"],
      France: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
      Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"],
      Italy: ["Rome", "Milan", "Naples", "Turin", "Florence"],
      Japan: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Sapporo"],
      Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
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
