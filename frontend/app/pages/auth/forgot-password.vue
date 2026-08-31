<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  name: 'forgot-password',
  middleware: 'guest',
})
</script>

<template>
  <AuthenticationForgotPassword />
</template>
