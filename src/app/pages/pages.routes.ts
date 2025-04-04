import { Routes } from '@angular/router';
import { Crud } from './crud/crud';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyComponent } from './company/company.component';
import { Dashboard } from './dashboard/dashboard';
import { Landing } from './landing/landing';

import { FicheSalarieComponent } from './fiche-salarie/fiche-salarie.component';
import { ImportationVarComponent } from './importation-var/importation-var.component';
import { PrametrageComptesComponent } from './prametrage-comptes/prametrage-comptes.component';
import { PretsComponent } from './prets/prets.component';
import { CalculPaieComponent } from './calcul-paie/calcul-paie.component';
import { PaysVillesComponent } from './pays-villes/pays-villes.component';
import { AnnualTreatmentComponent } from './Cloture/annual-treatment/annual-treatment.component';


export default [
     {path: 'pays-ville', component:PaysVillesComponent},
    { path: 'crud', component: Crud },
    { path: 'company', component: CompanyComponent },
    { path: 'dashbord', component:Dashboard},
    { path: 'landing', component:Landing},
    { path:  'company-list', component:CompanyComponent},
    { path: 'fiche-salarie', component:FicheSalarieComponent},
    { path: 'importation-var', component:ImportationVarComponent},
    { path: 'prametrage-compte', component:PrametrageComptesComponent},
    { path: 'prets', component:PretsComponent},
    { path: 'calcul-paie', component:CalculPaieComponent},
    { path: 'annual-treatment', component:AnnualTreatmentComponent},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
