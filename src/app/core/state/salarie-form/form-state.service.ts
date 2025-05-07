import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class FormStateService {
  private formData: any = {
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
    step6: null,
    step7: null,
    step8: null,
  };

  private currentStep = new BehaviorSubject<number>(3);
  currentStep$ = this.currentStep.asObservable();

  setStepData(step: number, data: any) {
    this.formData[`step${step}`] = data;
  }

  getStepData(step: number) {
    return this.formData[`step${step}`];
  }

  getAllData() {
    return this.formData;
  }

  updateStep(step: number) {
    this.currentStep.next(step);
  }
}
