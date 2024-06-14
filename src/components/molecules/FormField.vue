<template>
  <component :is="component"
    v-bind="$props">
    <!-- Enables the use of named child slots in the parent component -->
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
</script>
