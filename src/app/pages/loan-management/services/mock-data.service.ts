import { Injectable } from '@angular/core';
import { Loan, RubriqueSearchResult } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // Données mock pour les prêts
  private loans: Loan[] = [
    {
      id: 1,
      code: 'CT001',
      designation: 'Prêt voiture',
      typeDePret: 'AUTO',
      rubriqueMontantPret: 'RMP001',
      rubriqueMontantEcheance: 'RME001',
      rubriqueSoldePret: 'RSP001',
      isShortTerm: true
    },
    {
      id: 2,
      code: 'CT002',
      designation: 'Prêt équipement',
      typeDePret: 'EQUIP',
      rubriqueMontantPret: 'RMP002',
      rubriqueMontantEcheance: 'RME002',
      rubriqueSoldePret: 'RSP002',
      isShortTerm: true
    },
    {
      id: 3,
      code: 'LT001',
      designation: 'Prêt immobilier',
      typeDePret: 'IMMOB',
      rubriqueMontantPret: 'RMP003',
      rubriqueMontantEcheance: 'RME003',
      rubriqueSoldePret: 'RSP003',
      isShortTerm: false
    },
    {
      id: 4,
      code: 'LT002',
      designation: 'Prêt éducation',
      typeDePret: 'EDUC',
      rubriqueMontantPret: 'RMP004',
      rubriqueMontantEcheance: 'RME004',
      rubriqueSoldePret: 'RSP004',
      isShortTerm: false
    }
  ];

  // Résultats de recherche mock pour différents types de rubriques
  private typeDePretResults: RubriqueSearchResult[] = [
    { code: 'AUTO', name: 'Prêt automobile' },
    { code: 'EQUIP', name: 'Prêt équipement' },
    { code: 'IMMOB', name: 'Prêt immobilier' },
    { code: 'EDUC', name: 'Prêt éducation' },
    { code: 'PERSO', name: 'Prêt personnel' },
    { code: 'PROF', name: 'Prêt professionnel' }
  ];

  private montantPretResults: RubriqueSearchResult[] = [
    { code: 'RMP001', name: 'Rubrique montant prêt auto' },
    { code: 'RMP002', name: 'Rubrique montant prêt équipement' },
    { code: 'RMP003', name: 'Rubrique montant prêt immobilier' },
    { code: 'RMP004', name: 'Rubrique montant prêt éducation' },
    { code: 'RMP005', name: 'Rubrique montant prêt personnel' }
  ];

  private echeanceResults: RubriqueSearchResult[] = [
    { code: 'RME001', name: 'Rubrique échéance prêt auto' },
    { code: 'RME002', name: 'Rubrique échéance prêt équipement' },
    { code: 'RME003', name: 'Rubrique échéance prêt immobilier' },
    { code: 'RME004', name: 'Rubrique échéance prêt éducation' },
    { code: 'RME005', name: 'Rubrique échéance prêt personnel' }
  ];

  private soldePretResults: RubriqueSearchResult[] = [
    { code: 'RSP001', name: 'Rubrique solde prêt auto' },
    { code: 'RSP002', name: 'Rubrique solde prêt équipement' },
    { code: 'RSP003', name: 'Rubrique solde prêt immobilier' },
    { code: 'RSP004', name: 'Rubrique solde prêt éducation' },
    { code: 'RSP005', name: 'Rubrique solde prêt personnel' }
  ];

  constructor() { }

  // Récupérer tous les prêts
  getLoans(): Loan[] {
    return [...this.loans];
  }

  // Récupérer un prêt par ID
  getLoanById(id: number): Loan | undefined {
    return this.loans.find(loan => loan.id === id);
  }

  // Ajouter un nouveau prêt
  createLoan(loan: Loan): Loan {
    // Générer un nouvel ID
    const newId = Math.max(...this.loans.map(l => l.id ?? 0)) + 1;
    
    // Créer le nouvel objet prêt avec l'ID généré
    const newLoan: Loan = {
      ...loan,
      id: newId
    };
    
    // Ajouter au tableau des prêts
    this.loans.push(newLoan);
    
    return newLoan;
  }

  // Mettre à jour un prêt existant
  updateLoan(loan: Loan): Loan {
    const index = this.loans.findIndex(l => l.id === loan.id);
    
    if (index !== -1) {
      this.loans[index] = { ...loan };
      return this.loans[index];
    }
    
    throw new Error(`Prêt avec ID ${loan.id} non trouvé.`);
  }

  // Supprimer un prêt
  deleteLoan(id: number): void {
    const index = this.loans.findIndex(loan => loan.id === id);
    
    if (index !== -1) {
      this.loans.splice(index, 1);
    } else {
      throw new Error(`Prêt avec ID ${id} non trouvé.`);
    }
  }

  // Rechercher des rubriques selon le type de champ
  searchRubriques(fieldType: string): RubriqueSearchResult[] {
    switch (fieldType) {
      case 'typeDePret':
        return [...this.typeDePretResults];
      case 'rubriqueMontantPret':
        return [...this.montantPretResults];
      case 'rubriqueMontantEcheance':
        return [...this.echeanceResults];
      case 'rubriqueSoldePret':
        return [...this.soldePretResults];
      default:
        return [];
    }
  }
}