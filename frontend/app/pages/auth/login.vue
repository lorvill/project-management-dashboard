<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  name: 'login',
  middleware: 'guest',
})
</script>

<template>
  <div>
    <AuthenticationLogin/>
  </div>
</template>