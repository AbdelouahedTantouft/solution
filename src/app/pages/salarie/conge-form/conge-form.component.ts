import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { FormStateService } from "../../../core/state/salarie-form/form-state.service";

@Component({
  selector: "app-conge-form",
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: "./conge-form.component.html",
  styleUrl: "./conge-form.component.scss",
})
export class CongeFormComponent {
  leaveForm: FormGroup;
  months = [
    "SOLDE :",
    "JANVIER",
    "FÉVRIER",
    "MARS",
    "AVRIL",
    "MAI",
    "JUIN",
    "JUILLET",
    "AOÛT",
    "SEPTEMBRE",
    "OCTOBRE",
    "NOVEMBRE",
    "DÉCEMBRE",
  ];

  leaveData: any[] = [];
  stepNumber: number = 7;

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
    this.leaveForm = this.fb.group({
      soldeConge: [""],
      regulConge: [""],
      acquisType: ["calculé"],
      valeurAcquisAnnuelle: [""],
    });
    this.leaveData = this.months.map((month) => ({
      month,
      daysAccrued: 0,
      daysTaken: 0,
      balance: 0,
    }));
  }

  calculate() {
    // Implement calculation logic here
    const acquisType = this.leaveForm.get("acquisType")?.value;
    const annualValue = parseFloat(
      this.leaveForm.get("valeurAcquisAnnuelle")?.value || "0"
    );
    const initialBalance = parseFloat(
      this.leaveForm.get("soldeCongé")?.value || "0"
    );

    let runningBalance = initialBalance;

    if (acquisType === "calculé") {
      // Monthly accrual calculation
      const monthlyAccrual = annualValue / 12;

      this.leaveData.forEach((data, index) => {
        data.daysAccrued = parseFloat(monthlyAccrual.toFixed(2));
        // Assuming daysTaken is manually entered
        runningBalance = runningBalance + data.daysAccrued - data.daysTaken;
        data.balance = parseFloat(runningBalance.toFixed(2));
      });
    } else {
      // Fixed accrual - apply once at beginning
      this.leaveData[0].daysAccrued = annualValue;
      runningBalance += annualValue;
      this.leaveData[0].balance = runningBalance;

      for (let i = 1; i < this.leaveData.length; i++) {
        this.leaveData[i].daysAccrued = 0;
        runningBalance -= this.leaveData[i].daysTaken;
        this.leaveData[i].balance = runningBalance;
      }
    }
  }

  save() {
    // Implement save functionality
    console.log("Form data:", this.leaveForm.value);
    console.log("Leave data:", this.leaveData);
    const mergedData = {
      ...this.leaveForm.value,
      ...this.leaveData,
    };
    this.formStateService.updateFormData(this.stepNumber, mergedData);
    console.log("SALARIE OBJECT-----------------------------------");
    console.log(this.formStateService.formData$);
    this.formStateService.nextStep();
  }

  updateDaysTaken(month: any, event: any) {
    const value = parseFloat(event.target.value || "0");
    month.daysTaken = value;
    this.calculate();
  }

  updateDaysAccrued(month: any, event: any) {
    const value = parseFloat(event.target.value || "0");
    month.daysAccrued = value;
    this.calculate();
  }

  firstPage() {
    // Navigation logic
  }

  previousPage() {
    // Navigation logic
  }

  nextPage() {
    // Navigation logic
  }

  lastPage() {
    // Navigation logic
  }
}
