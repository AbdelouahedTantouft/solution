import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { FormStateService } from "../../../core/state/salarie-form/form-state.service";

interface RubriqueFixe {
  id: number;
  rubrique: string;
  designation: string;
  valeur: string;
}
@Component({
  selector: "app-bulletin-model",
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./bulletin-model.component.html",
  styleUrl: "./bulletin-model.component.scss",
})
export class BulletinModelComponent {
  rubriquesForm!: FormGroup;

  bulletinModel: string = "";
  selectedRubrique: RubriqueFixe | null = null;
  compteAuxiliaire: string = "";
  sectionAnalytique: string = "";
  nomSection: string = "";
  stepNumber: number = 6;

  rubriquesFixesData: RubriqueFixe[] = [
    { id: 1, rubrique: "001", designation: "Salaire de base", valeur: "" },
    {
      id: 2,
      rubrique: "002",
      designation: "Indemnité de transport",
      valeur: "",
    },
    { id: 3, rubrique: "003", designation: "Prime d'ancienneté", valeur: "" },
    {
      id: 4,
      rubrique: "004",
      designation: "Heures supplémentaires",
      valeur: "",
    },
    { id: 5, rubrique: "005", designation: "Cotisations sociales", valeur: "" },
  ];

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
    this.rubriquesForm = this.fb.group({
      salaireBase: [""],
      indemniteTransport: [""],
      primeAnciennete: [""],
      heuresSupp: [""],
      cotisationsSociales: [""],
      NCompteAuxiliaire: [""],
      nomSection: [""],
      sectionAnalytic: [""],
    });
  }
  ngOnInit(): void {
    // Load saved form data if available
    const savedData = this.formStateService.getStepFormData(this.stepNumber);
    if (savedData) {
      this.rubriquesForm.patchValue(savedData);
    }
  }

  saveModel(): void {
    console.log("Saving model:", {
      bulletinModel: this.bulletinModel,
      rubriquesFixesData: this.rubriquesFixesData,
      ventilation: {
        compteAuxiliaire: this.compteAuxiliaire,
        sectionAnalytique: this.sectionAnalytique,
        nomSection: this.nomSection,
      },
    });
  }

  openSectionAnalytiqueModal(): void {
    // This would typically open a modal for section analytique selection
    console.log("Open section analytique selection modal");
  }

  movePrevious(): void {
    console.log("Move to previous record");
  }

  moveFirst(): void {
    console.log("Move to first record");
  }

  moveNext(): void {
    console.log("Move to next record");
  }

  moveLast(): void {
    console.log("Move to last record");
  }

  saveFormData(): void {
    this.formStateService.updateFormData(
      this.stepNumber,
      this.rubriquesForm.value
    );

    this.formStateService.updateStepState(this.stepNumber, {
      valid: this.rubriquesForm.valid,
      completed: this.rubriquesForm.dirty || this.rubriquesForm.touched,
    });
  }

  onSaveAndContinue(): void {
    console.log(this.rubriquesForm.value);
    console.log(this.rubriquesForm.valid);
    if (this.rubriquesForm.invalid) {
      this.markFormGroupTouched(this.rubriquesForm);
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
