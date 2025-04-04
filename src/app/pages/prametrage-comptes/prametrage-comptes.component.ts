import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prametrage-comptes',
  imports: [CommonModule, ],
  templateUrl: './prametrage-comptes.component.html',
  styleUrl: './prametrage-comptes.component.scss'
})
export class PrametrageComptesComponent {

  features = [
    {
      title: 'Plan Comptable',
      //description: 'Posuere morbi leo urna molestie.',
      iconClass: 'pi pi-fw pi-folder text-yellow-700', // Dossier pour le plan comptable
      iconBg: 'bg-yellow-200',
      gradient: 'linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))'
    },
    {
      title: 'Plan Analytique',
      //description: 'Semper risus in hendrerit.',
      iconClass: 'pi pi-fw pi-chart-line text-cyan-700', // Graphique linéaire pour l'analyse
      iconBg: 'bg-cyan-200',
      gradient: 'linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(251, 199, 145, 0.2))'
    },
   
    {
      title: 'Interface Comptable',
      //description: 'Sécurisation et contrôle avancé des comptes.',
      iconClass: 'pi pi-fw pi-cog text-red-700', // Icône d'engrenage pour la gestion comptable
      iconBg: 'bg-red-200',
      gradient: 'linear-gradient(90deg, rgba(255, 102, 102, 0.2), rgba(172, 180, 223, 0.2))'
    },
    {
      title: 'Affectation Analytique',
      //description: 'Gérez facilement les utilisateurs et les permissions.',
      iconClass: 'pi pi-fw pi-sliders-h text-green-700', // Curseurs pour l'affectation analytique
      iconBg: 'bg-green-200',
      gradient: 'linear-gradient(90deg, rgba(145, 237, 171, 0.2), rgba(172, 180, 223, 0.2))'
    }
  ];
  
}  