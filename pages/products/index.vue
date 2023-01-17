<script lang="ts" setup>
import { useAdmin } from "~~/stores/Admin"

definePageMeta({
    layout: "dashboard",
    middleware: "auth"
})
const config = useRuntimeConfig()
const admin = useAdmin()

const headers = reactive(["Product", 'Name', "Price", "in stock availability", ""])
let products = reactive([])

const getAllProducts = async () => {
    await useFetch(`${config.baseUrl}/api/admin/products`, {
        method: "GET",
        headers: {
            authorization: ` Bearer ${admin.token}`
        },
        onResponse({ response }) {
            products = response._data.data
            console.log(products);
            
            if(response.status === 404) {
                // 404 catch
                console.log("404");
            }
        },
    })
}

getAllProducts()

</script>
<template lang="pug">
NuxtLayout
    .products-page
        .products-page-header.w-full.py-20.flex.justify-between
            h1.text-3xl Products
            button.btn.btn-primary New product
        .products-page-container.w-full.my-5.py-5
            MainTable(:headers="headers")
                tr(v-for="product in products" :key="product.id")
                    td
                        .flex.items-center.space-x-3
                            .avatar
                                .mask.mask-qsuircle.w-12.h-12
                                    img(src="/tailwind-css-component-profile-256w.png")
                    //td {{ admin.first_name }}
                    //td {{ admin.last_name }}
                    //td {{ admin.email }}
                    //td {{ admin.role }}
                    td
                        button.btn.btn-xs view 
        .w-full.text-center(v-if="products.length === 0")
            span there is no product
</template>
<style lang="scss">
.products-page {
    @apply w-11/12 xl:w-10/12 mx-auto;
}
</style>
