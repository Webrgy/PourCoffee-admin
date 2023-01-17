// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    app: {
        head: {
            title: "PourCoffee - Admin"
        }
    },
    css: [
        "~/assets/css/tailwind.scss",
        "~/assets/css/global.scss"
    ]
})
