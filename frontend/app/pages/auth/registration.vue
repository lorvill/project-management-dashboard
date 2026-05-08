<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  name: 'registration',
  middleware: 'guest',
})
</script>

<template>
  <div>
    <AuthenticationRegistration />
  </div>
</template>
