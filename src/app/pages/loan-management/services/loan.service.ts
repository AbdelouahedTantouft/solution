import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Loan, RubriqueSearchResult } from '../models/loan.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = '/api/loans'; // Endpoint API pour intégration future
  private useMockData = true; // Mettre à false pour utiliser une vraie API

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) { }

  /**
   * Récupérer tous les prêts
   */
  getLoans(): Observable<Loan[]> {
    if (this.useMockData) {
      return of(this.mockDataService.getLoans());
    }

    return this.http.get<Loan[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des prêts', error);
        return throwError(() => new Error('Échec du chargement des prêts. Veuillez réessayer plus tard.'));
      })
    );
  }

  /**
   * Récupérer un prêt par ID
   */
  getLoanById(id: number): Observable<Loan> {
    if (this.useMockData) {
      const loan = this.mockDataService.getLoanById(id);
      if (loan) {
        return of(loan);
      }
      return throwError(() => new Error(`Prêt avec ID ${id} non trouvé.`));
    }

    return this.http.get<Loan>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Erreur lors de la récupération du prêt avec ID ${id}`, error);
        return throwError(() => new Error('Échec du chargement des détails du prêt. Veuillez réessayer plus tard.'));
      })
    );
  }

  /**
   * Créer un nouveau prêt
   */
  createLoan(loan: Loan): Observable<Loan> {
    if (this.useMockData) {
      try {
        const newLoan = this.mockDataService.createLoan(loan);
        return of(newLoan);
      } catch (error) {
        return throwError(() => error);
      }
    }

    return this.http.post<Loan>(this.apiUrl, loan).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du prêt', error);
        return throwError(() => new Error('Échec de la création du prêt. Veuillez réessayer plus tard.'));
      })
    );
  }

  /**
   * Mettre à jour un prêt existant
   */
  updateLoan(loan: Loan): Observable<Loan> {
    if (!loan.id) {
      return throwError(() => new Error('L\'ID du prêt est requis pour les mises à jour.'));
    }

    if (this.useMockData) {
      try {
        const updatedLoan = this.mockDataService.updateLoan(loan);
        return of(updatedLoan);
      } catch (error) {
        return throwError(() => error);
      }
    }

    return this.http.put<Loan>(`${this.apiUrl}/${loan.id}`, loan).pipe(
      catchError(error => {
        console.error(`Erreur lors de la mise à jour du prêt avec ID ${loan.id}`, error);
        return throwError(() => new Error('Échec de la mise à jour du prêt. Veuillez réessayer plus tard.'));
      })
    );
  }

  /**
   * Supprimer un prêt
   */
  deleteLoan(id: number | null): Observable<void> {
    if (!id) {
      return throwError(() => new Error('L\'ID du prêt est requis pour la suppression.'));
    }

    if (this.useMockData) {
      try {
        this.mockDataService.deleteLoan(id);
        return of(void 0);
      } catch (error) {
        return throwError(() => error);
      }
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Erreur lors de la suppression du prêt avec ID ${id}`, error);
        return throwError(() => new Error('Échec de la suppression du prêt. Veuillez réessayer plus tard.'));
      })
    );
  }

  /**
   * Rechercher des rubriques selon le type de champ
   */
  searchRubriques(fieldType: string): Observable<RubriqueSearchResult[]> {
    if (this.useMockData) {
      return of(this.mockDataService.searchRubriques(fieldType));
    }

    // L'endpoint peut varier selon le type de champ
    return this.http.get<RubriqueSearchResult[]>(`/api/rubriques?type=${fieldType}`).pipe(
      catchError(error => {
        console.error(`Erreur lors de la recherche de rubriques pour ${fieldType}`, error);
        return throwError(() => new Error('Échec de la recherche de rubriques. Veuillez réessayer plus tard.'));
      })
    );
  }
}
