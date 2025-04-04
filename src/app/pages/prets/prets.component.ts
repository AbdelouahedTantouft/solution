import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter'; // Import PrimeNG Splitter Module

import { CommonModule } from '@angular/common';
import { TreeTableModule } from 'primeng/treetable';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';  // Importer le module FloatLabelModule
import { ButtonModule } from 'primeng/button'; 
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-prets',
  imports: [
    SplitterModule,
    
    CommonModule,
    TreeTableModule,
    FormsModule,
    FloatLabelModule,
    ButtonModule,
    RadioButtonModule,
  ],
  templateUrl: './prets.component.html',
  styleUrl: './prets.component.scss'
})
export class PretsComponent {

 

  value2: string = '';
  ingredient: string | undefined;
  
  ingredients = [
    { label: 'Cheese', value: 'Cheese' },
    { label: 'Mushroom', value: 'Mushroom' },
   
  ];
}
