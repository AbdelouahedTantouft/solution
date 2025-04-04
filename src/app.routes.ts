import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { CompanyListComponent } from './app/pages/company-list/company-list.component';
import { FicheSalarieComponent } from './app/pages/fiche-salarie/fiche-salarie.component';
import { ImportationVarComponent } from './app/pages/importation-var/importation-var.component';
import { PrametrageComptesComponent } from './app/pages/prametrage-comptes/prametrage-comptes.component';
import { PretsComponent } from './app/pages/prets/prets.component';
import { CalculPaieComponent } from './app/pages/calcul-paie/calcul-paie.component';
import { PaysVillesComponent } from './app/pages/pays-villes/pays-villes.component';
import { AnnualTreatmentComponent } from './app/pages/Cloture/annual-treatment/annual-treatment.component';


export const appRoutes: Routes = [
    {
        path: 'pages',
        component: AppLayout,
        children: [
            { path: 'dashboard', component: Dashboard },
            
            // { path: '', loadChildren: () => import('./app/pages/pages.routes') },
            { path: '', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    {path: 'pays-ville', component:PaysVillesComponent},
    { path: 'calcul-paie', component:CalculPaieComponent},
    { path: 'prets', component:PretsComponent},
    { path: 'prametrage-compte', component:PrametrageComptesComponent},
    {path : 'importation-var', component:ImportationVarComponent},
    { path: 'fiche-salarie', component:FicheSalarieComponent},
    { path: 'landing', component: Landing },
    { path: 'annual-treatment', component:AnnualTreatmentComponent},
    
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '', component: CompanyListComponent },
    { path: '**', redirectTo: '/notfound' }
];
