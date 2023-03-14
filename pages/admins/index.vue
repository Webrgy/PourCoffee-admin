<script setup>
import { useAdmin } from "~/stores/Admin"
const { $axios } = useNuxtApp()

definePageMeta({
    layout: "dashboard"
})
const admin = useAdmin()

const titles = reactive(['First Name', "Last Name", "Email", "Role", ""])

const admins = ref([])

let newAdmin = reactive({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
})

const loader = ref(false)
const getAdmins = async () => {
    loader.value = true
    const { data } = await $axios.get("/admins", {
    headers: {
        authorization: ` Bearer ${admin.token}`
    }
    })
    admins.value = data.data
    loader.value = false
}

const filterQurrey = ref("")

const filterAdmins = async () => {
    loader.value = true
    const { data } =  await $axios.get(`/admins?full_name=${filterQurrey.value}`)
    admins.value = data.data
    loader.value = false
}

const selectedAdmin = ref("")

const getSelectedAdmin = (id) => {
    selectedAdmin.value = id
}

const deleteAdmin = async (e) => {
    if(e.success) {
        const { data } = await $axios.delete(`/admins/${selectedAdmin.value}`)
        if (data.success) {
            selectedAdmin.value = ""
            getAdmins()
        }
    }
}

onMounted(() => {
    getAdmins()
})
</script>
<template lang="pug">
.admins-page
    ConfirmationModal(@confirm="deleteAdmin")
        p are you sure you want to delete this admin? this process canot be undo
    IndexModal
        FormKit(type="form" submit-label="Add Admin" :actios="false")
            FormKit(v-model="newAdmin.first_name" validation="required" label="First Name" type="text" name="first_name")
            FormKit(v-model="newAdmin.last_name" validation="required" label="Last Name" type="text" name="last_name")
            FormKit(v-model="newAdmin.email" validation="required|email" label="Email" type="email" name="email")
            FormKit(v-model="newAdmin.password" validation="required" name="password" label="Password" type="password")
    .admin-page-header.w-full.py-20.flex.justify-between
        h1.text-3xl Admins
        label(for="index-modal").btn.btn-primary New admin
    .admin-page-container.w-full.my-5.py-5.text-center
        .search-box(class="w-full h-20")
                .input-group
                    input(v-model="filterQurrey" type="text", name="" class="input input-bordered rounded-md" placeholder="search" @input="filterAdmins")
                    button.btn.btn-ghost.btn-active search
        .loader.w-full.mx-auto.text-center(v-if="loader")
            LoadingIndicator
        MainTable(v-else :headers="titles")
            tr(v-for="admin in admins" :key="admin.id")
                td {{ admin.first_name }}
                td {{ admin.last_name }}
                td {{ admin.email }}
                td
                    span.badge.badge-primary.text-center {{ admin.role }}
                td(@click="getSelectedAdmin(admin.id)")
                    NuxtLink(:to="`admins/${admin.id}`").btn.btn-xs.mx-1 view
                    label(for="confirmation-modal").btn.btn-error.btn-xs.mx-1 delete
</template>
<style lang="scss">
.admins-page {
    @apply w-11/12 xl:w-10/12 mx-auto;
}
</style>
