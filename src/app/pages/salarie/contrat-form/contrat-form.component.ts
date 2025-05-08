import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { FormStateService } from "../../../core/state/salarie-form/form-state.service";
import { MatSelectModule } from "@angular/material/select";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

@Component({
  selector: "app-contrat-form",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  templateUrl: "./contrat-form.component.html",
  styleUrl: "./contrat-form.component.scss",
})
export class ContratFormComponent {
  activePanel: string | null = null;
  options: string[] = ["Option 1", "Option 2", "Option 3"];
  employeeForm: FormGroup;
  stepNumber: number = 3;
  searchInputs: any = {
    fonction: {
      value: "",
      options: ["Développeur", "Designer", "Manager", "Chef de projet"],
      filtered: [],
      open: false,
    },
    categorie: {
      value: "",
      options: ["Informatique", "Santé", "Éducation", "Artisanat"],
      filtered: [],
      open: false,
    },
    service: {
      value: "",
      options: ["Consultation", "Urgence", "Radiologie", "Chirurgie"],
      filtered: [],
      open: false,
    },
    site: {
      value: "",
      options: ["Site1", "Site2", "Site3", "Site4"],
      filtered: [],
      open: false,
    },
    filiale: {
      value: "",
      options: ["Filiale 1", "Filiale 2", "Filiale 3", "Filiale 4"],
      filtered: [],
      open: false,
    },
    pole: {
      value: "",
      options: ["Pôle A", "Pôle B", "Pôle C", "Pôle D"],
      filtered: [],
      open: false,
    },
    categorieSociopro: {
      value: "",
      options: ["Cadre", "Technicien", "Employé", "Ouvrier"],
      filtered: [],
      open: false,
    },
    emploi: {
      value: "",
      options: ["Temps plein", "Temps partiel", "Freelance", "Stage"],
      filtered: [],
      open: false,
    },
  };

  searchTerm: string = "";
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

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
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

  ngOnInit(): void {
    const savedData = this.formStateService.getStepFormData(this.stepNumber);
    if (savedData) {
      this.employeeForm.patchValue(savedData);
    }
  }

  onSubmit(): void {
    console.log("Form submitted:", this.employeeForm.value);
    // Load saved form data if available
    const savedData = this.formStateService.getStepFormData(2);
    console.log("STEP 2 SAVED DATA");

    if (savedData) {
      this.employeeForm.patchValue(savedData);
    }
  }

  filterOptions(key: string) {
    const term = this.searchInputs[key].value.toLowerCase();
    this.searchInputs[key].filtered = this.searchInputs[key].options.filter(
      (opt) => opt.toLowerCase().includes(term)
    );
  }

  togglePanel(key: string) {
    this.searchInputs[key].open = !this.searchInputs[key].open;
    if (this.searchInputs[key].open) {
      this.filterOptions(key);
    }
  }

  openPanel(key: string) {
    this.searchInputs[key].open = true;
    this.filterOptions(key);
  }

  isPanelOpen(key: string): boolean {
    return this.searchInputs[key].open;
  }

  onInputChange(key: string, value: string): void {
    this.searchInputs[key].value = value;
    this.filterOptions(key); // on filtre dynamiquement selon la saisie
  }

  selectOption(key: string, option: string) {
    this.searchInputs[key].value = option;
    this.searchInputs[key].open = false;
  }

  saveFormData(): void {
    this.formStateService.updateFormData(
      this.stepNumber,
      this.employeeForm.value
    );

    this.formStateService.updateStepState(this.stepNumber, {
      valid: this.employeeForm.valid,
      completed: this.employeeForm.dirty || this.employeeForm.touched,
    });
  }

  onSaveAndContinue(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.valid);
    if (this.employeeForm.invalid) {
      this.markFormGroupTouched(this.employeeForm);
      return;
    }

    this.saveFormData();
    this.formStateService.nextStep();
    console.log(this.formStateService.getStepFormData(this.stepNumber));
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
