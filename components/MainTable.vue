<template lang="pug">
.overflow-x-auto 
    table.table.w-full 
        thead
            tr
             th(v-for="(header, index) in headers") {{ header }}
        tbody
            slot
</template>
<script lang="ts" setup>
const props = defineProps({
    headers: {type: Array, required: true}
})
</script>
