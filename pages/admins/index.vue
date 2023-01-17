<script setup>
import { useAdmin } from "~/stores/Admin"

definePageMeta({
    layout: "dashboard",
    middleware: "auth"
})
const config = useRuntimeConfig()
const admin = useAdmin()

const headers = reactive(['First Name', "Last Name", "Email", "Role", ""])

const  { data }  = useAsyncData("/admins", () => {
    return $fetch(`${config.baseUrl}/api/admin/admins`, {
        method: "GET",
        headers: {
            authorization: ` Bearer ${admin.token}`
        }
    })
},
{
    transform(data) {
        return data.data
    }
}
)

</script>
<template lang="pug">
NuxtLayout
    .admins-page
        .admin-page-header.w-full.py-20.flex.justify-between
            h1.text-3xl Admins
            button.btn.btn-primary New admin
        .admin-page-container.w-full.my-5.py-5
            MainTable(:headers="headers")
                tr(v-for="admin in data" :key="admin.id")
                    td {{ admin.first_name }}
                    td {{ admin.last_name }}
                    td {{ admin.email }}
                    td {{ admin.role }}
                    td
                        button.btn.btn-xs view 
        .w-full.text-center(v-if="data.length === 0")
            span there is no admin
</template>
<style lang="scss">
.admins-page {
    @apply w-11/12 xl:w-10/12 mx-auto;
}
</style>
