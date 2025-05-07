import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  EmployeeContract,
  EmployeeForm,
  SocialOrganization,
} from "./salarie-form.state";

@Injectable({
  providedIn: "root",
})
export class FormStateService {
  private formData: {
      personalInfo?: EmployeePersonalInfo;
      contractData?: EmployeeContract;
  
      // Step 4: Organizations/Socials data
      organizationsData?: SocialOrganization;
  
      // Step 5: Bank payment data
      bankPaymentData?: {
        name: string;
        agency: string;
        rib: string;
      };
  
      // Step 6: Bulletin model data
      bulletinData?: {
        id: number;
        rubrique: string;
        designation: string;
        valeur: string;
      };
  
      congeData {
        soldeConge: string;
        regulConge: string;
        typeAcquis: string; // typiquement "calculé", etc.
        valeurAcquisAnnuelle: string;
      }
    
  } = {};

  // BehaviorSubject to track form completion status
  private formCompletedSource = new BehaviorSubject<boolean>(false);
  formCompleted$ = this.formCompletedSource.asObservable();

  // BehaviorSubject to track overall form data
  private formDataSource = new BehaviorSubject<any>(this.formData);
  formData$ = this.formDataSource.asObservable();

  constructor() {
    // Check if we have saved data in localStorage
    this.loadFromLocalStorage();
  }

  // Method to update data for a specific step
  updateStepData(step: number, data: any): void {
    switch (step) {
      case 1:
        this.formData.personalInfo = { ...data };
        break;
      case 2:
        this.formData.planSelection = { ...data };
        break;
      case 3:
        this.formData.contractData = { ...data };
        break;
      case 4:
        this.formData.organizationsData = { ...data };
        break;
      case 5:
        this.formData.bankPaymentData = { ...data };
        break;
      case 6:
        this.formData.bulletinData = { ...data };
        break;
    }

    // Update the BehaviorSubject with new data
    this.formDataSource.next(this.formData);

    // Save data to localStorage for persistence
    this.saveToLocalStorage();
  }

  // Method to get data for a specific step
  getStepData(step: number): any {
    switch (step) {
      case 1:
        return this.formData.personalInfo || {};
      case 2:
        return this.formData.planSelection || {};
      case 3:
        return this.formData.contractData || {};
      case 4:
        return this.formData.organizationsData || {};
      case 5:
        return this.formData.bankPaymentData || {};
      case 6:
        return this.formData.bulletinData || {};
      default:
        return {};
    }
  }

  // Get all form data
  getAllFormData(): any {
    return { ...this.formData };
  }

  // Mark form as completed
  completeForm(): void {
    this.formCompletedSource.next(true);
    this.saveToLocalStorage();
  }

  // Reset the form state
  resetForm(): void {
    this.formData = {};
    this.formCompletedSource.next(false);
    this.formDataSource.next(this.formData);
    localStorage.removeItem("multistepFormData");
  }

  // Save data to localStorage
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(
        "multistepFormData",
        JSON.stringify({
          formData: this.formData,
          completed: this.formCompletedSource.value,
        })
      );
    } catch (e) {
      console.error("Error saving form data to localStorage", e);
    }
  }

  // Load data from localStorage
  private loadFromLocalStorage(): void {
    try {
      const savedData = localStorage.getItem("multistepFormData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        this.formData = parsedData.formData || {};
        this.formCompletedSource.next(parsedData.completed || false);
        this.formDataSource.next(this.formData);
      }
    } catch (e) {
      console.error("Error loading form data from localStorage", e);
    }
  }

  // Generate PDF or printable data
  generatePrintableData(): Observable<any> {
    // Here you would format the data for printing
    // You might want to use a library like jspdf or pdfmake
    // For now, we'll just return the complete data
    return this.formData$;
  }
}
