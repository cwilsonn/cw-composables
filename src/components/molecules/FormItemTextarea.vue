<template>
  <FormItemBase v-bind="formItemBaseProps">
    <template #[`${name}-input`]>
      <textarea v-model="value"
        v-bind="textareaProps"></textarea>
    </template>
  </FormItemBase>
</template>

<script setup
  lang="ts">
  import { computed } from 'vue';

  import FormItemBase from './FormItemBase.vue';
  import type { FormItemBaseProps, FormItemTextareaProps } from '@/types/components/forms';

  const props = defineProps<FormItemTextareaProps>();

  const value = defineModel();

  const formItemBaseProps = computed(() => {
    const { label, name, ...rest } = props;
    const formItemBaseProps: FormItemBaseProps = {
      label,
      name,
      ...rest,
    };

    return formItemBaseProps;
  });

  const textareaProps = computed(() => ({
    id: props.name,
    name: props.name,
    rows: props.rows,
    class: {
      'textarea textarea-bordered': true,
    },
  }));
</script>
