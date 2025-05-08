import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormStateService } from "../../../core/state/salarie-form/form-state.service";

@Component({
  selector: "app-etat-civil-etap2",
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: "./etat-civil-etap2.component.html",
  styleUrl: "./etat-civil-etap2.component.scss",
})
export class EtatCivilEtap2Component {
  formulaireIdentite!: FormGroup;
  formErrors: any = {};
  stepNumber: number = 2;

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
    this.formulaireIdentite = this.fb.group({
      sexe2: [""],
      nationalite2: [""],
      nom2: [""],
      activite: [""],
      dateNaissance2: [""],
      prenom: [""],
      lieuNaissance2: [""],
    });
  }

  ngOnInit(): void {
    // Load saved form data if available
    const savedData = this.formStateService.getStepFormData(2);
    if (savedData) {
      this.formulaireIdentite.patchValue(savedData);
    }
  }

  validateForm() {}

  saveFormData(): void {
    this.formStateService.updateFormData(
      this.stepNumber,
      this.formulaireIdentite.value
    );
    this.formStateService.updateStepState(this.stepNumber, {
      valid: this.formulaireIdentite.valid,
      completed:
        this.formulaireIdentite.dirty || this.formulaireIdentite.touched,
    });
  }

  onSaveAndContinue(): void {
    console.log(this.formulaireIdentite.value);
    console.log(this.formulaireIdentite.valid);
    /* if (this.formulaireIdentite.invalid) {
      this.markFormGroupTouched(this.formulaireIdentite);
      return;
    } */

    this.saveFormData();
    this.formStateService.nextStep();
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
