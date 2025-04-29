import { Injectable } from "@angular/core";
import { Rubrique, rubriques } from "./rubrique.model";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RubriqueService {
  constructor() {}

  getAll(): Observable<Rubrique[]> {
    return of(rubriques);
  }

  getRubriqueByCode(code: string): Observable<Rubrique | undefined> {
    const found = rubriques.find((r) => r.code === code);
    return of(found);
  }
}
