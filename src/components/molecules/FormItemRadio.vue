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

  import type { FormItemRadioProps } from '$types/components/forms';

  const props = defineProps<FormItemRadioProps>();

  const value = defineModel<boolean>();

  const labelProps = computed(() => ({
    for: props.value as string,
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
    value: props.value,
    checked: props.checked,
    type: 'radio',
    class: {
      'radio justify-start gap-2': true,
    },
    disabled: props.disabled,
    ...props.inputProps,
  }));
</script>