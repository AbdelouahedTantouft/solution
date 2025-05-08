import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CountryCityService } from "../../../core/state/country-city/country-city.service";
import { Store } from "@ngrx/store";
import { updateFormValue } from "../../../core/state/salarie-form/salarie-form.actions";
import { Subscription } from "rxjs";
import { FormStateService } from "../../../core/state/salarie-form/form-state.service";
import { CsvService } from "../../../core/state/csv/csv.service";

@Component({
  selector: "app-etat-civil-form",
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: "./etat-civil-form.component.html",
  styleUrl: "./etat-civil-form.component.scss",
})
export class EtatCivilFormComponent {
  form!: FormGroup;
  countries: string[] = [];
  cities: string[] = [];
  imagePreview: string | null = null;
  selectedImage: File | null = null;
  @ViewChild("fileInput") fileInput!: ElementRef;
  isActive = false;
  imageUrl: string | null = null;
  private subscriptions: Subscription[] = [];
  private stepNumber = 1;
  importStatus: string = "";
  isLoading: boolean = false;

  formErrors: { [key: string]: string } = {};
  @Input() storageKey: string = "profileImage"; // Key for localStorage
  @Output() imageChanged = new EventEmitter<string | null>();
  profileImage: string | null = null;

  validationMessages: { [key: string]: { [key: string]: string } } = {
    matricule: {
      required: "Le matricule est requis.",
    },
    titre: {
      required: "Le titre est requis.",
    },
    nom: {
      required: "Le nom est requis.",
      minlength: "Le nom doit contenir au moins 2 caractères.",
    },
    prenom: {
      required: "Le prénom est requis.",
      minlength: "Le prénom doit contenir au moins 2 caractères.",
    },
    sexe: {
      required: "Le sexe est requis.",
    },
    adresseLigne1: {
      required: "L'adresse ligne 1 est requise.",
    },
    country: {
      required: "Le pays est requis.",
    },
    city: {
      required: "La ville est requise.",
    },
    nombreEnfants: {
      min: "Le nombre d'enfants ne peut pas être négatif.",
      pattern: "Le nombre d'enfants doit être un entier.",
    },
    enfantsCharge: {
      min: "Le nombre d'enfants à charge ne peut pas être négatif.",
      pattern: "Le nombre d'enfants à charge doit être un entier.",
    },
    email: {
      required: "L'email est requis.",
      email: "L'email n'est pas valide.",
    },
    phone: {
      required: "Le numéro de téléphone est requis.",
      pattern: "Le format du téléphone est invalide.",
    },
    nationalite: {
      required: "La nationalité est requise.",
    },
    dateNaissance: {
      required: "La date de naissance est requise.",
    },
    lieuNaissance: {
      required: "Le lieu de naissance est requis.",
    },
    cin: {
      pattern: "Le format du CIN est invalide (ex: AB123456).",
    },
    carteSejour: {
      pattern: "Le format de la carte de séjour est invalide (ex: CS123456).",
    },
  };

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private countryCityService: CountryCityService,
    private formStateService: FormStateService,
    private csvService: CsvService
  ) {
    this.createForm();
    this.form.valueChanges.subscribe(() => this.logValidationErrors());
  }
  ngOnInit(): void {
    // Load saved form data if available
    const savedData = this.formStateService.getStepFormData(1);
    console.log(savedData);

    if (savedData) {
      this.form.patchValue(savedData);
      if (savedData.imageUrl) {
        this.imageUrl = savedData.imageUrl;
      }
      if (savedData.isActive !== undefined) {
        this.isActive = savedData.isActive;
      }
    }
    this.form.valueChanges.subscribe((value) => {
      this.store.dispatch(updateFormValue({ formValue: value }));
    });

    this.loadSavedImage();

    this.countryCityService.getDemoData().subscribe((data) => {
      this.countryCityService.setData(data);
      this.countries = this.countryCityService.getAllCountries();

      this.form.get("country")?.valueChanges.subscribe((country) => {
        if (country) {
          this.cities = this.countryCityService.getCitiesByCountry(country);
          this.form.get("city")?.setValue("");
        } else {
          this.cities = [];
        }
      });
    });
  }

  loadSavedImage(): void {
    const savedImage = localStorage.getItem(this.storageKey);
    if (savedImage) {
      this.imageUrl = savedImage;
      // Optionally emit that we loaded a saved image
      this.imageChanged.emit(savedImage);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  processFile(file: File): void {
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      console.error("Only image files are allowed");
      return;
    }

    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        const imageDataUrl = e.target.result as string;
        this.setImage(imageDataUrl);
      }
    };
    reader.readAsDataURL(file);
  }

  setImage(imageUrl: string): void {
    this.imageUrl = imageUrl;

    // Save to localStorage
    localStorage.setItem(this.storageKey, imageUrl);

    // Emit the change event
    this.imageChanged.emit(imageUrl);

    this.form.patchValue({
      imageUrl: imageUrl
    });
  }

  removeImage(event: MouseEvent): void {
    event.stopPropagation(); // Prevent triggering the file input click

    this.imageUrl = null;

    // Remove from localStorage
    localStorage.removeItem(this.storageKey);

    // Emit the change event
    this.imageChanged.emit(null);
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
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

  onSubmit(): void {}

  createForm(): void {
    this.form = this.fb.group({
      matricule: ["", Validators.required],
      titre: ["", Validators.required],
      nom: ["", [Validators.required, Validators.minLength(2)]],
      prenom: ["", [Validators.required, Validators.minLength(2)]],
      sexe: ["", Validators.required],
      situationFamiliale: [""],
      adresseLigne1: ["", Validators.required],
      adresseLigne2: [""],
      adresseLigne3: [""],
      profileImage: [""],
      country: ["", Validators.required],
      city: ["", Validators.required],
      nombreEnfants: [0, [Validators.min(0), Validators.pattern("^[0-9]*$")]],
      enfantsCharge: [0, [Validators.min(0), Validators.pattern("^[0-9]*$")]],
      prisEnCompte: [false],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9+\\s-]*$")]],
      isActive: [false],
      nationalite: ["", Validators.required],
      dateNaissance: ["", Validators.required],
      lieuNaissance: ["", Validators.required],
      cin: ["", Validators.pattern("^[A-Z]{2}[0-9]{6}$")],
      dateCin: [""],
      ifSalarie: [""],
      datePasseport: [""],
      carteSejour: ["", Validators.pattern("^CS[0-9]{6}$")],
    });
  }

  logValidationErrors(group: FormGroup = this.form): void {
    Object.keys(group.controls).forEach((key) => {
      const control = group.get(key);

      this.formErrors[key] = "";

      if (control && control.invalid && (control.dirty || control.touched)) {
        const messages = this.validationMessages[key];
        if (messages) {
          for (const errorKey in control.errors) {
            if (messages[errorKey]) {
              this.formErrors[key] = messages[errorKey];
              break; // stop at the first error
            }
          }
        }
      }

      if (control instanceof FormGroup) {
        this.logValidationErrors(control);
      }
    });
  }

  saveFormData(): void {
    this.formStateService.updateFormData(this.stepNumber, this.form.value);

    this.formStateService.updateStepState(this.stepNumber, {
      valid: this.form.valid,
      completed: this.form.dirty || this.form.touched,
    });
  }

  onSaveAndContinue(): void {
    console.log(this.form.value);
    console.log(this.form.valid);
    /* if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
     } */

    this.saveFormData();
    this.formStateService.nextStep();
    console.log(this.formStateService.getStepFormData(1));
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

  /**
   * Handles file input change for importing CSV
   * @param event File input change event
   */
  onFileSelectedCsv(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.importStatus = "No file selected";
      return;
    }

    const file = input.files[0];

    // Check if it's a CSV file
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      this.importStatus = "Please select a CSV file";
      return;
    }

    this.importCsv(file);
  }

  /**
   * Imports CSV data and updates form state
   * @param file CSV file to import
   */
  private importCsv(file: File): void {
    this.isLoading = true;
    this.importStatus = "Importing data...";

    this.csvService
      .importFromCsv(file)
      .then((data) => {
        console.log("Imported data:", data);

        // Reset the form first
        this.formStateService.resetForm();

        // Update each step with imported data
        Object.keys(data).forEach((step) => {
          if (data[step]) {
            this.formStateService.updateFormData(parseInt(step), data[step]);
          }
        });

        this.importStatus = "Data imported successfully";
        this.formStateService.setCurrentStep(8);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error("Import error:", error);
        this.importStatus = `Import failed: ${error}`;
        this.isLoading = false;
      });
  }
}
