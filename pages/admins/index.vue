<script setup lang="ts">
import { useAdmin } from "~/stores/Admin"

definePageMeta({
    layout: "dashboard"
})

const { $axios } = useNuxtApp()

const admin = useAdmin()

const titles: string[] = reactive(['First Name', "Last Name", "Email", "Role", ""])

const adminRoles: AdminRole[] = reactive(["director", "moderator"])

let admins: Admin[] = reactive([])

const selectedRole = ref<AdminRole>("")

const newAdmin: Admin = reactive({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
})

let meta: MetaPages = reactive({
    current_page: 0,
    last_page: 0,
    next_page: 0,
    total_count: 0
})

const handleSubmit = async (): Promise<void> => {
    const { data } = await $axios.post("/admins", {
        admin: newAdmin
    })
    if(data.success) {
        getAdmins(fullName.value, selectedRole.value)
    }
    newAdmin.first_name = ""
    newAdmin.last_name = ""
    newAdmin.email = ""
    newAdmin.password = ""
}

const loader = ref<boolean>(false)

const fullName = ref<string>("")

const getRole = (value: AdminRole): void => {
    selectedRole.value = value
    console.log(value);
    getAdmins(fullName.value, selectedRole.value)
}

const isDataEmpty = ref<boolean>(false)

const getAdmins = async (fullName: string, role: AdminRole, page = 0, perPage = 0): Promise<void> => {
    
    loader.value = true

    let queryOptions: AdminParams = { }

    if(fullName) {
        queryOptions.full_name = fullName
    }
    if(page) {
        queryOptions.page = page
    }
    if(perPage) {
        queryOptions.per_page = perPage
    }
    if(role) {
        queryOptions.role = role
    }
    const { data } = await $axios.get(`/admins`, {params: queryOptions})
    admins = data.data
    meta = data.meta
    if(admins.length === 0) {
        isDataEmpty.value = true
    } else {
        isDataEmpty.value = false
    }
    loader.value = false
}

const clearFilters = (): void => {
    fullName.value = ""
    selectedRole.value = ""
    getAdmins(fullName.value, selectedRole.value)
}
const selectedAdmin = ref<string>("")

const getSelectedAdmin = (id: string) => {
    selectedAdmin.value = id
}

const deleteAdmin = async (e: boolean) => {
    if(e) {
        const { data } = await $axios.delete(`/admins/${selectedAdmin.value}`)
        if (data.success) {
            selectedAdmin.value = ""
            getAdmins(fullName.value, selectedRole.value)
        }
    }
}

const previousPage = (data: number) => {
    getAdmins(fullName.value, selectedRole.value, data)
}

const nextPage = (data: number) => {
    getAdmins(fullName.value, selectedRole.value, data)
}

onMounted(() => {
    getAdmins(fullName.value, selectedRole.value)
})
</script>
<template lang="pug">
.admins-page
    ConfirmationModal(@confirm="deleteAdmin")
        p are you sure you want to delete this admin?
            br
            | this process cannot be undo
    IndexModal
        FormKit(type="form" submit-label="Add Admin" :actios="false" @submit="handleSubmit")
            FormKit(v-model="newAdmin.first_name" validation="required" label="First Name" type="text" name="first_name" validation-visibility="submit")
            FormKit(v-model="newAdmin.last_name" validation="required" label="Last Name" type="text" name="last_name" validation-visibility="submit")
            FormKit(v-model="newAdmin.email" validation="required|email" label="Email" type="email" name="email" validation-visibility="submit")
            FormKit(v-model="newAdmin.password" validation="required" name="password" label="Password" type="password" validation-visibility="submit")
    .admin-page-header.w-full.py-5.mt-8.flex.justify-between
        h1.text-3xl Admins
        label(for="index-modal").btn.btn-primary New admin
    .admin-page-container.w-full.my-2.py-5
        .filter-box(class="w-full h-20")
            input(v-model="fullName" type="text", name="" class="input w-96 input-bordered rounded-md" placeholder="search" @input="getAdmins(fullName, selectedRole)")
            SelectList(default-option="role" :data="adminRoles" @onSelectChange="getRole")
            button.btn.btn-secondary(@click="clearFilters") clear filters
        .loader.w-full.mx-auto.text-center(v-if="loader")
            LoadingIndicator
        .message.w-full.text-center.text-xl(v-else-if="isDataEmpty")
            span No admin found!
        MainTable(v-else :headers="titles" class="table-zebra")
            tr(v-for="admin in admins" :key="admin.id")
                td {{ admin.first_name }}
                td {{ admin.last_name }}
                td {{ admin.email }}
                td
                    span.badge.text-center(:class="admin.role === 'director' ? 'badge-primary' : 'badge-secondary'") {{ admin.role }}
                td(@click="getSelectedAdmin(admin.id)")
                    //NuxtLink(:to="`admins/${admin.id}`").btn.btn-xs.mx-1 view
                    label(for="confirmation-modal").btn.btn-error.btn-xs.btn-outline.mx-1 delete
        .table-footer.w-full.py-2.text-center(v-if="!loader && !isDataEmpty")
            Pagination(:metaPages="meta" @prev="previousPage" @next="nextPage")
</template>
<style lang="scss">
</style>
