<template lang="pug">
h1 current user is : {{ router.params.id }}
</template>
<script setup>
definePageMeta({
    layout: "dashboard"
})
const { $axios } = useNuxtApp()
const router = useRoute()
</script>
