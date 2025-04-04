import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DatabaseRecord {
  year: string;
  code: string;
  companyName: string;
  databaseName: string;
  newDatabaseName: string;
  status: 'valid' | 'invalid' | 'pending';
}

@Component({
  selector: 'app-database-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './annual-treatment.component.html',
  styleUrls: ['./annual-treatment.component.scss']
})
export class AnnualTreatmentComponent implements OnInit {
  databaseRecords: DatabaseRecord[] = [
    {
      year: '2023',
      code: '01',
      companyName: 'TEST EAT',
      databaseName: 'CLOEB_PAIE_2023',
      newDatabaseName: '',
      status: 'valid'
    }
  ];
  
  processStatus: 'in-progress' | 'completed' | 'failed' = 'completed';
  searchTerm: string = '';
  activeTab: string = 'annual-closing';

  tabs = [
    { id: 'annual-closing', label: 'Traitement clôture annuelle', icon: 'file-text' },
    { id: 'process-status', label: 'Traitement terminé', icon: 'check-circle' },
    { id: 'database-verification', label: 'Vérification les noms des bases de données', icon: 'database' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialize or fetch data
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  exportData(): void {
    console.log('Exporting data');
  }

  addNewRecord(): void {
    console.log('Adding new record');
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'valid': return 'Valide';
      case 'invalid': return 'Invalide';
      case 'pending': return 'En attente';
      default: return '';
    }
  }
}