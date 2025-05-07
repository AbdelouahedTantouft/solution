import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface BankInfo {
  name: string;
  agency: string;
  rib: string;
}

@Component({
  selector: "app-bank-payment-form",
  imports: [CommonModule, FormsModule],
  templateUrl: "./bank-payment-form.component.html",
  styleUrl: "./bank-payment-form.component.scss",
})
export class BankPaymentFormComponent {

  paymentModes: string[] = ['Virement', 'Chèque', 'Espèces', 'Carte bancaire'];
  selectedPaymentMode: string = '';
  
  banks: string[] = ['Attijariwafa Bank', 'BMCE Bank', 'Banque Populaire', 'CIH Bank', 'Crédit Agricole', 'Crédit du Maroc'];
  
  bankInfo1: BankInfo = {
    name: '',
    agency: '',
    rib: ''
  };
  
  bankInfo2: BankInfo = {
    name: '',
    agency: '',
    rib: ''
  };
  
  saveForm(): void {
    console.log('Payment Mode:', this.selectedPaymentMode);
    console.log('Bank 1:', this.bankInfo1);
    console.log('Bank 2:', this.bankInfo2);
   
  }
}
