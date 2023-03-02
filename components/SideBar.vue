<script lang="ts" setup>

    const currentAdmin = useAdmin()
    const config = useRuntimeConfig()

    const logout = async () => {
        console.log("logged out");
        
        await useFetch(`${config.baseUrl}/api/admin/logout`, {
            method: "DELETE",
            headers: {
                autorization: `Bearer ${currentAdmin.token}`
            }
        })
        localStorage.removeItem("PourCofeeAdminAuth")
        currentAdmin.logout()
    }
</script>
<template lang="pug">
.drawer-side.rounded-r-3xl.bg-accent.shadow-xl
    label(for="side-bar" class="drawer-overlay")
    ul.menu.pl-4.py-5.w-72.text-base-content.shadow-xl.flex.flex-col.justify-cneter
        h1.logo
            //.text-center.text-4xl
                HeaderLogo
        .side-bar-items.items(class="flex-grow-0 mt-10 text-base-100")
            li
                NuxtLink(to="/")
                    |Dashboard
            //li
                NuxtLink(to="/products")
                    //IconProducts
                    |Products
            //li
                NuxtLink(to="/categories")
                    //IconMenu
                    |Categories
            li
                NuxtLink(to="/admins")
                    //IconOrder
                    |Admins
        .side-bar-acctions.text-base-100
            //(v-if="currentUser.isLoggedIn")
            li(@click="logout")
                NuxtLink
                    //IconLogout
                    |Logout
</template>
