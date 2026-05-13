<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  name: 'login',
  middleware: 'guest',
})
</script>

<template>
  <AuthenticationLogin />
</template>
