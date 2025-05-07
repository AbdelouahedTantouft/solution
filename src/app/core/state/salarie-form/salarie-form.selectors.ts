import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SalarieFormState } from "./salarie-form.state";

export const selectSalarieFormState =
  createFeatureSelector<SalarieFormState>("salarieForm");

export const selectFormValue = createSelector(
  selectSalarieFormState,
  (state) => state.formValue
);

export const selectCurrentStep = createSelector(
  selectSalarieFormState,
  (state) => state.currentStep
);

export const selectBillingPeriod = createSelector(
  selectSalarieFormState,
  (state) => state.billingPeriod
);

export const selectCompleted = createSelector(
  selectSalarieFormState,
  (state) => state.completed
);
