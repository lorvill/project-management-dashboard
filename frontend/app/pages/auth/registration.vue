<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  name: 'registration',
  middleware: 'guest',
})
</script>

<template>
  <AuthenticationRegistration />
</template>
