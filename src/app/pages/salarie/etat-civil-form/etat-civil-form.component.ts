import { Component, ElementRef, ViewChild } from "@angular/core";
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

@Component({
  selector: "app-etat-civil-form",
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: "./etat-civil-form.component.html",
  styleUrl: "./etat-civil-form.component.scss",
})
export class EtatCivilFormComponent {
  form: FormGroup;
  formErrors: any = {};
  countries: string[] = [];
  cities: string[] = [];
  imagePreview: string | null = null;
  selectedImage: File | null = null;
  @ViewChild("fileInput") fileInput!: ElementRef;
  isActive = false;
  imageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private countryCityService: CountryCityService
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
    });
  }
  ngOnInit(): void {
    
    this.form.valueChanges.subscribe((value) => {
      this.store.dispatch(updateFormValue({ formValue: value }));
    });

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
    console.log(this.countries);
  }

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
  
  onSubmit(): void {
    
  }
 
}
