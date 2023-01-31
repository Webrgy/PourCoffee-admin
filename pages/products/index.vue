<script setup>
import { useAdmin } from "~/stores/Admin"

definePageMeta({
    layout: "dashboard",
})
const config = useRuntimeConfig()
const admin = useAdmin()

const titles = reactive(["Product", 'Name', "Price", "in stock availability", ""])

const { data } = useAsyncData("/products",() => {
    return $fetch(`${config.baseUrl}/api/admin/products`, {
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
    .products-page
        .products-page-header.w-full.py-20.flex.justify-between
            h1.text-3xl Products
            button.btn.btn-primary New product
        .products-page-container.w-full.my-5.py-5
            MainTable(:headers="titles")
                //tr(v-for="product in data" :key="product.id")
                    td
                        .flex.items-center.space-x-3
                            .avatar
                                .mask.mask-qsuircle.w-12.h-12
                                    img(src="/tailwind-css-component-profile-256w.png")
                    td {{ admin.first_name }}
                    td {{ admin.last_name }}
                    td {{ admin.email }}
                    td {{ admin.role }}
                    td
                        button.btn.btn-xs view 
        //.w-full.text-center(v-if="isEmpty")
            span there is no product
</template>
<style lang="scss">
.products-page {
    @apply w-11/12 xl:w-10/12 mx-auto;
}
</style>
