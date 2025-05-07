import { Routes } from "@angular/router";
import { Crud } from "./crud/crud";
import { CompanyListComponent } from "./company-list/company-list.component";
import { CompanyComponent } from "./company/company.component";
import { Dashboard } from "./dashboard/dashboard";
import { Landing } from "./landing/landing";

import { FicheSalarieComponent } from "./fiche-salarie/fiche-salarie.component";
import { ImportationVarComponent } from "./importation-var/importation-var.component";
import { PrametrageComptesComponent } from "./prametrage-comptes/prametrage-comptes.component";
import { PretsComponent } from "./prets/prets.component";
import { CalculPaieComponent } from "./calcul-paie/calcul-paie.component";
import { PaysVillesComponent } from "./pays-villes/pays-villes.component";
import { AnnualTreatmentComponent } from "./Cloture/annual-treatment/annual-treatment.component";
import { RubriqueAddComponent } from "./rubriques/rubrique-add/rubrique-add.component";
import { RubriqueViewComponent } from "./rubriques/rubrique-view/rubrique-view.component";
import { ListSalrieComponent } from "./salarie/list-salrie/list-salrie.component";
import { EtatCivilComponent } from "./salarie/etat-civil/etat-civil.component";
import { ContractTravailComponent } from "./salarie/contract-travail/contract-travail.component";
import { SalarieFormComponent } from "./salarie/salarie-form/salarie-form.component";

export default [
  { path: "pays-ville", component: PaysVillesComponent },
  { path: "crud", component: Crud },
  { path: "company", component: CompanyComponent },
  { path: "dashbord", component: Dashboard },
  { path: "landing", component: Landing },
  { path: "company-list", component: CompanyComponent },
  { path: "fiche-salarie", component: FicheSalarieComponent },
  { path: "importation-var", component: ImportationVarComponent },
  { path: "prametrage-compte", component: PrametrageComptesComponent },
  { path: "prets", component: PretsComponent },
  { path: "calcul-paie", component: CalculPaieComponent },
  { path: "Cloture/annual-treatment", component: AnnualTreatmentComponent },
  { path: "rubriques/rubrique-add", component: RubriqueAddComponent },
  { path: "rubriques/rubrique-list", component: RubriqueAddComponent },
  { path: "rubriques/view-item/:code", component: RubriqueViewComponent },
  { path: "rubriques/add-item", component: RubriqueViewComponent },
  //{ path: "salarie/add-salarie", component: SalarieFormComponent },
  {
    path: "fiche-salarie",
    component: FicheSalarieComponent,
    children: [
      { path: "", redirectTo: "liste-salaries", pathMatch: "full" },
      { path: "liste-salaries", component: ListSalrieComponent },
      { path: "etat-civil", component: EtatCivilComponent },
      { path: "contrat-travail", component: ContractTravailComponent },
      { path: 'add-salarie', component: SalarieFormComponent }
      
    ],
  },
] as Routes;
