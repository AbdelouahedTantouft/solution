import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-contrat-form",
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./contrat-form.component.html",
  styleUrl: "./contrat-form.component.scss",
})
export class ContratFormComponent {
  activePanel: string | null = null;
  options: string[] = ["Option 1", "Option 2", "Option 3"];
  employeeForm: FormGroup;

  contractTypeOptions = [
    "CDI",
    "CDD",
    "Stage",
    "Intérim",
    "Apprentissage",
    "Freelance",
  ];
  departureReasonOptions = [
    "Démission",
    "Licenciement",
    "Fin de contrat",
    "Retraite",
    "Autre",
  ];

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      // Position section
      poste: [""],
      fonction: [""],
      categorie: [""],
      service: [""],
      site: [""],

      // Establishment section
      etablissement: [""],
      filiale: [""],
      pole: [""],

      // Employment section
      categorieSociopro: [""],

      // Contract section
      dateEmbauche: [""],
      periodeEssai: [""],
      dateConfirmationPoste: [""],
      natureContrat: [""],
      dateDebut: [""],
      dateFin: [""],
      statut: ["Permanent"],

      // Departure section
      dateDepart: [""],
      motifDepart: [""],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log("Form submitted:", this.employeeForm.value);
  }

  togglePanel(panelKey: string) {
    this.activePanel = this.activePanel === panelKey ? null : panelKey;
  }

  isPanelOpen(panelKey: string): boolean {
    return this.activePanel === panelKey;
  }

  selectOption(option: string) {
    console.log("Option selected:", option);
    this.activePanel = null; // Close after selection
  }
}
