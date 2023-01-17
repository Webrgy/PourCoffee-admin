<template lang="pug">
.app-container.w-full.h-screen(data-theme="bumblebee")
  NuxtPage
</template>
<script setup>

  let currentAdmin = useAdmin();

  onBeforeMount(() => {
    let currentAdminSaved = JSON.parse(localStorage.getItem("PourCofeeAdminAuth") || '{}')

    if(Object.keys(currentAdmin).length !== 0) {
      currentAdmin.isLoggedIn = currentAdminSaved.isLoggedIn
      currentAdmin.token = currentAdminSaved.token
      currentAdmin.fetchCurrentAdmin()
    } else {
      currentAdmin.isLoggedIn = false
    }
  })
</script>
