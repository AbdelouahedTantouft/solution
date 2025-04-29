import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';

@Component({
  selector: 'app-payroll-edition',
   templateUrl: './payroll-edition.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
 
})
export class PayrollEditionComponent implements OnInit {
  // Données pour les options de sélection
  nomEtatOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  moisOptions: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  
  // Valeurs du formulaire
  categorie: string = '';
  service: string = '';
  site: string = '';
  matricule1: string = '';
  matricule2: string = '';
  nom1: string = '';
  nom2: string = '';
  selectedNomEtat: string = '';
  selectedMois: string = 'Janvier';
  
  // État de zoom et pagination
  zoomFactor: number = 100;
  currentPage: number = 1;
  totalPages: number = 0;
  
  // Message de notification
  notificationMessage: string = '';
  messageType: 'success' | 'error' | 'info' = 'info';
  
  constructor() { }

  ngOnInit(): void {
    // Initialiser avec des données par défaut
    this.totalPages = 1;
  }

  // Actions des boutons
  nouveau(): void {
    this.reset();
    this.showNotification('Nouveau bulletin créé', 'success');
  }

  imprimer(): void {
    this.showNotification('Impression en cours...', 'info');
    // Logique d'impression à implémenter
  }

  exporter(): void {
    this.showNotification('Exportation en cours...', 'info');
    // Logique d'exportation à implémenter
  }

  // Navigation dans le rapport
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  firstPage(): void {
    this.currentPage = 1;
  }

  lastPage(): void {
    this.currentPage = this.totalPages;
  }

  // Fonctions de zoom
  zoomIn(): void {
    if (this.zoomFactor < 200) {
      this.zoomFactor += 10;
    }
  }

  zoomOut(): void {
    if (this.zoomFactor > 50) {
      this.zoomFactor -= 10;
    }
  }

  // Réinitialiser le formulaire
  reset(): void {
    this.categorie = '';
    this.service = '';
    this.site = '';
    this.matricule1 = '';
    this.matricule2 = '';
    this.nom1 = '';
    this.nom2 = '';
    this.selectedNomEtat = '';
    this.selectedMois = 'Janvier';
    this.currentPage = 1;
  }

  // Rechercher un bulletin
  search(): void {
    // Simuler une recherche
    this.totalPages = Math.floor(Math.random() * 5) + 1;
    this.currentPage = 1;
    this.showNotification('Recherche effectuée', 'success');
  }

  // Afficher une notification temporaire
  showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    this.notificationMessage = message;
    this.messageType = type;
    
    setTimeout(() => {
      this.notificationMessage = '';
    }, 3000);
  }
}