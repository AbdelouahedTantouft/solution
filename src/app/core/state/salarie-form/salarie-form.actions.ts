import { createAction, props } from "@ngrx/store";

export const updateFormValue = createAction(
  "[Salarie Form] Update Form Value",
  props<{ formValue: any }>()
);

export const setStep = createAction(
  "[Salarie Form] Set Current Step",
  props<{ step: number }>()
);

export const toggleBillingPeriod = createAction(
  "[Salarie Form] Toggle Billing Period"
);

export const markAsCompleted = createAction("[Salarie Form] Mark as Completed");
