import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface RubriqueFixe {
  id: number;
  rubrique: string;
  designation: string;
  valeur: string;
}
@Component({
  selector: 'app-bulletin-model',
  imports: [CommonModule, FormsModule],
  templateUrl: './bulletin-model.component.html',
  styleUrl: './bulletin-model.component.scss'
})
export class BulletinModelComponent {

  bulletinModel: string = '';
  selectedRubrique: RubriqueFixe | null = null;
  compteAuxiliaire: string = '';
  sectionAnalytique: string = '';
  nomSection: string = '';
  
  rubriquesFixesData: RubriqueFixe[] = [
    { id: 1, rubrique: '001', designation: 'Salaire de base', valeur: '' },
    { id: 2, rubrique: '002', designation: 'Indemnité de transport', valeur: '' },
    { id: 3, rubrique: '003', designation: 'Prime d\'ancienneté', valeur: '' },
    { id: 4, rubrique: '004', designation: 'Heures supplémentaires', valeur: '' },
    { id: 5, rubrique: '005', designation: 'Cotisations sociales', valeur: '' }
  ];

  saveModel(): void {
    console.log('Saving model:', {
      bulletinModel: this.bulletinModel,
      rubriquesFixesData: this.rubriquesFixesData,
      ventilation: {
        compteAuxiliaire: this.compteAuxiliaire,
        sectionAnalytique: this.sectionAnalytique,
        nomSection: this.nomSection
      }
    });
   
  }

  openSectionAnalytiqueModal(): void {
    // This would typically open a modal for section analytique selection
    console.log('Open section analytique selection modal');
  }
  
  movePrevious(): void {
    console.log('Move to previous record');
  }
  
  moveFirst(): void {
    console.log('Move to first record');
  }
  
  moveNext(): void {
    console.log('Move to next record');
  }
  
  moveLast(): void {
    console.log('Move to last record');
  }
  

}
