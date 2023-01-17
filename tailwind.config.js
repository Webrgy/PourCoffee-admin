module.exports = {
    content: [
        "~/assets/css/tailwind.scss"
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["bumblebee"]
    }
}
