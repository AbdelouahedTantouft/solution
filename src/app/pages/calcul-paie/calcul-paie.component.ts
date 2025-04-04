import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms'; 
import { ButtonModule } from 'primeng/button'; 
import { CalendarModule } from 'primeng/calendar'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel'; 


@Component({
  selector: 'app-calcul-paie',
  imports: [DropdownModule,
    FormsModule,
    ButtonModule,
    FloatLabelModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './calcul-paie.component.html',
  styleUrl: './calcul-paie.component.scss'
})
export class CalculPaieComponent {


  
  selectedMois: string = '';
  mois: any[] = [
    { label: 'Janvier', value: 'janvier' },
    { label: 'Février', value: 'fevrier' },
    { label: 'Mars', value: 'mars' },
    { label: 'Avril', value: 'avril' },
    { label: 'Mai', value: 'mai' },
    { label: 'Juin', value: 'juin' },
    { label: 'Juillet', value: 'juillet' },
    { label: 'Août', value: 'aout' },
    { label: 'Septembre', value: 'septembre' },
    { label: 'Octobre', value: 'octobre' },
    { label: 'Novembre', value: 'novembre' },
    { label: 'Décembre', value: 'decembre' }
  ];

  selectedNom: string = '';
  Nom: any[] = [
    { label: 'Jjjjj', value: 'jjjjj' },
    
  ];
  value2: string = '';
  date: Date = new Date(); 
 
 
}
