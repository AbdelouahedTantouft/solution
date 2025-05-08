import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { FormGroup } from "@angular/forms";

export interface StepState {
  completed: boolean;
  required: boolean;
  valid: boolean;
  formData?: any;
}

@Injectable({
  providedIn: "root",
})
export class FormStateService {
  private currentStepSubject = new BehaviorSubject<number>(1);
  currentStep$: Observable<number> = this.currentStepSubject.asObservable();

  private completedSubject = new BehaviorSubject<boolean>(false);
  completed$: Observable<boolean> = this.completedSubject.asObservable();

  private formDataSubject = new BehaviorSubject<{ [key: string]: any }>({});
  formData$: Observable<{ [key: string]: any }> =
    this.formDataSubject.asObservable();

  private stepStatesSubject = new BehaviorSubject<{ [key: number]: StepState }>(
    {
      1: { completed: false, required: true, valid: false }, // Personal Info (required)
      2: { completed: false, required: true, valid: false }, // Select Plan (required)
      3: { completed: false, required: true, valid: false }, // Contrat Form (required)
      4: { completed: false, required: true, valid: false }, // Organizations Socials (required)
      5: { completed: false, required: false, valid: true }, // Payment Bank (optional)
      6: { completed: false, required: false, valid: true }, // Bulletin Model (optional)
      7: { completed: false, required: false, valid: true }, // Conge Form (optional)
    }
  );
  stepStates$: Observable<{ [key: number]: StepState }> =
    this.stepStatesSubject.asObservable();
  
  private formDataItemsSubject = new BehaviorSubject<any[]>([]);
  formDataItems$: Observable<any[]> = this.formDataItemsSubject.asObservable();

  totalSteps = 8;

  constructor() {}

  get currentStep(): number {
    return this.currentStepSubject.getValue();
  }

  get isCompleted(): boolean {
    return this.completedSubject.getValue();
  }

  get formData(): { [key: string]: any } {
    return this.formDataSubject.getValue();
  }

  get stepStates(): { [key: number]: StepState } {
    return this.stepStatesSubject.getValue();
  }

  setCurrentStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStepSubject.next(step);
    } else {
      this.completeForm();
    }
  }

  nextStep(): void {
    const currentStep = this.currentStep;
    if (currentStep < this.totalSteps) {
      this.currentStepSubject.next(currentStep + 1);
    } else {
      this.completeForm();
    }
  }

  prevStep(): void {
    const currentStep = this.currentStep;
    if (currentStep > 1) {
      this.currentStepSubject.next(currentStep - 1);
    }
  }

  completeForm(): void {
    this.completedSubject.next(true);
  }

  resetForm(): void {
    this.currentStepSubject.next(1);
    this.completedSubject.next(false);
    this.formDataSubject.next({});

    const resetStates = Object.keys(this.stepStates).reduce(
      (acc, key) => {
        const stepNumber = Number(key);
        const currentState = this.stepStates[stepNumber];
        acc[stepNumber] = {
          ...currentState,
          completed: false,
          valid: currentState.required ? false : true,
        };
        return acc;
      },
      {} as { [key: number]: StepState }
    );

    this.stepStatesSubject.next(resetStates);
  }

  updateStepState(step: number, state: Partial<StepState>): void {
    const currentStates = this.stepStatesSubject.getValue();
    this.stepStatesSubject.next({
      ...currentStates,
      [step]: { ...currentStates[step], ...state },
    });
  }

  updateFormData(step: number, formData: any): void {
    const currentFormData = this.formDataSubject.getValue();
    this.formDataSubject.next({
      ...currentFormData,
      [step]: formData,
    });

    // Update step state
    this.updateStepState(step, {
      completed: true,
      formData,
      valid: true,
    });
  }

  canProceedToNextStep(): boolean {
    const currentStepState = this.stepStates[this.currentStep];
    return (
      !currentStepState.required ||
      (currentStepState.required && currentStepState.valid)
    );
  }

  canNavigateToStep(targetStep: number): boolean {
    // Can always go back
    if (targetStep < this.currentStep) return true;

    // Check if all required previous steps are valid
    for (let i = 1; i < targetStep; i++) {
      const stepState = this.stepStates[i];
      if (stepState.required && !stepState.valid) {
        return false;
      }
    }

    return true;
  }

  getStepFormData(step: number): any {
    return this.formData[step] || null;
  }

  isStepValid(step: number): boolean {
    return this.stepStates[step]?.valid || false;
  }

  isStepCompleted(step: number): boolean {
    return this.stepStates[step]?.completed || false;
  }

  addFormDataItem(name: string, data: any): string {
    const newItem: any = {
      id: this.generateUniqueId(),
      name,
      data,
      createdAt: new Date(),
    };

    const currentItems = this.formDataItemsSubject.getValue();
    this.formDataItemsSubject.next([...currentItems, newItem]);

    return newItem.id;
  }

  /**
   * Get all form data items
   */
  getAllFormDataItems(): any[] {
    return this.formDataItemsSubject.getValue();
  }

  private generateUniqueId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
