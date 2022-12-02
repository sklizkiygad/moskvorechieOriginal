<template>
    <div class="page-style">


       <HeaderSidebar/>
        <div class="page-style__right">
            <BreadCrumbs :path-array="pathArrayCab"/>
            <div>
                <router-link to="/cabinet/users">Пользователи</router-link>
                <router-link to="/cabinet/users">Сертификаты</router-link>
                <router-link to="/cabinet/users">Коннекторы</router-link>
            </div>

        </div>

    </div>
</template>

<script>
    import HeaderSidebar from "@/components/HeaderSidebar";
    import BreadCrumbs from "@/components/BreadCrumbs";
    export default {
        name:'CabinetPage',
        components:{HeaderSidebar,BreadCrumbs},
        data(){
            return{
                pathArrayCab:[{pathName:'Кабинет', pathPath:'/cabinet'}]
            }
        }
    }
</script>

<style scoped>

</style>