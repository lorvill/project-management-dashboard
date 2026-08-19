<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  name: 'reset-password',
  middleware: 'guest',
})
</script>

<template>
  <AuthenticationResetPassword />
</template>
