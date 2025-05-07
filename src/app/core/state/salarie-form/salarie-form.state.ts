import { FormGroup } from "@angular/forms";

export interface EmployeePersonalInfo {
  matricule: string;
  titre: string;
  nom: string;
  prenom: string;
  sexe: string;
  situationFamiliale?: string;
  adresseLigne1: string;
  adresseLigne2?: string;
  country: string;
  city: string;
  nombreEnfants: number;
  enfantsCharge: number;
  prisEnCompte: boolean;
  email: string;
  phone: string;
  isActive: boolean;
  nationalite: string;
  dateNaissance: string; // ou Date si tu utilises un objet Date
  lieuNaissance: string;
  cin?: string;
  dateCin?: string; // ou Date
  ifSalarie?: string;
  datePasseport?: string; // ou Date
  carteSejour?: string;
}

export interface EmployeeContract {
  // Section poste
  poste: string;
  fonction: string;
  categorie: string;
  service: string;
  site: string;

  // Section établissement
  etablissement: string;
  filiale: string;
  pole: string;

  // Section emploi
  categorieSociopro: string;

  // Section contrat
  dateEmbauche: string; // ou Date
  periodeEssai: string;
  dateConfirmationPoste: string;
  natureContrat: string;
  dateDebut: string;
  dateFin: string;
  statut: string; // ex: "Permanent"

  // Section départ
  dateDepart: string;
  motifDepart: string;
}

export interface SocialOrganization {
  code: string;
  designation: string;
  type: string;
  registrationNumber: string;
  registrationDate: string;
}

export interface SalarieFormState {
  formValue: any;
  currentStep: number;
  billingPeriod: "monthly" | "yearly";
  completed: boolean;
}

export const initialSalarieFormState: SalarieFormState = {
  formValue: null,
  currentStep: 1,
  billingPeriod: "monthly",
  completed: false,
};
