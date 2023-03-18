<template lang="pug">
input.modal-toggle(type="checkbox" id="confirmation-modal")
.modal.modal-bottom(class="sm:modal-middle")
    .modal-box
        slot
        .modal-action
            label.btn.btn-error(for="confirmation-modal" @click="onConfirmationDone") Delete
            label.btn(for="confirmation-modal") Close
</template>
<script lang="ts" setup>
const isConfirmed = ref(false)

const onConfirmationDone = () => {
    isConfirmed.value = true
    emit("confirm", isConfirmed.value)
}

const emit = defineEmits(['confirm'])

</script>
    