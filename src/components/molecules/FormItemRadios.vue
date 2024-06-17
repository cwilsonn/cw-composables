<template>
  <FormFieldset v-bind="fieldsetProps">
    <FormItemRadio v-for="(option, i) in options"
      :key="i"
      :checked="selectedValue === option.value"
      @update:modelValue="updateSelectedValue(option.value)"
      v-bind="radioProps(option)">
      <!-- Enables the use of named child slots in the consumer -->
      <template v-for="(_, slotName) in $slots"
        v-slot:[slotName]="slotProps">
        <slot :name="slotName"
          v-bind="slotProps ?? {}" />
      </template>
    </FormItemRadio>
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
  import { type FormItemRadioProps, type FormItemRadiosProps, type FormFieldsetProps } from '$types/components/forms';
  import FormFieldset from '@molecules/FormFieldset.vue';
  import FormItemRadio from '@molecules/FormItemRadio.vue';

  const props = defineProps<FormItemRadiosProps>();
  const emit = defineEmits(['update:modelValue']);

  const value = ref<string | null>(null);

  const selectedValue = computed(() => value.value);

  function updateSelectedValue(newValue: string) {
    value.value = newValue;
    emit('update:modelValue', newValue);
  }

  const fieldsetProps = computed(() => {
    const { label, disabled, name, wrapperProps } = props;
    const fieldsetProps = {
      label,
      disabled,
      name,
      wrapperProps,
    } as FormFieldsetProps;

    return fieldsetProps;
  });

  const radioProps = (option: FormItemRadioProps) => {
    const { disabled, label, value, wrapperProps, inputProps } = option;
    const radioProps = {
      name: props.name,
      value,
      disabled,
      label,
      wrapperProps,
      inputProps: props.inputProps || inputProps,
    } as FormItemRadioProps;

    return radioProps;
  };
</script>
