<template lang="pug">
.app-layout.w-full.h-screen
    .side-bar.drawer.drawer-mobile
        input(id="side-bar" type="checkbox" class="drawer-toggle")
        .drawer-content.flex-col.items-center.justify-center
            main.w-full.h-full.overflow-y-hidden
                // page content
                //.header-bar.w-full
                        //.nav-bar-content
                            NavBar
                        //.avatar-content
                            Avatar
                .bg-gray-50.w-full.overflow-y-hidden.h-full
                    .main-content
                        .view.overflow-y-scroll
                            slot
                        //.indicator.absolute.z-30.bottom-5.right-6.block.text-base-200(class="xl:hidden" @click="toggleCart")
                            span.indicator-item.badge.badge-primary 99
                            button.btn.btn-small.btn-circle.shadow-xl.text-xl
                                IconCoffeeCart
            //SwapDrawer(class="lg:hidden").absolute.top-4.left-2
        SideBar
</template>
<style lang="scss">
.header-bar {
    @apply w-full flex flex-col-reverse sm:flex-row;
    .nav-bar-content {
        @apply w-full sm:w-7/12 lg:w-8/12 xl:w-9/12
    }
    .avatar-content {
        @apply w-full border-b sm:border-none sm:w-5/12 lg:w-4/12 xl:w-3/12
    }
}
.main-content {
    @apply  w-full flex flex-row h-full overflow-y-hidden;
    .view {
        @apply w-full
    }
}
</style>
