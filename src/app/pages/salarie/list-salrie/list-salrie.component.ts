import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-list-salrie",
  imports: [RouterModule],
  templateUrl: "./list-salrie.component.html",
  styleUrl: "./list-salrie.component.scss",
})
export class ListSalrieComponent {
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
}
