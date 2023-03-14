<template lang="pug">
.app-container.w-full.h-screen(data-theme="bumblebee")
  NuxtLayout
    NuxtPage
</template>
<script setup>
  definePageMeta({
    middleware: "auth"
  })
  let currentAdmin = useAdmin();
</script>
