<template>
    <div
            class="header-sidebar"
            :class="$store.state.isHeaderSidebar?  '' : 'hidden' "
    >

        <div class="header-sidebar__logo">
            <h3>Москворечье</h3>
        </div>
        <ul class="header-sidebar__list">
            <li>
                <router-link to="/"><font-awesome-icon icon="fa-regular fa-building" /> Компания</router-link>
                <ul class="header-sidebar__list__sub">
                    <li><router-link to="/connectors">Коннекторы</router-link></li>
                    <li><router-link to="/employees">Сотрудники</router-link></li>
                    <li><router-link to="/divisions">Подразделения</router-link></li>
                    <li><router-link to="/legal">Юридические лица</router-link></li>
                </ul>
            </li>
            <li>
                <router-link to="/cabinet/certificates"><font-awesome-icon icon="fa-regular fa-user" /> Кабинет</router-link>
                <ul class="header-sidebar__list__sub">
                    <li><router-link to="/cabinet/certificates">Сертификаты</router-link></li>
                    <li><router-link to="/cabinet/users">Пользователи</router-link></li>

                </ul>
            </li>
            <li>
                <router-link to="/documents"><font-awesome-icon icon="fa-regular fa-file" /> Документы</router-link>
                <ul class="header-sidebar__list__sub">
                    <li><router-link to="/">Входящие</router-link></li>
                    <li><router-link to="/">Исходящие</router-link></li>
                </ul>
            </li>
            <li><router-link to="/contragents"><font-awesome-icon icon="fa-regular fa-handshake" /> Контрагенты</router-link></li>
        </ul>
        <div class="header-sidebar__button" @click="changeStateSidebar">
            <font-awesome-icon icon="fa-regular fa-rectangle-list" />
        </div>
    </div>

</template>

<script>
    export default {
        name:'HeaderSidebar',

        methods:{
            changeStateSidebar(){
                if(this.$store.state.isHeaderSidebar){
                    this.$store.commit('setIsHeaderSidebar',false)
                }
                else{
                    this.$store.commit('setIsHeaderSidebar',true)
                }

            }
        }

    }
</script>

<style scoped>


</style>