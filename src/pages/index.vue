<template>
  <div class="container p-4 mx-auto my-8">
    <h1 class="mb-8 text-4xl font-bold">Demo Form</h1>
    <form id="demo-form"
      class="flex flex-col gap-4">
      <FormItemBase v-for="item in formStructure"
        v-model="formValues[item.name]"
        :key="item.name"
        :name="item.name"
        :label="item.label"
        :required="item.required"
        :errors="item.errors" />
      <button class="btn"
        :disabled="isSubmitting || !isFormValid"
        @click="submitForm">
        <LoadingSpinner v-if="isSubmitting" />
        Submit
      </button>
    </form>
  </div>
</template>

<script setup
  lang="ts">
  import { computed, toRefs } from 'vue';

  import { required, email, integer } from '@vuelidate/validators';

  import useForm from '@composables/useForm';
  import LoadingSpinner from '@atoms/LoadingSpinner.vue';
  import FormItemBase, { type FormItemBaseProps } from '@/components/molecules/FormItemBase.vue';

  type DemoFormType = {
    name: string | null;
    email: string | null;
    number: number | null;
  }

  type FormStructureType<T> = { name: keyof T } & FormItemBaseProps;

  const { formValues, formErrors, isFormValid, isSubmitting, handleSubmit, v$ } = toRefs(useForm<DemoFormType>({
    initialValues: {
      name: null,
      email: null,
      number: null,
    },
    validationRules: {
      name: { required },
      email: { required, email },
      number: { integer }
    },
  }));

  const formStructure = computed((): FormStructureType<DemoFormType>[] => ([
    {
      name: 'name',
      label: 'Name',
      required: true,
      errors: formErrors.value.name,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      errors: formErrors.value.email,
    },
    {
      name: 'number',
      label: 'Number',
      type: 'number',
      errors: formErrors.value.number,
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
