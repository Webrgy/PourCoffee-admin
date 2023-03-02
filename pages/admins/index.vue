<script setup>
import { useAdmin } from "~/stores/Admin"
const { $axios } = useNuxtApp()

definePageMeta({
    layout: "dashboard",
    //middleware: "auth"
})
const admin = useAdmin()

const titles = reactive(['First Name', "Last Name", "Email", "Role", ""])

let admins = reactive([])

let newAdmin = reactive({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
})

const getAdmins = await $axios.get("/admins", {
    headers: {
        authorization: ` Bearer ${admin.token}`
    }
}).then(res => {
    console.log(res.data);
    admins = res.data.data
})

onMounted(() => {
    getAdmins
})
</script>
<template lang="pug">
.admins-page
    IndexModal
        FormKit(type="form" submit-label="Add Admin" :actios="false")
            FormKit(v-model="newAdmin.first_name" validation="required" label="First Name" type="text" name="first_name")
            FormKit(v-model="newAdmin.last_name" validation="required" label="Last Name" type="text" name="last_name")
            FormKit(v-model="newAdmin.email" validation="required|email" label="Email" type="email" name="email")
            FormKit(v-model="newAdmin.password" validation="required" name="password" label="Password" type="password")
    .admin-page-header.w-full.py-20.flex.justify-between
        h1.text-3xl Admins
        label(for="index-modal").btn.btn-primary New admin
    .admin-page-container.w-full.my-5.py-5
        MainTable(:headers="titles")
            tr(v-for="admin in admins" :key="admin.id")
                td {{ admin.first_name }}
                td {{ admin.last_name }}
                td {{ admin.email }}
                td
                    span.badge.badge-primary.text-center {{ admin.role }}
                td
                    NuxtLink(to="admins/_id").btn.btn-xs view
    //.test-admins {{ admins }}
</template>
<style lang="scss">
.admins-page {
    @apply w-11/12 xl:w-10/12 mx-auto;
}
</style>
