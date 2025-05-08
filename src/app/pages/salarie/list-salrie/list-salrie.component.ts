import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { FormStateService } from "../../../core/state/salarie-form/form-state.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-list-salrie",
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: "./list-salrie.component.html",
  styleUrl: "./list-salrie.component.scss",
})
export class ListSalrieComponent {
  activeTab: string = "annual-closing";
  formDataItems: any[] = [];
  private subscription: Subscription = new Subscription();

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

  constructor(private formStateService: FormStateService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.formStateService.formDataItems$.subscribe((items) => {
        this.formDataItems = items;
      })
    );

    this.formDataItems = this.formStateService.getAllFormDataItems();
    console.log(this.formDataItems);
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
