<template>
  <ul class="list-none list">
    <li v-for="(error, i) in errors"
      :key="i"
      class="text-error">
      {{ error }}
    </li>
  </ul>
</template>

<script setup
  lang="ts">
  import type { FormErrorsProps } from '$types/components/forms';

  defineProps<FormErrorsProps>();
</script>
