import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { FormStateService } from "../../../core/state/salarie-form/form-state.service";

interface SocialOrganization {
  code: string;
  designation: string;
  type: string;
  registrationNumber: string;
  registrationDate: string;
  isEditing?: boolean;
}
@Component({
  selector: "app-organizations-socails-form",
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./organizations-socails-form.component.html",
  styleUrl: "./organizations-socails-form.component.scss",
})
export class OrganizationsSocailsFormComponent {
  oganismesForm: FormGroup;
  stepNumber: number = 4;
  organizations: SocialOrganization[] = [
    {
      code: "01",
      designation: "CNSS",
      type: "CNSS",
      registrationNumber: "",
      registrationDate: "",
    },
    {
      code: "02",
      designation: "CIMR 6%",
      type: "CIMR",
      registrationNumber: "",
      registrationDate: "",
    },
    {
      code: "03",
      designation: "MUTUELLE",
      type: "MUTUELLE",
      registrationNumber: "",
      registrationDate: "",
    },
    {
      code: "04",
      designation: "AMO",
      type: "MUTUELLE",
      registrationNumber: "",
      registrationDate: "",
    },
    {
      code: "05",
      designation: "CIMR 4.5 %",
      type: "CIMR",
      registrationNumber: "",
      registrationDate: "",
    },
  ];

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
    this.oganismesForm = this.fb.group({
      // Position section
      CNSSRegistrationNumber: [""],
      CNSSRegistrationDate: [""],
      CIMRRegistrationNumber: [""],
      CIMRRegistrationDate: [""],
      MUTUELLERegistrationNumber: [""],
      MUTUELLERegistrationDate: [""],
      CIMR4RegistrationNumber: [""],
      CIMR4RegistrationDate: [""],
      AMORegistrationNumber: [""],
      AMORegistrationDate: [""],
    });
  }

  ngOnInit(): void {
    // Load saved form data if available
    const savedData = this.formStateService.getStepFormData(this.stepNumber);
    if (savedData) {
      this.oganismesForm.patchValue(savedData);
    }
  }

  editOrganization(org: SocialOrganization): void {
    org.isEditing = true;
  }

  saveOrganization(org: SocialOrganization): void {
    org.isEditing = false;
    console.log("Saved:", org);
  }

  saveFormData(): void {
    this.formStateService.updateFormData(
      this.stepNumber,
      this.oganismesForm.value
    );

    this.formStateService.updateStepState(this.stepNumber, {
      valid: this.oganismesForm.valid,
      completed: this.oganismesForm.dirty || this.oganismesForm.touched,
    });
  }

  onSaveAndContinue(): void {
    if (this.oganismesForm.invalid) {
      this.markFormGroupTouched(this.oganismesForm);
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
