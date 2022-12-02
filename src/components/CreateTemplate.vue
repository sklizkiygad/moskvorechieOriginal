<template>
    <transition name="fade">
    <div class="create-template" @mousedown="closeCreateTemplate" v-show="$store.state.isCreateItem || $store.state.isOpenItem">
        <div class="create-template__content" @mousedown.stop>


            <CreateUser v-if="typeCreate==='user'" />
            <CreateCertificate v-if="typeCreate==='certificate'"/>
            <CreateConnector v-if="typeCreate==='connector'"/>
            <CreateEmployee v-if="typeCreate==='employee'"/>
            <CreateDivision v-if="typeCreate==='division'"/>
            <CreateCompany v-if="typeCreate==='company'"/>
            <CreateLegal v-if="typeCreate==='legal'"/>
            <CreateContragent v-if="typeCreate==='contragent'"/>
            <CreateDocument v-if="typeCreate==='document'"/>



        </div>
    </div>
    </transition>
</template>

<script>
    import checkFormMixin from "@/mixins/checkFormMixin";
    import CreateEmployee from "@/components/CreateEmployee";
    import CreateUser from "@/components/CreateUser";
    import CreateCertificate from "@/components/CreateCertificate";
    import CreateConnector from "@/components/CreateConnector";
    import CreateDivision from "@/components/CreateDivision";
    import CreateCompany from "@/components/CreateCompany";
    import CreateLegal from "@/components/CreateLegal";
    import CreateContragent from "@/components/CreateContragent";
    import CreateDocument from "@/components/CreateDocument";

    export default {
        name:'CreateTemplate',
        components: {
            CreateDocument,
            CreateContragent,
            CreateLegal,
            CreateCompany, CreateDivision, CreateConnector, CreateCertificate, CreateUser, CreateEmployee},
        mixins:[checkFormMixin],

        props:{
        typeCreate:{
            type:String,
            default:''
        },

        },

        methods:{
            closeCreateTemplate(){
                this.$store.commit('setIsCreateItem',false)
                this.$store.commit('setIsOpenItem',false)
            },
        },



    }
</script>

<style scoped>


</style>