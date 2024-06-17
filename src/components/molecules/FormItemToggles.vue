<template>
  <FormFieldset v-bind="fieldsetProps">
    <FormItemToggle v-for="(option, i) in options"
      :key="i"
      :model-value="value[option.value]"
      @update:modelValue="updateValue(option.value, ($event as boolean))"
      v-bind="checkboxProps(option)">
      <!-- Enables the use of named child slots in the consumer -->
      <template v-for="(_, slotName) in $slots"
        v-slot:[slotName]="slotProps">
        <slot :name="slotName"
          v-bind="slotProps ?? {}" />
      </template>
    </FormItemToggle>
    <!-- Enables the use of named child slots in the consumer -->
    <template v-for="(_, slotName) in $slots"
      v-slot:[slotName]="slotProps">
      <slot :name="slotName"
        v-bind="slotProps ?? {}" />
    </template>
  </FormFieldset>
</template>

<script setup
  lang="ts">
  import { computed, ref } from 'vue';
  import { type FormItemCheckboxProps, type FormItemCheckboxesProps, type FormFieldsetProps } from '$types/components/forms';
  import FormFieldset from '@molecules/FormFieldset.vue';
  import FormItemToggle from '@molecules/FormItemToggle.vue';

  const props = defineProps<FormItemCheckboxesProps>();
  const emit = defineEmits(['update:modelValue']);

  const value = ref<Record<string, boolean>>({});

  function updateValue(optionValue: string | number, eventValue: boolean) {
    value.value = {
      ...value.value,
      [optionValue]: eventValue,
    };

    emit('update:modelValue', value.value);
  }

  const fieldsetProps = computed(() => {
    const { label, disabled, name, wrapperProps } = props;
    const fieldsetProps = {
      label,
      disabled,
      name,
      ...wrapperProps,
    } as FormFieldsetProps;

    return fieldsetProps;
  });

  const checkboxProps = (option: FormItemCheckboxProps) => {
    const { label, value, disabled, wrapperProps, inputProps } = option;
    const checkboxProps = {
      name: value,
      value,
      disabled,
      label,
      wrapperProps,
      inputProps: props.inputProps || inputProps,
    } as FormItemCheckboxProps;

    return checkboxProps;
  };
</script>
