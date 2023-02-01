<script setup>
import { useAdmin } from "~/stores/Admin"

definePageMeta({
    layout: "dashboard",
})
const config = useRuntimeConfig()
const admin = useAdmin()

const product = reactive({
    name: "",
    description: "",
    unit_price: 0,
    image: "",
    category: ""
})

const options = [
    { label: "Hot Coffee", value: "hc"},
    { label: "Iced Coffee", value: "ic"},
]

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
        IndexModal
            FormKit(type="form" submit-label="Add category")
                FormKit(v-model="product.name" validation="required" label="Name" type="text" name="product-name")
                FormKit(v-model="product.description" validation="required" label="description" type="text" name="product-description")
                FormKit(v-model="product.price" label="Price" type="number" name="price")
                FormKit(v-model="product.image" label="Image" validation="required" type="file" accept=".jpg,.png" name="image")
                //FormKit(v-model="product.category" type="autocomplete" label="Category" name="category" :options="options")
        .products-page-header.w-full.py-20.flex.justify-between
            h1.text-3xl Products
            label(for="index-modal").btn.btn-primary New product
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
