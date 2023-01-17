<script setup>
    useHead({
        title: "PourCoffee-Admin Login"
    })
    const currentAdmin = useAdmin()
    const config = useRuntimeConfig()
    const router = useRouter

    const admin = reactive({
        email: "",
        password: ""
    })

    let hasLogged = false
    const errorMessage = ref("")

    const login = async () => await useFetch(`${config.baseUrl}/api/admin/login`, {
        method: "POST",
        body: {
            admin: admin
        },
        onResponse({ response }) {
            if (response._data.success) {
                console.log("login success");
                currentAdmin.isLoggedIn = true
                currentAdmin.token = response._data.token
                currentAdmin.fetchCurrentAdmin()
                /*if(Object.keys(currentAdmin.admin).length !== 0) {
                    console.log("is heeree");
                    router().push("/")
                } */
            }

            else {
                hasLogged = response._data.success
                errorMessage.value = response._data.errors.base[0]
            }
        }
    })
</script>
<template lang="pug">
.login-page-container.px-2
    .w-full.max-w-xl(v-if="errorMessage !==''")
        MainAlert(:message="errorMessage")
    .form-control.max-w-xl.mx-auto.w-full.rounded-box.shadow-xl.p-10.my-5
        //h1.text-center
            HeaderLogo 
            br
            |Login To Your Account
        FormKit(type="form" submit-label="log in" @submit="login")
            FormKit(v-model="admin.email" validation="required|email" label="Email" type="email" name="email")
            FormKit(v-model="admin.password" validation="required" name="password" label="Password" type="password")
</template>
<style lang="scss">
.login-page-container {
  @apply w-full h-full mx-auto flex flex-col justify-center items-center;
}
</style>
