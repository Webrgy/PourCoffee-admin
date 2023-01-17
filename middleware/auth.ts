import { useAdmin } from "@/stores/Admin"
const admin = useAdmin()

export default defineNuxtRouteMiddleware((to, from) => {
    if (admin.isLoggedIn === false) {
        return navigateTo({ name: "login" })
    } else {
        abortNavigation()
    }
})
