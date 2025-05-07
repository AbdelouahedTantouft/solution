import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-step-one",
  imports: [],
  templateUrl: "./step-one.component.html",
  styleUrl: "./step-one.component.scss",
})
export class StepOneComponent {
  @Input() formGroup!: FormGroup;
  @Input() formErrors: {
    name: string | null;
    email: string | null;
    phone: string | null;
  } = {
    name: null,
    email: null,
    phone: null,
  };

  @Output() nextStep = new EventEmitter<void>();

  onNext(): void {
    if (this.formGroup.valid) {
      this.nextStep.emit();
    } else {
      this.markFormGroupTouched(this.formGroup);
    }
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}
