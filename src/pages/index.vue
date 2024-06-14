<template>
  <div class="container p-4 mx-auto my-8">
    <h1 class="mb-8 text-4xl font-bold">Demo Form</h1>
    <form id="demo-form"
      class="grid grid-cols-2 gap-4">
      <FormField
        v-for="field in formStructure"
        :key="field.field"
        v-bind="field"
        v-model="formValues[field.field]"
        @submit="submitForm"
      />
      <button class="col-span-2 btn"
        :disabled="isSubmitting || !isFormValid"
        @click="submitForm">
        <LoadingSpinner v-if="isSubmitting" />
        Submit
      </button>
      <DebugFella>
formValues: {{ formValues }}
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
    select: string | null;
  }

  const { formValues, formErrors, isFormValid, isSubmitting, handleSubmit } = toRefs(useForm<DemoFormType>({
    initialValues: {
      name: null,
      email: null,
      number: null,
      select: null,
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
        'Option 1',
        'Option 2',
        'Option 3',
        {
          label: 'Group 1',
          options: [
            'Group 1 Option 1',
            'Group 1 Option 2',
            'Group 1 Option 3',
          ],
        },
        {
          label: 'Group 2',
          options: [
            'Group 2 Option 1',
            'Group 2 Option 2',
            'Group 2 Option 3',
          ],
        },
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
