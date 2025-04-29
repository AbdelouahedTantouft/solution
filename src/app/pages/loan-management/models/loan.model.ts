export interface Loan {
    id: number | null;
    code: string;
    designation: string;
    typeDePret: string;
    rubriqueMontantPret: string;
    rubriqueMontantEcheance: string;
    rubriqueSoldePret: string;
    isShortTerm: boolean; // true pour court-terme, false pour long-terme
  }
  
  export interface RubriqueSearchResult {
    code: string;
    name: string;
  }