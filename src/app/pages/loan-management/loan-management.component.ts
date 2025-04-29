import {Component, importProvidersFrom, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Loan, RubriqueSearchResult } from './models/loan.model';
import { LoanService } from './services/loan.service';
import { CommonModule } from '@angular/common';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';

@Component({
  selector: 'app-loan-management',
  templateUrl: './loan-management.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoanManagementComponent implements OnInit {
  // Propriétés pour la gestion des onglets
  activeTab: 'short-term' | 'long-term' = 'short-term';

  // Propriétés pour la liste des prêts
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  searchTerm: string = '';

  // Propriétés pour la pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;

  // Propriétés pour la gestion du formulaire
  loanForm: FormGroup;
  isEditMode: boolean = false;
  selectedLoanId: number | null = null;

  // Propriétés pour les recherches de rubriques
  typeDePretOptions: RubriqueSearchResult[] = [];
  montantPretOptions: RubriqueSearchResult[] = [];
  echeanceOptions: RubriqueSearchResult[] = [];
  soldePretOptions: RubriqueSearchResult[] = [];

  // État de chargement et erreurs
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private loanService: LoanService,
    private fb: FormBuilder
  ) {
    this.loanForm = this.createLoanForm();
  }

  ngOnInit(): void {
    this.loadLoans();
    this.loadRubriquesOptions();
  }

  // Création du formulaire avec validation
  createLoanForm(): FormGroup {
    return this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(10)]],
      designation: ['', [Validators.required, Validators.maxLength(100)]],
      typeDePret: ['', Validators.required],
      rubriqueMontantPret: ['', Validators.required],
      rubriqueMontantEcheance: ['', Validators.required],
      rubriqueSoldePret: ['', Validators.required],
      isShortTerm: [true]
    });
  }

  // Chargement des prêts depuis le service
  loadLoans(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.loanService.getLoans().subscribe({
      next: (loans) => {
        this.loans = loans;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Une erreur est survenue lors du chargement des prêts.';
        this.isLoading = false;
      }
    });
  }

  // Chargement des options de rubriques pour les champs de formulaire
  loadRubriquesOptions(): void {
    // Chargement des types de prêts
    this.loanService.searchRubriques('typeDePret').subscribe({
      next: (results) => this.typeDePretOptions = results,
      error: (error) => console.error('Erreur lors du chargement des types de prêts', error)
    });

    // Chargement des rubriques montant prêt
    this.loanService.searchRubriques('rubriqueMontantPret').subscribe({
      next: (results) => this.montantPretOptions = results,
      error: (error) => console.error('Erreur lors du chargement des rubriques montant prêt', error)
    });

    // Chargement des rubriques montant échéance
    this.loanService.searchRubriques('rubriqueMontantEcheance').subscribe({
      next: (results) => this.echeanceOptions = results,
      error: (error) => console.error('Erreur lors du chargement des rubriques échéance', error)
    });

    // Chargement des rubriques solde prêt
    this.loanService.searchRubriques('rubriqueSoldePret').subscribe({
      next: (results) => this.soldePretOptions = results,
      error: (error) => console.error('Erreur lors du chargement des rubriques solde prêt', error)
    });
  }

  // Recherche et filtrage des prêts
  applyFilters(): void {
    this.filteredLoans = this.loans.filter(loan => {
      // Filtrer par type de prêt (court ou long terme)
      const matchesTab = (this.activeTab === 'short-term' && loan.isShortTerm) ||
                         (this.activeTab === 'long-term' && !loan.isShortTerm);

      // Filtrer par terme de recherche (si présent)
      const matchesSearch = !this.searchTerm ||
                           loan.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           loan.designation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           loan.typeDePret.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    });

    this.totalItems = this.filteredLoans.length;
    this.currentPage = 1; // Réinitialiser à la première page après un filtrage
  }

  // Changer d'onglet (court terme / long terme)
  setActiveTab(tab: 'short-term' | 'long-term'): void {
    this.activeTab = tab;
    this.applyFilters();

    // Mettre à jour le formulaire avec la valeur de isShortTerm appropriée
    this.loanForm.patchValue({
      isShortTerm: tab === 'short-term'
    });
  }

  // Rechercher des prêts
  searchLoans(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  // Pagination
  get paginatedLoans(): Loan[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredLoans.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number[] {
    const pagesCount = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }

  // Gestion du formulaire
  resetForm(): void {
    this.loanForm.reset({
      isShortTerm: this.activeTab === 'short-term'
    });
    this.isEditMode = false;
    this.selectedLoanId = null;
  }

  editLoan(loan: Loan): void {
    this.isEditMode = true;
    this.selectedLoanId = loan.id;

    // Mettre à jour l'onglet actif en fonction du type de prêt
    this.setActiveTab(loan.isShortTerm ? 'short-term' : 'long-term');

    // Remplir le formulaire avec les données du prêt sélectionné
    this.loanForm.patchValue({
      code: loan.code,
      designation: loan.designation,
      typeDePret: loan.typeDePret,
      rubriqueMontantPret: loan.rubriqueMontantPret,
      rubriqueMontantEcheance: loan.rubriqueMontantEcheance,
      rubriqueSoldePret: loan.rubriqueSoldePret,
      isShortTerm: loan.isShortTerm
    });
  }

  submitForm(): void {
    if (this.loanForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.loanForm.controls).forEach(key => {
        const control = this.loanForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    const formData = this.loanForm.value;

    // Préparation de l'objet prêt
    const loan: Loan = {
      id: this.isEditMode ? this.selectedLoanId : null,
      code: formData.code,
      designation: formData.designation,
      typeDePret: formData.typeDePret,
      rubriqueMontantPret: formData.rubriqueMontantPret,
      rubriqueMontantEcheance: formData.rubriqueMontantEcheance,
      rubriqueSoldePret: formData.rubriqueSoldePret,
      isShortTerm: formData.isShortTerm
    };

    this.isLoading = true;

    if (this.isEditMode) {
      // Mise à jour d'un prêt existant
      this.loanService.updateLoan(loan).subscribe({
        next: () => {
          this.loadLoans();
          this.resetForm();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Erreur lors de la mise à jour du prêt.';
          this.isLoading = false;
        }
      });
    } else {
      // Création d'un nouveau prêt
      this.loanService.createLoan(loan).subscribe({
        next: () => {
          this.loadLoans();
          this.resetForm();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Erreur lors de la création du prêt.';
          this.isLoading = false;
        }
      });
    }
  }

  // Suppression d'un prêt
  deleteLoan(loan: Loan): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le prêt "${loan.designation}" ?`)) {
      this.isLoading = true;

      this.loanService.deleteLoan(loan.id).subscribe({
        next: () => {
          this.loadLoans();
          if (this.selectedLoanId === loan.id) {
            this.resetForm();
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Erreur lors de la suppression du prêt.';
          this.isLoading = false;
        }
      });
    }
  }

  // Helpers pour la validation du formulaire
  hasError(controlName: string, errorName: string): boolean {
    const control = this.loanForm.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
}
