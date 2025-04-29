import { Component } from "@angular/core";

@Component({
  selector: "app-rubrique-list",
  imports: [],
  templateUrl: "./rubrique-list.component.html",
  styleUrl: "./rubrique-list.component.scss",
})
export class RubriqueListComponent {
  rubriques: Rubrique[] = [
    { code: "R001", nom: "Salaire de base", type: "FIXE" },
    { code: "R002", nom: "Indemnité transport", type: "FIXE" },
    { code: "R003", nom: "Indemnité repas", type: "FIXE" },
    { code: "R004", nom: "Prime de performance", type: "VARIABLE" },
    { code: "R005", nom: "Prime d’ancienneté", type: "CALCUL" },
    { code: "R006", nom: "Heures supplémentaires", type: "VARIABLE" },
    { code: "R007", nom: "Congé payé", type: "CALCUL" },
    { code: "R008", nom: "Primes exceptionnelles", type: "VARIABLE" },
    { code: "R009", nom: "Retenue IR", type: "CALCUL" },
    { code: "R010", nom: "Avantages en nature", type: "FIXE" },
    { code: "R011", nom: "Cotisation CNSS", type: "CALCUL" },
    { code: "R012", nom: "Cotisation AMO", type: "CALCUL" },
    { code: "R013", nom: "Prêt employé", type: "FIXE" },
    { code: "R014", nom: "Bonus annuel", type: "VARIABLE" },
    { code: "R015", nom: "Frais professionnels", type: "FIXE" },
    { code: "R016", nom: "Heures nuit", type: "VARIABLE" },
    { code: "R017", nom: "Indemnité risque", type: "FIXE" },
    { code: "R018", nom: "Retenue disciplinaire", type: "VARIABLE" },
    { code: "R019", nom: "Prime d’équipe", type: "VARIABLE" },
    { code: "R020", nom: "Gratification", type: "CALCUL" },
  ];
}
