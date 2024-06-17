<template>
  <div class="container p-4 mx-auto my-8">
    <h1 class="mb-8 text-4xl font-bold">Demo Form</h1>
    <form id="demo-form"
      class="grid grid-cols-2 gap-4">
      <FormField v-for="field in formStructure"
        :key="field.field"
        v-bind="field"
        v-model="formValues[field.field]"
        @submit="submitForm" />
      <button class="col-span-2 btn"
        :disabled="isSubmitting || !isFormValid"
        @click="submitForm">
        <LoadingSpinner v-if="isSubmitting" />
        Submit
      </button>
      <DebugFella open
        summary="form values">
        {{ formValues }}
      </DebugFella>
    </form>
  </div>
</template>

<script setup
  lang="ts">
  import { computed, toRefs } from 'vue';

  import { required, email, integer } from '@vuelidate/validators';

  import { type FormStructure } from '@/types/components/forms';
  import useForm from '@composables/useForm';
  import DebugFella from '@atoms/DebugFella.vue';
  import LoadingSpinner from '@atoms/LoadingSpinner.vue';
  import FormField from '@/components/molecules/FormField.vue';

  type DemoFormType = {
    name: string | null;
    email: string | null;
    number: number | null;
    select: string | number | Array<string | number> | null;
    textarea: string | null;
    checkboxes: Array<string | number> | null;
    toggles: Array<string | number> | null;
    radios: string | number | null;
  }

  const { formValues, formErrors, isFormValid, isSubmitting, handleSubmit } = toRefs(useForm<DemoFormType>({
    initialValues: {
      name: null,
      email: null,
      number: null,
      select: null,
      textarea: null,
      checkboxes: null,
      toggles: null,
      radios: null,
    },
    validationRules: {
      name: { required },
      email: { required, email },
      number: { integer },
      select: { required },
    },
  }));

  const formStructure = computed((): FormStructure<DemoFormType>[] => ([
    {
      field: 'name',
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      errors: formErrors.value.name,
    },
    {
      field: 'email',
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      errors: formErrors.value.email,
    },
    {
      field: 'number',
      name: 'number',
      label: 'Number',
      type: 'number',
      errors: formErrors.value.number,
      wrapperProps: { class: 'col-span-2' },
    },
    {
      field: 'select',
      name: 'select',
      label: 'Select',
      type: 'select',
      wrapperProps: { class: 'col-span-2' },
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
        {
          label: 'Group 1',
          value: 'group1',
          options: [
            { value: '4', label: 'Group 1 Option 1' },
            { value: '5', label: 'Group 1 Option 2' },
            { value: '6', label: 'Group 1 Option 3' },
          ],
        },
        {
          label: 'Group 2',
          value: 'group2',
          options: [
            { value: '7', label: 'Group 2 Option 1' },
            { value: '8', label: 'Group 2 Option 2' },
            { value: '9', label: 'Group 2 Option 3' },
          ],
        },
      ],
    },
    {
      field: 'textarea',
      name: 'textarea',
      label: 'Textarea',
      type: 'textarea',
      errors: formErrors.value.textarea,
      wrapperProps: { class: 'col-span-2' },
      inputProps: { rows: 5 },
    },
    {
      field: 'checkboxes',
      name: 'checkboxes',
      label: 'Checkboxes',
      type: 'checkboxes',
      errors: formErrors.value.checkboxes,
      wrapperProps: { class: 'col-span-1' },
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    {
      field: 'toggles',
      name: 'toggles',
      label: 'Switches',
      type: 'toggles',
      errors: formErrors.value.toggles,
      wrapperProps: { class: 'col-span-1' },
      inputProps: { class: 'toggle-success' },
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    {
      field: 'radios',
      name: 'radios',
      label: 'Contact preference',
      type: 'radios',
      errors: formErrors.value.radios,
      wrapperProps: { class: 'col-span-1' },
      options: [
        { value: 'contact-email', label: 'Email' },
        { value: 'contact-sms', label: 'SMS' },
        { value: 'contact-phone', label: 'Phone call' },
      ],
    },
  ]));

  async function submitForm() {
    handleSubmit.value(async (values) => {
      await new Promise<void>((resolve) => setTimeout(() => {
        console.log('Form submitted', values);
        resolve();
      }, 2000));
    });
  }
</script>
