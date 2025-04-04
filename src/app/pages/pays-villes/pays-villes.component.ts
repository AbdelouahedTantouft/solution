import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pays-villes',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './pays-villes.component.html',
  styleUrl: './pays-villes.component.scss'
})
export class PaysVillesComponent {
  categories = [
    { title: 'Nationalité', items: ['Africaine', 'Algerienne', 'Allemande', 'Anglaise', 'Argentine', 'Asiatique', 'Australienne', 'Autrichienne','péruvien', 'portoricain', 'portugaise', 'AAAAAAAAA','AAAAAAAA', 'OOOOOOO', 'EEEEEEE', 'HHHHHH', 'IIIIIIIII'], searchText: '' },
    { title: 'Pays', items: ['Danemark', 'Guatemala', 'Japon'], searchText: '' },
    { title: 'Ville', items: ['Agadir', 'Aghbala', 'Ain Leuh'], searchText: '' },
    { title: 'Banque', items: ['BMCE', 'BMCI', 'BP'], searchText: '' }
  ];

  filterList(items: string[], searchText: string) {
    return items.filter(item => item.toLowerCase().includes(searchText.toLowerCase()));
  }

  addItem(category: any) {
    const newItem = prompt(`Ajouter un élément à ${category.title} :`);
    if (newItem) {
      category.items.push(newItem);
    }
  }
}