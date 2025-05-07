import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-stepper",
  imports: [CommonModule],
  templateUrl: "./stepper.component.html",
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent {
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 8;

  stepTitles: string[] = [
    "Etat civil",
    "Conjoint",
    "Contrat de travail",
    "Organismes sociaux",
    "Coordonnée bancaire",
    "Elément de paie",
    "Gestion congé",
  ];

  ngOnInit(): void {
    // Ensure current step is valid
    if (this.currentStep < 1) {
      this.currentStep = 1;
    } else if (this.currentStep > this.totalSteps) {
      this.currentStep = this.totalSteps;
    }
  }
}
