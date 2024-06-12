import { type ValidationArgs } from '@vuelidate/core';

export type UseFormParams<T extends Record<string, any>> = {
  initialValues: T,
  validationRules: ValidationArgs,
}
