import { Component } from "@angular/core";

@Component({
  selector: "app-rubrique-management",
  imports: [],
  templateUrl: "./rubrique-management.component.html",
  styleUrl: "./rubrique-management.component.scss",
})
export class RubriqueManagementComponent {
  rubriques = [
    { code: "R001", nom: "Salaire de base", type: "FIXE" },
    { code: "R002", nom: "Heures supplémentaires", type: "VARIABLE" },
    { code: "R003", nom: "Retenue CNSS", type: "CALCUL" },
    { code: "R004", nom: "Indemnité logement", type: "FIXE" },
    { code: "R005", nom: "Commission vente", type: "VARIABLE" },
  ];
}
