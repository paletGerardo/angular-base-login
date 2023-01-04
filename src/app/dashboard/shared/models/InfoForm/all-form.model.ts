import { PayForm } from "./pay-form.model";
import { PersonalDataForm } from "./personal-data-form.model";
import { SaleDetailForm } from "./sale-detail-form.model";

export interface AllForm{
    personalDataForm:PersonalDataForm;
    saleDetailForm:SaleDetailForm;
    payForm:PayForm;
     
 }