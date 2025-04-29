import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { 
  PaySlip, 
  PaySlipFilter, 
  PaySlipGenerationOptions, 
  PaySlipStatus, 
  PaySlipTemplate 
} from '../models/payroll.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class PayrollEditionService {
  private apiUrl = '/api/payroll-edition';
  private useMockData = true; // Mettre à false pour utiliser une vraie API

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) { }

  /**
   * Récupère la liste des bulletins de paie selon les filtres
   */
  getPaySlips(filter: PaySlipFilter): Observable<{ payslips: PaySlip[], total: number }> {
    if (!this.useMockData) {
      let params = new HttpParams()
        .set('page', filter.page.toString())
        .set('pageSize', filter.pageSize.toString());

      if (filter.month) params = params.set('month', filter.month);
      if (filter.year) params = params.set('year', filter.year.toString());
      if (filter.employeeId) params = params.set('employeeId', filter.employeeId.toString());
      if (filter.status) params = params.set('status', filter.status);

      return this.http.get<{ payslips: PaySlip[], total: number }>(`${this.apiUrl}/payslips`, { params }).pipe(
        catchError(error => {
          console.error('Error fetching pay slips', error);
          return throwError(() => new Error('Failed to load pay slips. Please try again later.'));
        })
      );
    }

    // Utilisation des données mock
    const filtered = this.mockDataService.filterPaySlips(
      filter.month,
      filter.year,
      filter.employeeId,
      filter.status
    );
    
    // Pagination
    const start = (filter.page - 1) * filter.pageSize;
    const end = start + filter.pageSize;
    const paginatedResults = filtered.slice(start, end);
    
    return of({
      payslips: paginatedResults,
      total: filtered.length
    }).pipe(delay(500));
  }

  /**
   * Récupère un bulletin de paie par son ID
   */
  getPaySlipById(id: number): Observable<PaySlip> {
    if (!this.useMockData) {
      return this.http.get<PaySlip>(`${this.apiUrl}/payslips/${id}`).pipe(
        catchError(error => {
          console.error(`Error fetching pay slip with id ${id}`, error);
          return throwError(() => new Error('Failed to load pay slip details. Please try again later.'));
        })
      );
    }
    
    const payslip = this.mockDataService.getPaySlipById(id);
    
    if (!payslip) {
      return throwError(() => new Error(`Pay slip with id ${id} not found`));
    }
    
    return of(payslip).pipe(delay(300));
  }

  /**
   * Génère des bulletins de paie pour les employés sélectionnés
   */
  generatePaySlips(options: PaySlipGenerationOptions): Observable<PaySlip[]> {
    if (!this.useMockData) {
      return this.http.post<PaySlip[]>(`${this.apiUrl}/generate`, options).pipe(
        catchError(error => {
          console.error('Error generating pay slips', error);
          return throwError(() => new Error('Failed to generate pay slips. Please try again later.'));
        })
      );
    }
    
    // Simulation de la génération de bulletins
    const generatedSlips: PaySlip[] = options.employeeIds.map(empId => {
      const existingEmployee = this.mockDataService.getPaySlips().find(p => p.employeeId === empId);
      
      return {
        id: 0, // Sera assigné par le service mockData
        employeeId: empId,
        employeeName: existingEmployee?.employeeName || `Employé ${empId}`,
        matricule: existingEmployee?.matricule || `EMP${String(empId).padStart(3, '0')}`,
        month: options.month,
        year: options.year,
        grossSalary: Math.floor(Math.random() * 2000) + 2000,
        netSalary: 0, // Calculé ci-dessous
        taxAmount: 0,
        socialContributions: 0,
        bonuses: options.includeBonus ? Math.floor(Math.random() * 200) : 0,
        deductions: 0,
        dateGenerated: new Date(),
        status: PaySlipStatus.DRAFT,
        filename: `bulletin_${existingEmployee?.matricule || `EMP${String(empId).padStart(3, '0')}`}_${options.year}_${String(options.month).padStart(2, '0')}.pdf`
      };
    });
    
    // Calculs pour simuler la génération
    generatedSlips.forEach(slip => {
      slip.taxAmount = Math.round(slip.grossSalary * 0.1);
      slip.socialContributions = Math.round(slip.grossSalary * 0.15);
      slip.netSalary = slip.grossSalary - slip.taxAmount - slip.socialContributions + slip.bonuses - slip.deductions;
      slip.status = PaySlipStatus.GENERATED;
    });
    
    const newPayslips = this.mockDataService.addPaySlips(generatedSlips);
    return of(newPayslips).pipe(delay(2000));
  }

  /**
   * Met à jour le statut d'un bulletin de paie
   */
  updatePaySlipStatus(id: number, status: PaySlipStatus): Observable<PaySlip> {
    if (!this.useMockData) {
      return this.http.patch<PaySlip>(`${this.apiUrl}/payslips/${id}/status`, { status }).pipe(
        catchError(error => {
          console.error(`Error updating pay slip status for id ${id}`, error);
          return throwError(() => new Error('Failed to update pay slip status. Please try again later.'));
        })
      );
    }
    
    try {
      const updatedPayslip = this.mockDataService.updatePaySlipStatus(id, status);
      return of(updatedPayslip).pipe(delay(300));
    } catch (error) {
      return throwError(() => error);
    }
  }

  /**
   * Récupère les modèles de bulletins disponibles
   */
  getPaySlipTemplates(): Observable<PaySlipTemplate[]> {
    if (!this.useMockData) {
      return this.http.get<PaySlipTemplate[]>(`${this.apiUrl}/templates`).pipe(
        catchError(error => {
          console.error('Error fetching pay slip templates', error);
          return throwError(() => new Error('Failed to load pay slip templates. Please try again later.'));
        })
      );
    }
    
    return of(this.mockDataService.getPaySlipTemplates()).pipe(delay(300));
  }

  /**
   * Télécharge un bulletin de paie au format PDF
   */
  downloadPaySlip(id: number): Observable<Blob> {
    if (!this.useMockData) {
      return this.http.get(`${this.apiUrl}/payslips/${id}/download`, { responseType: 'blob' }).pipe(
        catchError(error => {
          console.error(`Error downloading pay slip with id ${id}`, error);
          return throwError(() => new Error('Failed to download pay slip. Please try again later.'));
        })
      );
    }
    
    // Simulation de téléchargement - ceci créerait normalement un vrai PDF
    // Pour les besoins de la démo, on génère un blob de texte simple
    const payslip = this.mockDataService.getPaySlipById(id);
    
    if (!payslip) {
      return throwError(() => new Error(`Pay slip with id ${id} not found`));
    }
    
    const text = `Bulletin de paie pour ${payslip.employeeName} (${payslip.matricule})
Mois: ${payslip.month} ${payslip.year}
Salaire brut: ${payslip.grossSalary} €
Charges: ${payslip.socialContributions} €
Impôts: ${payslip.taxAmount} €
Primes: ${payslip.bonuses} €
Déductions: ${payslip.deductions} €
Salaire net: ${payslip.netSalary} €
    `;
    
    const blob = new Blob([text], { type: 'text/plain' });
    return of(blob).pipe(delay(1000));
  }
}