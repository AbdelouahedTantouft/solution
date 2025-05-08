import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  VERSION,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormsModule,
} from "@angular/forms";
import { StepperComponent } from "../stepper/stepper.component";
import {
  updateFormValue,
  setStep,
  toggleBillingPeriod,
  markAsCompleted,
} from "../../../core/state/salarie-form/salarie-form.actions";
import {
  selectCurrentStep,
  selectBillingPeriod,
  selectCompleted,
} from "../../../core/state/salarie-form/salarie-form.selectors";
import { Store } from "@ngrx/store";
import { CountryCityService } from "../../../core/state/country-city/country-city.service";
import { ContratFormComponent } from "../contrat-form/contrat-form.component";
import { OrganizationsSocailsFormComponent } from "../organizations-socails-form/organizations-socails-form.component";
import { BankPaymentFormComponent } from "../bank-payment-form/bank-payment-form.component";
import { BulletinModelComponent } from "../bulletin-model/bulletin-model.component";
import { CongeFormComponent } from "../conge-form/conge-form.component";
import { EtatCivilFormComponent } from "../etat-civil-form/etat-civil-form.component";
import { EtatCivilEtap2Component } from "../etat-civil-etap2/etat-civil-etap2.component";
import { Subscription } from "rxjs";
import { FormStateService } from "../../../core/state/salarie-form/form-state.service";
import { CsvService } from "../../../core/state/csv/csv.service";
import { Router } from "@angular/router";
import { RouterModule } from "@angular/router";
@Component({
  selector: "app-salarie-form",
  imports: [
    CommonModule,
    StepperComponent,
    ReactiveFormsModule,
    FormsModule,
    ContratFormComponent,
    OrganizationsSocailsFormComponent,
    BankPaymentFormComponent,
    BulletinModelComponent,
    CongeFormComponent,
    EtatCivilFormComponent,
    EtatCivilEtap2Component,
    RouterModule,
  ],
  templateUrl: "./salarie-form.component.html",
  styleUrl: "./salarie-form.component.scss",
})
export class SalarieFormComponent {
  formData: { [key: string]: any } = {};

  form: FormGroup;
  currentStep = 1;
  completed = false;
  totalSteps = 7;
  billingPeriod = "monthly";
  salarie: any = {};

  countries: string[] = [];
  cities: string[] = [];
  imagePreview: string | null = null;
  selectedImage: File | null = null;
  @ViewChild("fileInput") fileInput!: ElementRef;
  importStatus: string = "";
  isLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  plans = [
    {
      id: "arcade",
      name: "Arcade",
      value: "arcade",
      icon: "/assets/images/icon-arcade.svg",
      monthlyPrice: 9,
      yearlyPrice: 90,
    },
    {
      id: "advanced",
      name: "Advanced",
      value: "advanced",
      icon: "/assets/images/icon-advanced.svg",
      monthlyPrice: 12,
      yearlyPrice: 120,
    },
    {
      id: "pro",
      name: "Pro",
      value: "pro",
      icon: "/assets/images/icon-pro.svg",
      monthlyPrice: 15,
      yearlyPrice: 150,
    },
  ];

  addons = [
    {
      id: "online-service",
      name: "Online service",
      description: "Access to multiplayer games",
      controlName: "onlineService",
      monthlyPrice: 1,
      yearlyPrice: 10,
    },
    {
      id: "larger-storage",
      name: "Larger storage",
      description: "Extra 1TB of cloud save",
      controlName: "largerStorage",
      monthlyPrice: 2,
      yearlyPrice: 20,
    },
    {
      id: "custom-profile",
      name: "Customizable profile",
      description: "Custom theme on your profile",
      controlName: "customProfile",
      monthlyPrice: 2,
      yearlyPrice: 20,
    },
  ];

  stepLabels = {
    1: "Personal Information",
    2: "Additional Information",
    3: "Contract Information",
    4: "Organization Details",
    5: "Payment Information",
    6: "Bulletin Model",
    7: "Leave Information",
  };

  keyFields = {
    1: ["matricule", "nom", "prenom", "email", "phone"],
    2: ["nom2", "prenom", "activite"],
    3: ["poste", "fonction", "dateEmbauche", "natureContrat"],
    4: ["CNSSRegistrationNumber", "CIMRRegistrationNumber"],
    5: ["paymentMode", "bankNom1", "bankRib1"],
    6: ["salaireBase", "indemniteTransport"],
    7: ["soldeConge", "acquisType"],
  };

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private countryCityService: CountryCityService,
    private formStateService: FormStateService,
    private csvService: CsvService,
    private router: Router
  ) {
    this.form = this.fb.group({
      matricule: ["", Validators.required],
      titre: ["", Validators.required],
      nom: ["", [Validators.required, Validators.minLength(2)]],
      prenom: ["", [Validators.required, Validators.minLength(2)]],
      sexe: ["", Validators.required],
      situationFamiliale: [""],
      adresseLigne1: ["", Validators.required],
      adresseLigne2: [""],
      country: ["", Validators.required],
      city: ["", Validators.required],
      nombreEnfants: [0, [Validators.min(0), Validators.pattern("^[0-9]*$")]],
      enfantsCharge: [0, [Validators.min(0), Validators.pattern("^[0-9]*$")]],
      prisEnCompte: [false],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9+\\s-]*$")]],
      isActive: [true],
      nationalite: ["", Validators.required],
      dateNaissance: ["", Validators.required],
      lieuNaissance: ["", Validators.required],
      cin: ["", Validators.pattern("^[A-Z]{2}[0-9]{6}$")],
      dateCin: [""],
      ifSalarie: [""],
      datePasseport: [""],
      carteSejour: ["", Validators.pattern("^CS[0-9]{6}$")],

      // Step 2
      plan: ["arcade", Validators.required],
      billingPeriod: [false],

      // Step 3
      onlineService: [false],
      largerStorage: [false],
      customProfile: [false],
    });
    this.currentStep;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.formStateService.currentStep$.subscribe((step) => {
        this.currentStep = step;
      }),

      this.formStateService.completed$.subscribe((isCompleted) => {
        this.completed = isCompleted;
      })
    );
    this.formStateService.formData$.subscribe((data) => {
      this.formData = data;
      console.log("Form data loaded:", this.formData);
    });
  }

  formatFieldName(name: string): string {
    const withSpaces = name.replace(/([A-Z])/g, " $1");
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  goToNextStep(): void {
    if (this.formStateService.canProceedToNextStep()) {
      this.formStateService.nextStep();
    }
  }

  goToPrevStep(): void {
    this.formStateService.prevStep();
  }

  completeForm(): void {
    this.formStateService.completeForm();
  }

  resetForm(): void {
    this.formStateService.resetForm();
  }

  canNavigateToStep(step: number): boolean {
    return this.formStateService.canNavigateToStep(step);
  }

  isActive = false;
  imageUrl: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  removeImage(event: Event) {
    event.stopPropagation();
    this.imageUrl = null;
  }

  get f() {
    return this.form.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field) return "";

    if (field.errors?.["required"]) return "Ce champ est obligatoire";
    if (field.errors?.["email"]) return "Email invalide";
    if (field.errors?.["minlength"])
      return `Minimum ${field.errors?.["minlength"].requiredLength} caractères`;
    if (field.errors?.["min"])
      return `Valeur minimum ${field.errors?.["min"].min}`;
    if (field.errors?.["pattern"]) {
      if (fieldName === "phone") return "Numéro de téléphone invalide";
      if (fieldName === "cin") return "Format CIN invalide (ex: AB123456)";
      if (fieldName === "carteSejour")
        return "Format Carte de Séjour invalide (ex: CS123456)";
      return "Format invalide";
    }

    return "";
  }

  nextStep() {
    this.currentStep = this.currentStep + 1;
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    if (step >= 1 && step <= 4) {
      this.currentStep = step;
    }
  }

  toggleBillingPeriod() {
    this.billingPeriod = this.form.get("billingPeriod")?.value
      ? "yearly"
      : "monthly";
  }

  canProceed(): boolean {
    if (this.currentStep === 1) {
      return this.form.invalid;
    }
    return true;
  }

  getSelectedPlanName(): string {
    const plan = this.plans.find(
      (p) => p.value === this.form.get("plan")?.value
    );
    return plan ? plan.name : "";
  }

  getSelectedPlanPrice(): number {
    const plan = this.plans.find(
      (p) => p.value === this.form.get("plan")?.value
    );
    return plan
      ? this.billingPeriod === "monthly"
        ? plan.monthlyPrice
        : plan.yearlyPrice
      : 0;
  }

  hasSelectedAddons(): boolean {
    return (
      this.form.get("onlineService")?.value ||
      this.form.get("largerStorage")?.value ||
      this.form.get("customProfile")?.value
    );
  }

  getSelectedAddons() {
    return this.addons.filter(
      (addon) => this.form.get(addon.controlName)?.value
    );
  }

  calculateTotal(): number {
    let total = this.getSelectedPlanPrice();

    this.getSelectedAddons().forEach((addon) => {
      total +=
        this.billingPeriod === "monthly"
          ? addon.monthlyPrice
          : addon.yearlyPrice;
    });

    return total;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation errors
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
      return;
    }

    // Create form data for file upload
    const formData = new FormData();
    const formValue = this.form.value;

    // Append form values to formData
    Object.keys(formValue).forEach((key) => {
      formData.append(key, formValue[key]);
    });

    // Append the file if selected
    if (this.selectedImage) {
      formData.append(
        "profileImage",
        this.selectedImage,
        this.selectedImage.name
      );
    }

    console.log("Form submitted with values:", this.form.value);
    console.log("FormData ready for API submission with file:", formData);

    // Here you would call your API service to submit the form
    // this.userService.saveUserInfo(formData).subscribe(...);
  }

  exportData(): void {
    if (!this.formData || Object.keys(this.formData).length === 0) {
      this.importStatus = "No form data available to export";
      return;
    }

    try {
      // Convert to CSV
      const csvData = this.csvService.exportToCsv(this.formData);

      // Generate filename with date
      const date = new Date().toISOString().split("T")[0];
      const filename = `form-data-${date}.csv`;

      // Download file
      this.csvService.downloadCsv(csvData, filename);

      this.importStatus = "Data exported successfully";
    } catch (error) {
      console.error("Export error:", error);
      this.importStatus = `Export failed: ${error}`;
    }
  }

  navigateToListe() {
    this.formStateService.addFormDataItem(this.formData['1'].name, this.formData)
    this.formStateService.resetForm()
    this.router.navigate(["/pages/fiche-salarie/liste-salaries"]);
  }
}
