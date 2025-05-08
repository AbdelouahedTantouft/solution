import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { FormStateService } from "../../../core/state/salarie-form/form-state.service";

interface BankInfo {
  name: string;
  agency: string;
  rib: string;
}

@Component({
  selector: "app-bank-payment-form",
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./bank-payment-form.component.html",
  styleUrl: "./bank-payment-form.component.scss",
})
export class BankPaymentFormComponent {
  formulairePayment!: FormGroup;
  stepNumber: number = 5;

  paymentModes: string[] = ["Virement", "Chèque", "Espèces", "Carte bancaire"];
  selectedPaymentMode: string = "";

  banks: string[] = [
    "Attijariwafa Bank",
    "BMCE Bank",
    "Banque Populaire",
    "CIH Bank",
    "Crédit Agricole",
    "Crédit du Maroc",
  ];

  bankInfo1: BankInfo = {
    name: "",
    agency: "",
    rib: "",
  };

  bankInfo2: BankInfo = {
    name: "",
    agency: "",
    rib: "",
  };

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
    this.formulairePayment = this.fb.group({
      paymentMode: [""],
      agency1: [""],
      bankNom1: [""],
      bankRib1: [""],
      bankNom2: [""],
      agency2: [""],
      bankRib2: [""],
    });
  }

  ngOnInit(): void {
    // Load saved form data if available
    const savedData = this.formStateService.getStepFormData(this.stepNumber);
    if (savedData) {
      this.formulairePayment.patchValue(savedData);
    }
  }
  saveForm(): void {
    console.log("Payment Mode:", this.selectedPaymentMode);
    console.log("Bank 1:", this.bankInfo1);
    console.log("Bank 2:", this.bankInfo2);
  }

  saveFormData(): void {
    this.formStateService.updateFormData(
      this.stepNumber,
      this.formulairePayment.value
    );

    this.formStateService.updateStepState(this.stepNumber, {
      valid: this.formulairePayment.valid,
      completed: this.formulairePayment.dirty || this.formulairePayment.touched,
    });
  }

  onSaveAndContinue(): void {
    console.log(this.formulairePayment.value);
    console.log(this.formulairePayment.valid);
    if (this.formulairePayment.invalid) {
        this.markFormGroupTouched(this.formulairePayment);
        return;
      } 

    this.saveFormData();
      this.formStateService.nextStep();
      console.log(this.formStateService.getStepFormData(2));
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
