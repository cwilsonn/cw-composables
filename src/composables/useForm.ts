import { ErrorObject, useVuelidate } from '@vuelidate/core';

import type { UseFormParams } from '$types/useForm.d.ts';

import { toRaw, ref, reactive, computed, watch, type UnwrapRef } from 'vue';

export default function useForm<T extends Record<string, any>>({ initialValues, validationRules }: { initialValues: T, validationRules: UseFormParams<T>['validationRules'] }) {
  const initialValuesSnapshot = JSON.parse(JSON.stringify(toRaw(initialValues)));
  const formValues = ref<T>(initialValues);
  const v$ = useVuelidate(validationRules, formValues, { $scope: false });
  const isFormValid = computed(() => !v$.value.$invalid);
  const isFormDirty = computed(() => v$.value.$dirty);
  const isLoading = ref(false);
  const isSubmitting = ref(false);

  const formErrors = computed(() => {
    return Object.keys(formValues.value as T)
      .reduce((errors, property) => {
        v$.value[property]?.$errors.length
          ? errors[property as keyof T] = v$.value[property].$errors.map((e: ErrorObject) => e.$message)
          : errors[property as keyof T] = [];
        return errors;
      }, {} as Record<keyof T, string[]>);
  });

  function resetForm() {
    formValues.value = JSON.parse(JSON.stringify(initialValuesSnapshot));
    v$.value.$reset();
  }

  function clearForm() {
    if (typeof formValues.value !== 'object' || formValues.value === null) return;
    formValues.value = Object.keys(initialValuesSnapshot).reduce((acc: Record<string, any>, key) => {
      acc[key] = null;
      return acc;
    }, {}) as UnwrapRef<T>;
    v$.value?.$reset();
  }

  async function handleSubmit(callback: (values: typeof formValues.value) => Promise<void>) {
    if (isLoading.value || isSubmitting.value) return;

    if (!isFormValid.value) {
      v$.value.$touch();
      return;
    }

    isSubmitting.value = true;
    await callback(formValues.value);
    resetForm();
    isSubmitting.value = false;
  }

  // Ensure that changes to values properties are synced with the associated
  // Vuelidate instance model values
  watch(() => formValues, (values) => {
    if (typeof values.value !== 'object' || values.value === null) return;
    Object.keys(values.value).forEach((key) => {
      const value = (values.value as T)[key];
      if (!v$.value[key] || !value) return;
      if (!v$.value[key].$dirty) v$.value[key].$touch();
      v$.value[key].$model = value;
    });
  }, { deep: true });

  return reactive({
    formValues,
    isFormValid,
    isFormDirty,
    isLoading,
    isSubmitting,
    formErrors,
    resetForm,
    clearForm,
    handleSubmit,
    v$,
  });

};
