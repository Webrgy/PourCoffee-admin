import { useAdmin } from "@/stores/Admin"
const admin = useAdmin()

/* export default defineNuxtRouteMiddleware( async (to) => {
    if(to.name !== 'login' && !localStorage.getItem("PourCofeeAdminAuth")) {
        return navigateTo("/login")
    } else if ( to.name !== "login" && !admin.admin) {
        admin.fetchCurrentAdmin()
    }
}) */

export default defineNuxtRouteMiddleware((to, from) => {
    console.log("middleware starting now..");
    
    if (admin.isLoggedIn === false) {
        console.log("Admin not logged..");
        return navigateTo({ name: "login" })
    } else {
        console.log("logged..");
        return abortNavigation()
    }
})
