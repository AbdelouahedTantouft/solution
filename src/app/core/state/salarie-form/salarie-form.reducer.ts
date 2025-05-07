import { createReducer, on } from '@ngrx/store';
import {
  initialSalarieFormState
} from './salarie-form.state';
import * as SalarieFormActions from './salarie-form.actions';

export const salarieFormReducer = createReducer(
  initialSalarieFormState,

  on(SalarieFormActions.updateFormValue, (state, { formValue }) => ({
    ...state,
    formValue
  })),

  on(SalarieFormActions.setStep, (state, { step }) => ({
    ...state,
    currentStep: step
  })),

  on(SalarieFormActions.toggleBillingPeriod, (state) => ({
    ...state,
    billingPeriod: state.billingPeriod === 'monthly' ? 'yearly' : 'monthly'
  })),

  on(SalarieFormActions.markAsCompleted, (state) => ({
    ...state,
    completed: true
  }))
);
