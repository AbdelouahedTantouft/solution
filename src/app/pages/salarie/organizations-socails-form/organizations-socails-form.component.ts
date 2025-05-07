import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

interface SocialOrganization {
  code: string;
  designation: string;
  type: string;
  registrationNumber: string;
  registrationDate: string;
  isEditing?: boolean;
}
@Component({
  selector: "app-organizations-socails-form",
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./organizations-socails-form.component.html",
  styleUrl: "./organizations-socails-form.component.scss",
})
export class OrganizationsSocailsFormComponent {
  organizations: SocialOrganization[] = [
    {
      code: "01",
      designation: "CNSS",
      type: "CNSS",
      registrationNumber: "",
      registrationDate: "",
    },
    {
      code: "02",
      designation: "CIMR 6%",
      type: "CIMR",
      registrationNumber: "",
      registrationDate: "",
    },
    {
      code: "03",
      designation: "MUTUELLE",
      type: "MUTUELLE",
      registrationNumber: "",
      registrationDate: "",
    },
    {
      code: "04",
      designation: "AMO",
      type: "MUTUELLE",
      registrationNumber: "",
      registrationDate: "",
    },
    {
      code: "05",
      designation: "CIMR 4.5 %",
      type: "CIMR",
      registrationNumber: "",
      registrationDate: "",
    },
  ];

  editOrganization(org: SocialOrganization): void {
    org.isEditing = true;
  }

  saveOrganization(org: SocialOrganization): void {
    org.isEditing = false;
    console.log('Saved:', org);
  }
}
