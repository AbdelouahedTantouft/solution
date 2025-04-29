import { Component, OnInit, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { RubriqueService } from "../../../core/services/rubrique/rubrique.service";
import DataTables, { Config } from "datatables.net";
import { Subject } from "rxjs";
import { Router, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { Rubrique } from "../../../core/services/rubrique/rubrique.model";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface DatabaseRecord {
  year: string;
  code: string;
  companyName: string;
  databaseName: string;
  newDatabaseName: string;
  status: "valid" | "invalid" | "pending";
}

interface TrancheIR {
  id: number;
  valeurDu: number;
  valeurAu: number;
  taux: number;
  abattement: number;
}
interface Ancianite {
  id: number;
  valeurDuAnc: number;
  valeurAuAnc: number;
  tauxAnc: number;
}
interface Conge {
  id: number;
  valeurDuConge: number;
  valeurAuConge: number;
  tauxConge: number;
  nombreJoursConge: number;
}

@Component({
  selector: "app-rubrique-add",
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
  templateUrl: "./rubrique-add.component.html",
  styleUrl: "./rubrique-add.component.scss",
})
export class RubriqueAddComponent implements OnInit {
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  // DUMMY DATA TO CHANGE LATER
  tranches: TrancheIR[] = [
    { id: 1, valeurDu: 0, valeurAu: 40000, taux: 0, abattement: 0 },
    { id: 2, valeurDu: 1869, valeurAu: 49469, taux: 0.824, abattement: 2061 },
    { id: 3, valeurDu: 6367, valeurAu: 24173, taux: 0.529, abattement: 1019 },
    { id: 4, valeurDu: 96, valeurAu: 47636, taux: 0.513, abattement: 28 },
    { id: 5, valeurDu: 18864, valeurAu: 30623, taux: 0.217, abattement: 3377 },
    { id: 6, valeurDu: 14529, valeurAu: 27366, taux: 0.086, abattement: 4357 },
    { id: 7, valeurDu: 18555, valeurAu: 23439, taux: 0.736, abattement: 4982 },
    { id: 8, valeurDu: 12083, valeurAu: 27371, taux: 0.216, abattement: 204 },
    { id: 9, valeurDu: 3036, valeurAu: 24549, taux: 0.945, abattement: 3357 },
    { id: 10, valeurDu: 10751, valeurAu: 45301, taux: 0.16, abattement: 696 },
    { id: 11, valeurDu: 17500, valeurAu: 22458, taux: 0.998, abattement: 3233 },
  ];
  ancianite: Ancianite[] = [
    { id: 1, valeurDuAnc: 0, valeurAuAnc: 40000, tauxAnc: 0 },
    { id: 2, valeurDuAnc: 1869, valeurAuAnc: 49469, tauxAnc: 0.824 },
    { id: 3, valeurDuAnc: 6367, valeurAuAnc: 24173, tauxAnc: 0.529 },
    { id: 4, valeurDuAnc: 96, valeurAuAnc: 47636, tauxAnc: 0.513 },
  ];
  congeRecords: Conge[] = [
    {
      id: 1,
      valeurDuConge: 42542,
      valeurAuConge: 39194,
      tauxConge: 0.852,
      nombreJoursConge: 20,
    },
    {
      id: 2,
      valeurDuConge: 5988,
      valeurAuConge: 25191,
      tauxConge: 0.635,
      nombreJoursConge: 26,
    },
    {
      id: 3,
      valeurDuConge: 25102,
      valeurAuConge: 41320,
      tauxConge: 0.133,
      nombreJoursConge: 24,
    },
    {
      id: 4,
      valeurDuConge: 17566,
      valeurAuConge: 17848,
      tauxConge: 0.559,
      nombreJoursConge: 16,
    },
    {
      id: 5,
      valeurDuConge: 16461,
      valeurAuConge: 43334,
      tauxConge: 0.701,
      nombreJoursConge: 12,
    },
  ];

  selectedId: number | null = null;

  // FOR DATATABLES CONFIG
  rubriques: any;

  processStatus: "in-progress" | "completed" | "failed" = "completed";
  searchTerm: string = "";
  typeFilter: string = "ALL";
  activeTab: string = "annual-closing";
  irForm: FormGroup;
  // TRANCHE TABLE LOGIC
  trancheForm: FormGroup;
  ancianiteForm: FormGroup;
  congeForm: FormGroup;

  tabs = [
    {
      id: "annual-closing",
      label: "List Rubriques",
      icon: "file-text",
    },

    {
      id: "database-verification",
      label: "Tableau IR",
      icon: "database",
    },
    {
      id: "TableauAncianite",
      label: "Tableau Ancianite",
      icon: "database",
    },
    {
      id: "RubriqueConge",
      label: "Rubrique Congé",
      icon: "database",
    },
  ];
  constructor(
    private rubriqueService: RubriqueService,
    private renderer: Renderer2,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.irForm = this.fb.group({
      tranches: this.fb.array([]),
    });
    this.trancheForm = this.fb.group({
      valeurDu: [null, [Validators.required, Validators.min(0)]],
      valeurAu: [null, [Validators.required, Validators.min(0)]],
      taux: [null, [Validators.required, Validators.min(0)]],
      abattement: [null, [Validators.required, Validators.min(0)]],
    });
    this.ancianiteForm = this.fb.group({
      valeurDuAnc: [null, [Validators.required, Validators.min(0)]],
      valeurAuAnc: [null, [Validators.required, Validators.min(0)]],
      tauxAnc: [null, [Validators.required, Validators.min(0)]],
    });
    this.congeForm = this.fb.group({
      valeurDuConge: [null, [Validators.required, Validators.min(0)]],
      valeurAuConge: [null, [Validators.required, Validators.min(0)]],
      tauxConge: [null, [Validators.required, Validators.min(0)]],
      nombreJoursConge: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.LoadFubriques();
  }

  LoadFubriques() {
    this.rubriqueService.getAll().subscribe((res) => {
      this.rubriques = res;
    });
  }

  get filteredRubriques() {
    const term = this.searchTerm.toLowerCase();
    return this.rubriques.filter((r: any) => {
      const matchesSearch =
        r.code.toLowerCase().includes(term) ||
        r.nom.toLowerCase().includes(term) ||
        r.type.toLowerCase().includes(term);

      const matchesType =
        this.typeFilter === "ALL" || r.type === this.typeFilter;

      return matchesSearch && matchesType;
    });
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  exportData(): void {
    const element = document.getElementById("rubriqueTable");
    if (!element) return;

    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = {
      Sheets: { Sheet1: worksheet },
      SheetNames: ["Sheet1"],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data: Blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "exported-data.xlsx");
  }

  addNewRecord(): void {
    this.router.navigate(["/pages/rubriques/add-item"]);
  }

  getStatusText(status: string): string {
    switch (status) {
      case "valid":
        return "Valide";
      case "invalid":
        return "Invalide";
      case "pending":
        return "En attente";
      default:
        return "";
    }
  }

  viewItem(record: Rubrique): void {
    this.router.navigate(["/pages/rubriques/view-item", record.code]);
  }
  // ANCIANITE FORM
  addAncianite() {
    if (this.ancianiteForm.valid) {
      const newAncianite = this.ancianiteForm.value;
      const lastId =
        this.ancianite.length > 0
          ? Math.max(...this.ancianite.map((item) => item.id))
          : 0;
      const newId = lastId + 1;

      this.ancianite.push({ id: newId, ...newAncianite });

      this.ancianiteForm.reset();
      console.log(newAncianite);
    } else {
      console.log("Form is invalid!");
    }
  }
  // CONGE FORM
  addConge() {
    if (this.congeForm.valid) {
      const newConge = this.congeForm.value;
      const lastId =
        this.congeRecords.length > 0
          ? Math.max(...this.congeRecords.map((item) => item.id))
          : 0;
      const newId = lastId + 1;

      this.congeRecords.push({ id: newId, ...newConge });

      this.congeForm.reset();
      console.log(this.congeForm);
    } else {
      console.log("Form is invalid!");
    }
  }

  addTranche() {
    if (this.trancheForm.valid) {
      const newTranche = this.trancheForm.value;
      this.tranches.push(newTranche);

      this.trancheForm.reset();
      console.log(newTranche);
    } else {
      console.log("Form is invalid!");
    }
  }

  deleteTranche(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tranche ?")) {
      this.tranches = this.tranches.filter((t) => t.id !== id);
    }
  }

  updateTranche(tranche: TrancheIR, field: keyof TrancheIR, value: any) {
    tranche[field] = Number(value);
  }

  removeTranche(index: number): void {
    console.log("Remove tranche");
  }

  saveTranche(trancheId: number): void {
    const trancheIndex = this.tranches.findIndex(
      (tranche) => tranche.id === trancheId
    );

    if (trancheIndex !== -1) {
      const updatedTranche = this.tranches[trancheIndex];
      console.log("Saved tranche:", updatedTranche);

      console.log("Updated Tranche:", updatedTranche);
    } else {
      console.log("Tranche not found.");
    }
  }
}
