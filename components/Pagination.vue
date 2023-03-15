<template lang="pug">
.btn-group 
    button.btn(@click="prevPage") &lt; &lt;
    button.btn.btn-active Page {{ metaPages.current_page }}
    button.btn(@click="nextPage") &gt; &gt;
</template>
<script lang="ts" setup>
const emit = defineEmits(["prev","next"])
const props = defineProps({
    metaPages: { type: Object, require: true, default: {
        current_page: 1,
        next_page: 2,
        last_page: 2,
        total_count: 14
    } }
})

const prevPage = () => {
    emit("prev", props.metaPages?.current_page - 1)
}

const nextPage = () => {
    emit("next", props.metaPages?.next_page)
}

</script>

<style lang="scss">

</style>
