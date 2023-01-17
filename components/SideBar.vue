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
.drawer-side
    label(for="side-bar" class="drawer-overlay")
    ul.menu.pl-4.py-5.w-72.bg-white.text-base-content.shadow-xl.flex.flex-col.justify-cneter
        h1.logo
            //.text-center.text-4xl
                HeaderLogo
        .side-bar-items.items(class="flex-grow-0 mt-10")
            li
                NuxtLink(to="/")
                    //IconProducts
                    |Products
            li
                NuxtLink(to="/categories")
                    //IconMenu
                    |Categories
            li
                NuxtLink(to="/admins")
                    //IconOrder
                    |admins
        .side-bar-acctions 
            //(v-if="currentUser.isLoggedIn")
            li(@click="logout")
                NuxtLink
                    //IconLogout
                    |Logout
</template>
