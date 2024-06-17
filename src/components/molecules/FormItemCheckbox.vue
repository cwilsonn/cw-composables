<template>
  <div class="form-control"
    v-bind="wrapperProps">
    <label v-bind="labelProps">
      <input v-bind="inputProps"
        v-model="value" />
      <span class="label-text">
        <slot :name="`${value}-label`">
          {{ label }}
        </slot>
      </span>
    </label>
  </div>
</template>

<script setup
  lang="ts">
  import { computed } from 'vue';

  import type { FormItemCheckboxProps } from '$types/components/forms';

  const props = defineProps<FormItemCheckboxProps>();

  const value = defineModel<boolean>();

  const labelProps = computed(() => ({
    for: props.value,
    class: [
      'label',
      'cursor-pointer',
      'justify-start',
      'gap-2',
    ],
  }));

  const inputProps = computed(() => ({
    id: props.value,
    name: props.value,
    type: 'checkbox',
    class: {
      'checkbox justify-start gap-2': true,
    },
    disabled: props.disabled,
    ...props.inputProps,
  }));
</script>