<template>
  <component :is="component"
    v-bind="componentProps">
    <!-- Enables the use of named child slots in the consumer -->
    <template v-for="(_, slotName) in $slots"
      v-slot:[slotName]="slotProps">
      <slot :name="slotName"
        v-bind="slotProps ?? {}" />
    </template>
  </component>
</template>

<script setup
  lang="ts">
  import { computed, defineAsyncComponent } from 'vue';

  import { type FormItem } from '$types/components/forms';

  const props = defineProps<FormItem>();

  const baseTypes = ['text', 'email', 'number', 'date', 'datetime-local', 'time', 'month', 'week', 'url', 'tel']

  const components: Record<string, ReturnType<typeof defineAsyncComponent>> = {
    select: defineAsyncComponent(() => import('@molecules/FormItemSelect.vue')),
    textarea: defineAsyncComponent(() => import('@molecules/FormItemTextarea.vue')),
    checkbox: defineAsyncComponent(() => import('@molecules/FormItemCheckbox.vue')),
    checkboxes: defineAsyncComponent(() => import('@molecules/FormItemCheckboxes.vue')),
    radio: defineAsyncComponent(() => import('@molecules/FormItemRadio.vue')),
    radios: defineAsyncComponent(() => import('@molecules/FormItemRadios.vue')),
    toggles: defineAsyncComponent(() => import('@molecules/FormItemToggles.vue')),
    toggle: defineAsyncComponent(() => import('@molecules/FormItemToggle.vue')),
  }

  const component = computed(() => {
    if (baseTypes.includes(props.type)) {
      return defineAsyncComponent(() => import('@molecules/FormItemBase.vue'));
    } else if (props.type in components) {
      return components[props.type];
    } else {
      throw new Error(`Component type "${props.type}" not found in FormField.vue`);
    }
  });

  const componentProps = computed(() => {
    if (['fieldset', 'checkboxes', 'toggles', 'radios'].includes(props.type)) {
      const { type, ...rest } = props;
      return rest;
    } else {
      return props;
    }
  });
</script>@/components/molecules/FormItemToggles.vue
