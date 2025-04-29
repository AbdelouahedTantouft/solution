import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private  apiUrl: string ='';
    constructor(private http: HttpClient) { }

    private getHeaders(companyId?: string) {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        if (companyId) {
            headers = headers.set('companyId', companyId);
        }

        return { headers };
    }

    getAll():Observable<any> {
        return this.http.get(`${this.apiUrl}/company/all`, this.getHeaders());
    }

    saveCompany(data: any) {
        return this.http.post(`${this.apiUrl}/company`, data, this.getHeaders());
    }

    synchCompany(companyId: string) {
        return this.http.get(`${this.apiUrl}/company-sage/alluser`,
            this.getHeaders(companyId));
    }
}

