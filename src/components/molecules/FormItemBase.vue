<template>
  <div class="form-control">
    <label v-bind="labelProps">
      <div class="label-text">
        <slot name="label"
          v-bind="{ label, ...labelProps }">
          {{ label }}
        </slot>
        <span v-if="required"
          class="align-top text-error">*</span>
      </div>
    </label>
    <slot name="input"
      v-bind="{ inputProps }">
      <input v-bind="inputProps"
        v-model="value">
    </slot>
    <FormErrors v-if="errors && errors.length > 0"
      :errors="errors" />
  </div>
</template>

<script lang="ts">
export const formItemTypes = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  DATE: 'date',
  DATETIME: 'datetime',
  DATETIME_LOCAL: 'datetime-local',
  TIME: 'time',
  WEEK: 'week',
  MONTH: 'month',
} as const;

export const formItemSizes = ['xs', 'sm', 'md', 'lg'] as const;

export type FormItemSize = typeof formItemSizes[number];
export type FormItemType = typeof formItemTypes[keyof typeof formItemTypes];

export type FormItemBaseProps = {
  name: string;
  label: string;
  type?: FormItemType,
  hideLabel?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  size?: FormItemSize;
  errors?: FormErrorsProps['errors'];
};
</script>

<script setup
  lang="ts">
  import { computed } from 'vue';

  import FormErrors, { type FormErrorsProps } from '@molecules/FormErrors.vue';

  const props = withDefaults(defineProps<FormItemBaseProps>(), {
    type: 'text',
    size: 'md',
  });

  const value = defineModel();

  const labelProps = computed(() => ({
    for: props.name,
    class: ['label', props.hideLabel ? 'sr-only' : ''],
  }));

  const inputProps = computed(() => ({
    id: props.name,
    name: props.name,
    type: props.type,
    class: {
      'input input-bordered w-full': true,
      'input-error': props.errors && props.errors.length > 0,
      'input-xs': props.size === 'xs',
      'input-sm': props.size === 'sm',
      'input-md': props.size === 'md',
      'input-lg': props.size === 'lg',
    },
    disabled: props.disabled,
    readonly: props.readonly,
    placeholder: props.placeholder,
  }));
</script>