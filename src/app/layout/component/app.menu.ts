import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/pages/dashbord'] }]
            },
            {
                label: 'Gestion paie',
                icon: 'pi pi-fw pi-cog',
                items: [
                       {
                       
                                label: 'Fichiers de base',
                                icon: 'pi pi-fw pi-database',
                                items: [
                                    {
                                        label: 'Pays / Villes',
                                        icon: 'pi pi-fw pi-address-book',
                                        routerLink: ['/pages/pays-ville']
                                        
                                    },
                                    {
                                        label: 'Fonctions / Postes',
                                        icon: 'pi pi-fw pi-address-book',
                                        routerLink: ['/auth/error']
                                        
                                    },
                                    {
                                        label: 'Organismes sociaux ',
                                        icon: 'pi pi-fw pi-address-book',
                                        routerLink: ['/auth/error']
                                        
                                    },
                                    {
                                        label: 'Bases ',
                                        icon: 'pi pi-fw pi-address-book',
                                        routerLink: ['/auth/error']
                                        
                                    },
                                    {
                                        label: 'Rubriques ',
                                        icon: 'pi pi-fw pi-address-book',
                                        routerLink: ['/auth/error']
                                        
                                    },
                                    {
                                        label: 'Modèles bulletin ',
                                        icon: 'pi pi-fw pi-address-book',
                                        routerLink: ['/auth/error']
                                        
                                    },
                                    {
                                        label: 'Type prêts ',
                                        icon: 'pi pi-fw pi-address-book',
                                        routerLink: ['/auth/error']
                                        
                                    },
                                ]
                            },
                            {
                                label: 'Fiche salarié',
                                icon: 'pi pi-fw pi-address-book',
                                routerLink: ['/pages/fiche-salarie']
                            },
                            {
                                label: 'Traitement de la Paie',
                                icon: 'pi pi-fw pi-file-edit',
                                items: [
                                    { 
                                        label: 'Importation des Variables', 
                                        icon: 'pi pi-fw pi-file-import',
                                         routerLink: ['/pages/importation-var'] 
                                        },
                                        { 
                                            label: 'Saisie des prêts', 
                                            icon: 'pi pi-fw pi-file-edit',
                                             routerLink: ['/pages/prets'] 
                                            },
                                            { 
                                                label: 'Calcul de la paie', 
                                                icon: 'pi pi-fw pi-calculator',
                                                 routerLink: ['/pages/calcul-paie'] 
                                                },
                                                {
                                                    label: 'Bulletin de paie',
                                                    icon: 'pi pi-fw pi-file-o',
                                                    items: [
                                                        { 
                                                            label: 'Saisie des avances', 
                                                            icon: 'pi pi-fw pi-home',
                                                             routerLink: ['/'] 
                                                            },
                                                        { 
                                                        label: 'Saisie des variables', 
                                                        icon: 'pi pi-fw pi-home',
                                                         routerLink: ['/'] 
                                                        },
                                                        { 
                                                            label: 'Bulletin de paie', 
                                                            icon: 'pi pi-fw pi-home',
                                                             routerLink: ['/'] 
                                                            },
                                                            { 
                                                                label: 'Correction bulletin clôture', 
                                                                icon: 'pi pi-fw pi-home',
                                                                 routerLink: ['/'] 
                                                                },
                                                                {
                                                                    label: 'Simulation calcul à l\'envers', 
                                                                    icon: 'pi pi-fw pi-home',
                                                                    routerLink: ['/']
                                                                  },
                                                                    { 
                                                                        label: 'Simulation calcul à l\'envers / salarie', 
                                                                        icon: 'pi pi-fw pi-home',
                                                                         routerLink: ['/'] 
                                                                        },
                                                        ]
                                                },
                                              
                                    ]
                            },
                            {
                                label: 'Edition Bulletin',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [  {
                                    label: 'Bulletin ',
                                    icon: 'pi pi-fw pi-clipboard',
                                    items: [
                                        { 
                                        label: 'Paramètre impression bulletin', 
                                        icon: 'pi pi-fw pi-home',
                                         routerLink: ['/']
                                         },
                                         { 
                                            label: 'Edition bulletin', 
                                            icon: 'pi pi-fw pi-home',
                                             routerLink: ['/']
                                             },
                                             { 
                                                label: 'Envoyer mail: bulletins salariés', 
                                                icon: 'pi pi-fw pi-home',
                                                 routerLink: ['/']
                                                 },
                                                 { 
                                                    label: 'Bulletin recapitulatif', 
                                                    icon: 'pi pi-fw pi-home',
                                                     routerLink: ['/']
                                                     },
                                        ]
                                },]
                            },
                            {
                                label: 'Parametre',
                                icon: 'pi pi-fw pi-cog',
                                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
                            },
                        ]
            },
                    
                { 
                            label: 'Edition',
                            icon: 'pi pi-fw pi-cog',
                            items: [
                                   
                   
                            {
                                label: 'Livre de paie',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Etat CNSS',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Etat IR',
                                icon: 'pi pi-fw pi-clipboard',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Etat 9421',
                                icon: 'pi pi-fw pi-clipboard',
                                routerLink: ['/auth/access']
                            },
                            {
                            label: 'Divers Etats',
                            icon: 'pi pi-fw pi-clipboard',
                            items: [
                                {
                                    label: 'Livre de paie',
                                    icon: 'pi pi-fw pi-sign-in',
                                    routerLink: ['/auth/login']
                                }]
                            },
                            {
                                label: 'Etat Liste Paiement',
                                icon: 'pi pi-fw pi-clipboard',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Etat des congés',
                                icon: 'pi pi-fw pi-clipboard',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Attestation',
                                icon: 'pi pi-fw pi-id-card',
                                items: [
                                    {
                                        label: 'Livre de paie',
                                        icon: 'pi pi-fw pi-sign-in',
                                        routerLink: ['/auth/login']
                                    }]
                             },
                                {
                                    label: 'Liste salaries sortants',
                                    icon: 'pi pi-fw pi-list-check',
                                    routerLink: ['/auth/access']
                                },
                                {
                                    label: 'Exportation données',
                                    icon: 'pi pi-fw pi-file-export',
                                    routerLink: ['/auth/access']
                                },
                            
                        ]
                
                },
                    
                    
                {
                            label: 'Télédéclaration',
                            icon: 'pi pi-fw pi-user',
                            items: [
                                {
                                    label: 'Génération BDS',
                                    icon: 'pi pi-fw pi-sign-in',
                                    routerLink: ['/auth/login']
                                },
                                {
                                    label: 'Virement bancaire',
                                    icon: 'pi pi-fw pi-credit-card',
                                    routerLink: ['/auth/error']
                                },
                                {
                                    label: 'FICHIER CIMR',
                                    icon: 'pi pi-fw pi-copy',
                                    routerLink: ['/auth/error']
                                }
                            ]
                    },
                    {
                        label: 'Modélisation comptable',
                        icon: 'pi pi-fw pi-folder',
                        items: [
                            {
                                label: 'Paramétrage des comptes',
                                icon: 'pi pi-fw pi-cog',
                                items: [
                                    {
                                        label: 'Plan comptable',
                                        icon: 'pi pi-fw pi-times-circle',
                                        routerLink: ['/pages/prametrage-compte']
                                   

                                    }]
                            },
                            {
                                label: 'Ecritures comptables',
                                icon: 'pi pi-fw pi-file-edit',
                                items: [
                                    {
                                        label: 'FICHIER CIMR',
                                        icon: 'pi pi-fw pi-times-circle',
                                        routerLink: ['/auth/error']
                                   

                                    }]
                            },
                           
                        ]
                },
                {
                    label: 'Clôture',
                    icon: 'pi pi-fw pi-lock',
                    items: [
                        {
                            label: 'Clôture mensuelle',
                            icon: 'pi pi-fw pi-lock',
                            routerLink: ['/auth/login']
                        },
                        {
                            label: 'Clôture annuelle',
                            icon: 'pi pi-fw pi-lock',
                            routerLink: ['/Cloture/annual-treatment']
                        },
                        {
                            label: 'Sauvegarder',
                            icon: 'pi pi-fw pi-save',
                            routerLink: ['/auth/error']
                        }
                    ]
                 },
                    /*
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] },

            */
            /*
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    }
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/primefaces/sakai-ng',
                        target: '_blank'
                    }
                ]
            }*/
        ];
    }
}
