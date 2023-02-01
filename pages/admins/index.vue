<script setup>
import { useAdmin } from "~/stores/Admin"

definePageMeta({
    layout: "dashboard",
    //middleware: "auth"
})
const config = useRuntimeConfig()
const admin = useAdmin()

const titles = reactive(['First Name', "Last Name", "Email", "Role", ""])

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
})

</script>
<template lang="pug">
NuxtLayout
    .admins-page
        IndexModal
            FormKit(type="form" submit-label="Add Admin")
                FormKit(v-model="admin.first_name" validation="required" label="First Name" type="text" name="first_name")
                FormKit(v-model="admin.last_name" validation="required" label="Last Name" type="text" name="last_name")
                FormKit(v-model="admin.email" validation="required|email" label="Email" type="email" name="email")
                FormKit(v-model="admin.password" validation="required" name="password" label="Password" type="password")
        .admin-page-header.w-full.py-20.flex.justify-between
            h1.text-3xl Admins
            label(for="index-modal").btn.btn-primary New admin
        .admin-page-container.w-full.my-5.py-5
            MainTable(:headers="titles")
                tr(v-for="admin in data" :key="admin.id")
                    td {{ admin.first_name }}
                    td {{ admin.last_name }}
                    td {{ admin.email }}
                    td {{ admin.role }}
                    td
                        button.btn.btn-xs view 
        //.w-full.text-center(v-if="isEmpty")
            span there is no admin
</template>
<style lang="scss">
.admins-page {
    @apply w-11/12 xl:w-10/12 mx-auto;
}
</style>
