import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { CompanyService } from '../company/company.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { Company } from '../company/Company';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss'],
    imports: [CommonModule, RouterModule, FormsModule, CardModule, ButtonModule, InputTextModule, ToastModule, ProgressSpinnerModule, DividerModule],
    providers: [MessageService],
    standalone: true,
    animations: [
        trigger('fadeIn', [transition(':enter', [style({ opacity: 0, transform: 'translateY(20px)' }), animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))])]),
        trigger('cardHover', [transition(':hover', [animate('200ms ease-out', style({ transform: 'scale(1.02)' }))])])
    ]
})
export class CompanyListComponent implements OnInit {
    companies: Company[] = [];
    filteredCompanies: Company[] = [];
    loading: boolean = true;

    constructor(
        private router: Router,
        private companyService: CompanyService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadCompanies();
    }

    loadCompanies() {
        this.companyService.getAll().subscribe({
            next: (data) => {
                this.companies = data;
                this.filteredCompanies = data;
                this.loading = false;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Échec du chargement des entreprises',
                    life: 3000
                });
                this.loading = false;
            }
        });
    }

    handleAdminClick() {
        localStorage.setItem(
            'entrlogdata',
            JSON.stringify({
                id: 0,
                logo: 'images/logo-client-light.png'
            })
        );
        this.router.navigate(['/auth/login']);
    }

    handleCompanyClick(company: Company) {
        localStorage.setItem(
            'entrlogdata',
            JSON.stringify({
                id: company.id,
                logo: company.logo
            })
        );
        this.router.navigate(['/login']);
    }

    handleSearch(event: Event) {
        const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
        this.filteredCompanies = this.companies.filter((company) => company.name.toLowerCase().includes(searchTerm));
    }
}
