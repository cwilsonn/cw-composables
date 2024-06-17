<template>
  <div class="form-control"
    v-bind="wrapperProps">
    <label v-bind="labelProps">
      <div class="label-text">
        <slot :name="`${name}-label`"
          v-bind="{ label, ...labelProps }">
          {{ label }}
        </slot>
        <span v-if="required"
          class="align-top text-error">*</span>
      </div>
    </label>
    <slot :name="`${name}-input--before`"
      v-bind="$props" />
    <slot :name="`${name}-input`"
      v-bind="{ inputProps }">
      <input v-model="value"
        v-bind="inputProps">
    </slot>
    <slot :name="`${name}-input--after`"
      v-bind="$props"></slot>
    <FormErrors v-if="errors && errors.length > 0"
      :errors="errors" />
  </div>
</template>

<script setup
  lang="ts">
  import { computed } from 'vue';

  import FormErrors from '@molecules/FormErrors.vue';
  import type { FormItemBaseProps } from '$types/components/forms';

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
    ...props.inputProps,
  }));
</script>