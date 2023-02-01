const router = useRouter
export const useAdmin = defineStore("admin", {
    state: () => {
        return {
            isLoggedIn: false as Boolean,
            token: "" as string,
            admin: {},
        }
    },
    getters: {},
    actions: {
        async fetchCurrentAdmin() {
            if(this.isLoggedIn) {
                await $fetch('https://pourcoffee.up.railway.app/api/admin/me', {
                    method: "GET",
                    headers: {
                        authorization: ` Bearer ${this.token}`
                    },
                    onResponse({ response }) {
                        if(response.status === 401) {
                            // notify 401 error
                            console.log("ess");
                            //router().push({name: "login"})
                        }
                    }
                }).then((res: any) => {
                    if(res.success) {
                        this.admin = res.user
                        localStorage.setItem("PourCofeeAdminAuth", JSON.stringify(
                            {
                                isLoggedIn: this.isLoggedIn,
                                token: this.token,
                                admin: this.admin
                            }
                        ))
                        router().push("/")
                    }
                }).catch((error) => {
                    return false
                    // error notify
                })
            }
        },
        logout() {
            this.token = "",
            this.isLoggedIn = false
            this.admin = {}
            router().push({name: "login"})
        }
    }
})

if( import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAdmin, import.meta.hot))
}
