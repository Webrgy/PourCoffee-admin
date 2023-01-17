<template lang="pug">
.alert.rounded-box.alert-warning.w-full.text-error.bg-base-100.shadow
    .alert-content.text-lg
        //IconWarning
        span {{ message }}
</template>
<script lang="ts" setup>
const props = defineProps({
    message: { type: String, required: true}
})
</script>
