import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Company } from './Company';
import { CompanyService } from './company.service';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss'],
    imports: [ToolbarModule, TableModule,InputTextModule , DialogModule, FileUploadModule, CommonModule, FormsModule, ButtonModule],
    standalone: true,
    providers: [MessageService]
})
export class CompanyComponent implements OnInit {
    @ViewChild('dt') dt: Table | undefined;
    @ViewChild('fileUpload') fileUpload: FileUpload | undefined;

    products: Company[] = [];
    product: Company = this.getEmptyProduct();
    selectedProducts: Company[] = [];
    productDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    submitted: boolean = false;
    loadPage: boolean = false;
    userProfil: string = '';
    constructor(
        private companyService: CompanyService,
        private messageService: MessageService
    ) {
        const userData = localStorage.getItem('user');
        if (userData) {
            this.userProfil = JSON.parse(userData).profil;
        }
    }

    ngOnInit() {
        this.loadCompanies();
    }

    getEmptyProduct(): Company {
        return {
            id: '',
            name: '',
            code: '',
            email: '',
            logo: '',
            profil: '',
            dateAjout: null,
            password_db: '',
            user_db: '',
            server_db: '',
            port_db: '',
            database_db: ''
        };
    }

    loadCompanies() {
        this.companyService.getAll().subscribe((data) => {
            this.products = data;
        });
    }

    openNew() {
        this.product = this.getEmptyProduct();
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'les utilisateurs sont supprimés',
            life: 3000
        });
        this.selectedProducts = [];
    }

    editProduct(product: Company) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct() {
        this.loadPage = true;
        this.companyService.synchCompany(this.product.id).subscribe({
            next: (res: any) => {
                if (res?.error) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Refusé',
                        detail: res?.message,
                        life: 3000
                    });
                } else {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Réussi',
                        detail: 'La synchronisation est Ok',
                        life: 3000
                    });
                }
                this.deleteProductDialog = false;
                this.loadPage = false;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'An error occurred during synchronization',
                    life: 3000
                });
                this.loadPage = false;
            }
        });
    }

    confirmDelete(product: Company) {
        this.product = product;
        this.deleteProductDialog = true;
    }

    saveProduct() {
        this.submitted = true;
        this.loadPage = true;

        if (!this.product.logo || !this.product.name) {
            this.messageService.add({
                severity: 'error',
                summary: 'Refusé',
                detail: "L'entreprise n'est pas créé",
                life: 3000
            });
            this.loadPage = false;
            return;
        }

        this.companyService.saveCompany(this.product).subscribe({
            next: (res: any) => {
                if (res?.error) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Refusé',
                        detail: res?.message,
                        life: 3000
                    });
                } else {
                    this.loadCompanies();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Réussi',
                        detail: this.product.id ? "L'entreprise est mis à jour" : "L'entreprise est crée",
                        life: 3000
                    });
                    this.productDialog = false;
                    this.product = this.getEmptyProduct();
                }
                this.loadPage = false;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'An error occurred while saving',
                    life: 3000
                });
                this.loadPage = false;
            }
        });
    }

    onUpload(event: any) {
        const file = event.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.product.logo = reader.result as string;
        };
        this.fileUpload?.clear();
    }
}
