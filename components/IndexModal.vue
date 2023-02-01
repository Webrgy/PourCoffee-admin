<template lang="pug">
input.modal-toggle(type="checkbox" id="index-modal")
.modal.modal-bottom(class="sm:modal-middle")
    .modal-box
        slot
        .modal-action
            label.btn(for="index-modal") Close
</template>
<script lang="ts" setup>
</script>
