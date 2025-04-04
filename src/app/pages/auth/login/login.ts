import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { AuthSync } from './auth.sync';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginInfo } from './LoginInfo';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

// @Component({
//     selector: 'app-login',
//     templateUrl: './login.component.html',
//     styleUrls: ['./login.component.scss'],
//     standalone: true,
//     providers: [MessageService],
//     imports: [ProgressSpinnerModule, CardModule, ToastModule, FormsModule, Button, NgIf]
// })
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, CardModule, ButtonModule, InputTextModule, ToastModule,
        ProgressSpinnerModule, NgOptimizedImage, ReactiveFormsModule],
    providers: [MessageService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    matricule: string = '';
    mdp: string = '';
    load: boolean = false;
    logo: string | null = null;
    name: string = '';

    loginForm!: FormGroup;
    constructor(
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService,
        private authSync: AuthSync,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            remember: [false]
        });
        const entrlogdata = localStorage.getItem('entrlogdata');
        if (entrlogdata) {
            const data = JSON.parse(entrlogdata);
            this.logo = data['logo'];
        } else {
            this.router.navigate(['/']);
        }
    }

    handleMatricule(event: Event): void {
        this.matricule = (event.target as HTMLInputElement).value;
    }

    handleMdp(event: Event): void {
        this.mdp = (event.target as HTMLInputElement).value;
    }

    async login(event: Event): Promise<void> {
        this.load = true;
        event.preventDefault();
        const credentials = this.loginForm.value
        if (credentials.email.trim() === '' || credentials.password.trim() === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Tous les champs sont obligatoires',
                life: 3000
            });
            this.load = false;
            return;
        }

        const dataCompany = localStorage.getItem('entrlogdata') ? JSON.parse(localStorage.getItem('entrlogdata')!) : {};

        const loginInfo: LoginInfo = {
            username: credentials.email,
            password: credentials.password,
            company: dataCompany['id']
        };

        try {
            const res = await this.authService.login(loginInfo).toPromise();

            //if (res?.error) {
                if (res?.message.includes('Erreur')) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: res?.message,
                    life: 3000
                });
            } else {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: res?.message,
                    life: 3000
                });

                this.authSync.notifyLoginSuccess();
                //localStorage.setItem('user', JSON.stringify(res?.id));
                //localStorage.setItem('token', res?.token);
                localStorage.setItem('token', 'fake-jwt-token');
                localStorage.setItem('user', JSON.stringify({ id: '12345', name: 'Utilisateur Test' }));

                setTimeout(() => {
                    this.router.navigate(['pages/company']);
                }, 3000);
            }
        } catch (err) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Attention',
                detail: 'Système en maintenance',
                life: 3000
            });
            console.error(err);
        } finally {
            this.load = false;
        }
    }
}

