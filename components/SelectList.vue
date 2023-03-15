<template lang="pug">
select.select.w-full.max-w-xs(v-model="selectedOption" @change="onSelectOption")
    option(disabled selected) {{ props.defaultOption }}
    option(v-for="(item, index) in props.data" :key="index")
        span  {{ item }}
</template>
<script setup lang="ts">
const emit = defineEmits(["onSelectChange"])

const props  = defineProps({
    defaultOption: {
        type: String,
        require: true,
        default: "Choose an option"
    },
    data: {
        type: Array,
        require: true
    }
})

const selectedOption = ref(props.defaultOption)

const onSelectOption = () => {
    emit("onSelectChange", selectedOption.value)
}
</script>
