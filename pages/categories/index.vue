<script setup>
import { useAdmin } from "~/stores/Admin"

definePageMeta({
    layout: "dashboard",
    //middleware: "auth"
})
const config = useRuntimeConfig()
const admin = useAdmin()

const category = reactive({})

const titles = reactive(['Name', "description", "", ""])

const { data } = useAsyncData("/categories",() => {
    return $fetch(`${config.baseUrl}/api/admin/products/categories`, {
        headers: {
            authorization: ` Bearer ${admin.token}`
        }
    })
},
{
    transform(data) {
        return data.data
    }
})

</script>
<template lang="pug">
NuxtLayout
    .categories-page
        IndexModal
            FormKit(type="form" submit-label="Add category")
                FormKit(v-model="category.name" validation="required" label="Name" type="text" name="name")
                FormKit(v-model="category.description" validation="required" label="description" type="text" name="description")
                FormKit(v-model="admin.icon" label="Icon" type="text" name="icon")
        .categories-page-header.w-full.py-20.flex.justify-between
            h1.text-3xl Categories
            label(for="index-modal").btn.btn-primary New category
        .categories-page-container.w-full.my-5.py-5
            MainTable(:headers="titles")
                //tr(v-for="category in data" :key="category.id")
                    td {{ category.first_name }}
                    td {{ category.last_name }}
                    td {{ category.email }}
                    td
                        button.btn.btn-xs.btn-info update
                    td
                        button.btn.btn-xs.btn-error delete
            //.w-full.text-center(v-if="isEmpty")
                span there is no category
</template>
<style lang="scss">

</style>
