<template>
  <fieldset v-bind="fieldsetProps">
    <legend class="label">
      <span class="label-text">
        <slot :name="`${name}-legend`">
          {{ label }}
        </slot>
      </span>
    </legend>
    <slot></slot>
  </fieldset>
</template>

<script setup
  lang="ts">
  import { computed } from 'vue';
  import { type FormFieldsetProps } from '$types/components/forms';

  const props = defineProps<FormFieldsetProps>();

  const fieldsetProps = computed(() => {
    const { disabled, name, wrapperProps } = props;
    const fieldsetProps = {
      disabled,
      name,
      wrapperProps,
    };

    return fieldsetProps;
  });
</script>