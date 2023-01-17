<script lang="ts" setup>
import { useAdmin } from "~~/stores/Admin"

definePageMeta({
    layout: "dashboard",
    middleware: "auth"
})
const config = useRuntimeConfig()
const admin = useAdmin()

const headers = reactive(['Name', "description", "", ""])
let categories = reactive([])

const getAllCategories = async () => {
    await useFetch(`${config.baseUrl}/api/admin/products/categories`, {
        method: "GET",
        headers: {
            authorization: ` Bearer ${admin.token}`
        },
        onResponse({ response }) {
            categories = response._data.data
            console.log(categories);
            
            if(response.status === 404) {
                // 404 catch
                console.log("404");
            }
        },
    })
}

getAllCategories()

</script>
<template lang="pug">
NuxtLayout
    .categories-page
        .categories-page-header.w-full.py-20.flex.justify-between
            h1.text-3xl Products
            button.btn.btn-primary New category
        .categories-page-container.w-full.my-5.py-5
            MainTable(:headers="headers")
                tr(v-for="category in categories" :key="category.id")
                    //td {{ category.first_name }}
                    //td {{ category.last_name }}
                    //td {{ category.email }}
                    td
                        button.btn.btn-xs.btn-info update
                    td
                        button.btn.btn-xs.btn-error delete
        .w-full.text-center(v-if="categories.length === 0")
            span there is no category
</template>
<style lang="scss">
.categories-page {
    @apply w-11/12 xl:w-10/12 mx-auto;
}
</style>
