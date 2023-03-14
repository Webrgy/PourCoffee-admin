<script setup>
import { useAdmin } from "~/stores/Admin"
const { $axios } = useNuxtApp()

definePageMeta({
    layout: "dashboard"
})
const admin = useAdmin()

const titles = reactive(['First Name', "Last Name", "Email", "Role", ""])

const admins = ref([])

const newAdmin = reactive({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
})

const meta = reactive({})

const handleSubmit = async (fields) => {
    const { data } = await $axios.post("/admins", {
        admin: newAdmin
    })
    if(data.success) {
        getAdmins()
    }
    newAdmin.first_name = ""
    newAdmin.last_name = ""
    newAdmin.email = ""
    newAdmin.password = ""
}

const loader = ref(false)

const filterQurrey = ref("")

const getAdmins = async (filterQurrey, page = 0, perPage = 0) => {
    
    loader.value = true
    let queryOprions = ""

    if(filterQurrey) {
        queryOprions += `&full_name=${filterQurrey}`
    }
    if(page) {
        queryOprions += `&page=${page}`
    }
    if(perPage) {
        queryOprions += `&per_page=${perPage}`
    }
    const { data } = await $axios.get(`/admins?${queryOprions}`, {
        headers: { authorization: ` Bearer ${admin.token}` }
    })
    admins.value = data.data
    meta.value = data.meta
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

const previewPage = (data) => {
    getAdmins(filterQurrey.value, data)
}

const nextPage = (data) => {
    getAdmins(filterQurrey.value, data)
}

onMounted(() => {
    getAdmins()
})
</script>
<template lang="pug">
.admins-page
    ConfirmationModal(@confirm="deleteAdmin")
        p are you sure you want to delete this admin? this process cannot be undo
    IndexModal
        FormKit(type="form" submit-label="Add Admin" :actios="false" @submit="handleSubmit")
            FormKit(v-model="newAdmin.first_name" validation="required" label="First Name" type="text" name="first_name" validation-visibility="submit")
            FormKit(v-model="newAdmin.last_name" validation="required" label="Last Name" type="text" name="last_name" validation-visibility="submit")
            FormKit(v-model="newAdmin.email" validation="required|email" label="Email" type="email" name="email" validation-visibility="submit")
            FormKit(v-model="newAdmin.password" validation="required" name="password" label="Password" type="password" validation-visibility="submit")
    .admin-page-header.w-full.py-20.flex.justify-between
        h1.text-3xl Admins
        label(for="index-modal").btn.btn-primary New admin
    .admin-page-container.w-full.my-5.py-5.text-center
        .search-box(class="w-full h-20")
                .input-group
                    input(v-model="filterQurrey" type="text", name="" class="input input-bordered rounded-md" placeholder="search" @input="getAdmins(filterQurrey)")
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
            .table-footer
                Pagination(:metaPages="meta.value" @prev="previewPage" @next="nextPage")
</template>
<style lang="scss">
.admins-page {
    @apply w-11/12 xl:w-10/12 mx-auto;
}
</style>
