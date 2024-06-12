<template>
  <ul class="list-none list">
    <li v-for="(error, i) in errors"
      :key="i"
      class="text-error">
      {{ error }}
    </li>
  </ul>
</template>

<script lang="ts">
  export type FormErrorsProps = {
    errors: string[];
  };
</script>

<script setup
  lang="ts">

  defineProps<FormErrorsProps>();
</script>
