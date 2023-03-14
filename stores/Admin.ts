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
    }
})

if( import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAdmin, import.meta.hot))
}
