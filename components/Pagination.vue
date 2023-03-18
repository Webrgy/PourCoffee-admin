<template lang="pug">
.btn-group 
    button.btn(@click="$emit('prev', metaPages.current_page - 1)") &lt; &lt;
    button.btn.btn-active Page {{ metaPages.current_page }}
    button.btn(@click="$emit('prev', metaPages?.next_page)") &gt; &gt;
</template>
<script lang="ts" setup>

defineEmits<{
    (e: "prev", data: number): void,
    (e: "next", data: number): void
}>()


defineProps<{
    metaPages: {
        type: MetaPages,
        require: true
    }
}>()

</script>

<style lang="scss">

</style>
