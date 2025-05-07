import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-fiche-salarie",
  imports: [RouterModule],
  templateUrl: "./fiche-salarie.component.html",
  styleUrl: "./fiche-salarie.component.scss",
})
export class FicheSalarieComponent {
  activeTab: string = "annual-closing";

  tabs = [
    {
      id: "liste-des-salariés",
      label: "Liste des salariés",
      icon: "file-text",
    },

    {
      id: "etat-civil",
      label: "Etat Civil",
      icon: "database",
    },
    {
      id: "contrat-de-travail",
      label: "Contrat de travail",
      icon: "database",
    },
    {
      id: "organismes-sociaux",
      label: "Organismes sociaux",
      icon: "database",
    },
    {
      id: "cordonnees-bancaires",
      label: "Cordonnees bancaires",
      icon: "database",
    },
    {
      id: "cordonnees-bancaires",
      label: "Cordonnees bancaires",
      icon: "database",
    },
  ];

  constructor(
      
      private router: Router ) {}
}
