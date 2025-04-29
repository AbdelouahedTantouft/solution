import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ToastModule } from "primeng/toast";
import {
  Base,
  ModeleBulletin,
  rubriques,
} from "../../../core/services/rubrique/rubrique.model";
import { RubriqueService } from "../../../core/services/rubrique/rubrique.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faPlus,
  faSave,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-rubrique-view",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: "./rubrique-view.component.html",
  styleUrl: "./rubrique-view.component.scss",
})
export class RubriqueViewComponent {
  // ICONS
  faPlus = faPlus;
  faSave = faSave;
  faTrashAlt = faTrashAlt;
  faTimes = faTimes;
  //FORM
  @Input() rubriqueData: any;
  rubriqueForm: FormGroup;
  rubrique: any = {};
  selectedModele: any;

  activeTab = "bases";
  // TEMPLATE LOGIC
  isAddMode: boolean = false;
  isEditMode: boolean = false;

  // Données pour les tableaux
  bases: Base[] = [
    { code: "201", libelle: "BASE" },
    { code: "202", libelle: "CNSS" },
    { code: "203", libelle: "MULTIULLE" },
    { code: "204", libelle: "AMO" },
    { code: "205", libelle: "BRUT" },
    { code: "206", libelle: "ANCIENNETE" },
    { code: "207", libelle: "IR" },
    { code: "208", libelle: "NET" },
  ];

  modelesBulletin: ModeleBulletin[] = [
    { id: 1, code: "101", libelle: "Modèle mensuel" },
    { id: 2, code: "102", libelle: "Modèle anapec" },
    { id: 3, code: "103", libelle: "Modèle mensuel avec cimr" },
    { id: 4, code: "104", libelle: "Modèle horaire" },
  ];

  selectedBases: Base[] = [];
  selectedModeleBulletins: ModeleBulletin[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private rubriqueService: RubriqueService,
    private router: Router
  ) {
    this.rubriqueForm = this.fb.group({
      codeRubrique: [""],
      plafond: [0],
      arrondi: [false],
      cumul: [false],
      nomRubrique: [""],
      nomReduit: [""],
      modeAffichage: ["ecran"],
      typeRubrique: ["calcule"],
      modeCalcul: ["formule"],
      natureRubrique: ["retenue"],
      cumulGainRetenue: ["non"],
      partSalariale: ["salariale"],
    });
  }

  ngOnInit(): void {
    if (this.rubriqueData) {
      this.rubriqueForm.patchValue(this.rubriqueData); // Patch values into the form if rubriqueData is provided
    }
    const code = this.route.snapshot.paramMap.get("code");
    if (code) {
      this.rubriqueService.getRubriqueByCode(code)?.subscribe((rubrique) => {
        this.rubrique = rubrique;
      });
    }

    console.log(this.rubrique);

    this.initForm();
    this.setupFormListeners();

    // TEMPLATE LOGIC
    const currentRoute = this.router.url;
    if (currentRoute.includes("add-item")) {
      this.isAddMode = true;
    } else if (currentRoute.includes("view-item")) {
      this.isEditMode = true;
    }
  }

  /**
   * Initialise la formulaire
   */
  private initForm(): void {
    this.rubriqueForm = this.fb.group({
      codeRubrique: [{ value: this.rubrique.code || "", disabled: true }],
      nomRubrique: [
        { value: this.rubrique.nom || "", disabled: false },
        [Validators.required, Validators.minLength(3)], // Example: Required and min length
      ],
      plafond: [this.rubrique.plafond ?? null, [Validators.min(0)]], // Example: Minimum value validation

      // Mode d'Affichage
      modeAffichage: [this.rubrique.modeAffichage || "ecranEtBulletin"],
      editionLivrePaie: [this.rubrique.editionLivrePaie ?? false],

      // Type de Rubrique
      typeRubrique: [this.rubrique.type || "fixe", Validators.required],

      // Mode de Calcul
      modeCalcul: [this.rubrique.modeCalcul || "formule"],

      rubriqueTaux: [this.rubrique.rubriqueTaux || ""],

      // Nature et Cumul
      nature: [this.rubrique.nature || "gain", Validators.required],
      cumul: [this.rubrique.cumul || "oui"],

      // Part Salariale / Patronale
      part: [this.rubrique.part || "salariale"],
      arrondi: [this.rubrique.arrondi ?? false],
      notes: [this.rubrique.notes || ""],
    });
  }

  /**
   * Setup form control dependencies and conditional logic
   */
  private setupFormListeners(): void {
    // Watch for changes to modeCalcul to enable/disable dependent fields
    this.rubriqueForm.get("modeCalcul")?.valueChanges.subscribe((value) => {
      const baseControl = this.rubriqueForm.get("rubriqueBase");
      const tauxControl = this.rubriqueForm.get("rubriqueTaux");

      if (value === "base") {
        baseControl?.setValidators([Validators.required]);
        tauxControl?.setValidators([Validators.required]);
      } else {
        baseControl?.clearValidators();
        tauxControl?.clearValidators();
      }

      baseControl?.updateValueAndValidity();
      tauxControl?.updateValueAndValidity();
    });

    // Watch for changes to typeRubrique
    this.rubriqueForm.get("typeRubrique")?.valueChanges.subscribe((value) => {
      const modeCalculControl = this.rubriqueForm.get("modeCalcul");

      if (value === "calculee") {
        modeCalculControl?.enable();
      } else {
        modeCalculControl?.disable();
        // Reset dependent fields

        this.rubriqueForm.get("rubriqueTaux")?.setValue("");
      }
    });

    // Watch for changes to nature to update part requirement
    this.rubriqueForm.get("nature")?.valueChanges.subscribe((value) => {
      const partControl = this.rubriqueForm.get("part");

      if (value === "retenue") {
        partControl?.setValidators([Validators.required]);
      } else {
        partControl?.clearValidators();
      }

      partControl?.updateValueAndValidity();
    });
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    const formValue = {
      ...this.rubriqueForm.getRawValue(),
    };
    const rubriqueObject = {
      selectedBases: this.selectedBases,
      selectModele: this.selectedModeleBulletins,
      ...formValue,
    };

    console.log("Form submitted:", rubriqueObject);
  }

  /**
   * Open formula editor modal
   */
  openFormulaEditor(): void {
    // This would open a modal or dialog for the formula editor
    console.log("Opening formula editor...");
  }

  // BASE LOGIC
  isBaseInRubrique(base: Base): boolean {
    return (
      this.rubrique.rubriqueBase?.some((b: any) => b.code === base.code) ||
      false
    );
  }
  selectBase(base: Base): void {
    const index = this.selectedBases.findIndex(
      (selectedBase) => selectedBase.code === base.code
    );
    if (index === -1) {
      this.selectedBases.push(base);
    } else {
      this.selectedBases.splice(index, 1);
    }

    console.log("Selected bases:", this.selectedBases);
  }
  isBaseSelected(base: Base): boolean {
    return this.selectedBases.some(
      (selectedBase: any) => selectedBase.code === base.code
    );
  }
  // ---------------------------------------------------------

  //MODEL LOGIC
  isModeleInRubrique(modele: ModeleBulletin): boolean {
    return (
      this.rubrique?.modeleBulletin?.some(
        (m: ModeleBulletin) => m.id === modele.id
      ) || false
    );
  }
  selectModele(modele: ModeleBulletin): void {
    const index = this.selectedModeleBulletins.findIndex(
      (selectedModele: ModeleBulletin) => selectedModele.id === modele.id
    );
    if (index === -1) {
      this.selectedModeleBulletins.push(modele);
    } else {
      this.selectedModeleBulletins.splice(index, 1);
    }
    console.log("Selected modeleBulletins:", this.selectedModeleBulletins);
  }
  isModeleSelected(modele: ModeleBulletin): boolean {
    return this.selectedModeleBulletins.some(
      (selectedModele) => selectedModele.id === modele.id
    );
  }
  // ---------------------------------------------------------

  removeModele(modele: ModeleBulletin): void {
    // Logique pour supprimer l'association entre le modèle et la rubrique
    this.modelesBulletin = this.modelesBulletin.filter(
      (m) => m.id !== modele.id
    );
  }

  /**
   * Reset the form to initial values
   */
  resetForm(): void {
    this.rubriqueForm.reset();
    this.initForm();
  }
  // ROUTING

  goBack() {
    this.router.navigate(["/pages/rubriques/rubrique-add"]);
  }
  deleteRubrique(): void {
    const confirmation = window.confirm(
      "Are you sure you want to submit this data?"
    );

    if (confirmation) {
      const index = rubriques.findIndex((r) => r.code === this.rubrique.code);
      if (index !== -1) {
        rubriques.splice(index, 1);
        console.log(`Rubrique with id=${this.rubrique.code} deleted.`);
      } else {
        console.warn("Rubrique not found.");
      }

      this.router.navigate(["/pages/rubriques/rubrique-add"]);
    }
  }
}
