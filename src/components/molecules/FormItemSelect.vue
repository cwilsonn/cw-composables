<template>
  <FormItemBase v-bind="formItemBaseProps">
    <template #[`${name}-input`]>
      <select v-model="value"
        v-bind="selectProps">
        <option value="null">
          <slot :name="`${name}-default-option`">
            Select an option
          </slot>
        </option>
        <template v-for="(option, i) in options"
          :key="`option-${i}`">
          <option v-if="typeof option === 'string' || typeof option === 'number'"
            :value="option">
            <slot :name="`${name}-option`">
              {{ option }}
            </slot>
          </option>
          <optgroup v-else-if="typeof option === 'object' && 'options' in option"
            :label="option.label"
            :disabled="option.disabled"
            :id="option.id">
            <template v-for="(subOption, j) in option.options"
              :key="`sub-option-${j }`">
              <option v-if="typeof subOption === 'string' || typeof subOption === 'number'"
                :value="subOption"
                :disabled="option.disabled"
                :id="option.id">
                <slot :name="`${name}-sub-option`">
                  {{ subOption }}
                </slot>
              </option>
              <option v-else-if="typeof option === 'object' && 'value' in option"
                :value="option.value"
                :disabled="option.disabled">
                <slot :name="`${name}-option`"
                  :option="option">
                  {{ option.label }}
                </slot>
              </option>
            </template>
          </optgroup>
          <option v-else-if="typeof option === 'object' && 'value' in option"
            :value="option.value"
            :disabled="option.disabled"
            :id="option.id">
            <slot :name="`${name}-option`"
              :option="option">
              {{ option.label }}
            </slot>
          </option>
        </template>
      </select>
    </template>
    <!-- Enables the use of named child slots in the consumer -->
    <template v-for="(_, slotName) in $slots"
      v-slot:[slotName]="slotProps">
      <slot :name="slotName"
        v-bind="slotProps ?? {}" />
    </template>
  </FormItemBase>
</template>

<script setup
  lang="ts">
  import { computed } from 'vue';

  import type { FormItemBaseProps, FormItemSelectProps } from '@/types/components/forms';
  import FormItemBase from '@molecules/FormItemBase.vue';

  const props = defineProps<FormItemSelectProps>();

  const value = defineModel<FormItemBaseProps['value']>();

  const formItemBaseProps = computed(() => {
    const { label, name, ...rest } = props;
    const formItemBaseProps: FormItemBaseProps = {
      label,
      name,
      ...rest,
    };

    return formItemBaseProps;
  });

  const selectProps = computed(() => ({
    id: props.name,
    name: props.name,
    multiple: props.multiple,
    class: {
      'select select-bordered': true,
      'select-error': props.errors && props.errors.length > 0,
      'select-xs': props.size === 'xs',
      'select-sm': props.size === 'sm',
      'select-md': props.size === 'md',
      'select-lg': props.size === 'lg',
    },
    disabled: props.disabled,
    readonly: props.readonly,
    ...props.inputProps,
  }));
</script>