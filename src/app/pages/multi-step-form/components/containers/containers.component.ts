import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-containers",
  imports: [],
  templateUrl: "./containers.component.html",
  styleUrl: "./containers.component.scss",
})
export class ContainersComponent {
  form!: FormGroup;
  currentStep = 1;
  formErrors = {
    name: null as string | null,
    email: null as string | null,
    phone: null as string | null,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.form = this.fb.group({
      personalInfo: this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,}$/)]]
      }),
      plan: ['arcade', Validators.required],
      billingPeriod: [false], // false = monthly, true = yearly
      addons: this.fb.group({
        onlineService: [false],
        largerStorage: [false],
        customizableProfile: [false]
      })
    });
    
    // Listen for validation errors
    this.form.get('personalInfo')?.valueChanges.subscribe(() => {
      this.validatePersonalInfo();
    });
  }
  
  validatePersonalInfo(): void {
    const personalInfoForm = this.form.get('personalInfo');
    
    if (personalInfoForm) {
      this.formErrors = {
        name: personalInfoForm.get('name')?.errors?.['required'] ? 'Name is required' : null,
        email: personalInfoForm.get('email')?.errors?.['required'] 
          ? 'Email is required'
          : personalInfoForm.get('email')?.errors?.['email'] 
            ? 'Email is invalid'
            : null,
        phone: personalInfoForm.get('phone')?.errors?.['required']
          ? 'Phone is required'
          : personalInfoForm.get('phone')?.errors?.['pattern']
            ? 'Phone number is invalid'
            : null
      };
    }
  }
  
  nextStep(): void {
    if (this.currentStep === 1) {
      const personalInfoForm = this.form.get('personalInfo');
      if (personalInfoForm?.valid) {
        this.currentStep++;
      } else {
        this.validatePersonalInfo();
        personalInfoForm?.markAllAsTouched();
      }
    } else {
      this.currentStep = Math.min(this.currentStep + 1, 4);
    }
  }
  
  previousStep(): void {
    this.currentStep = Math.max(this.currentStep - 1, 1);
  }
  
  goToStep(step: number): void {
    this.currentStep = step;
  }
}
