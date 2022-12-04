<template>
    <div
            class="page-style"
            :class="$store.state.isHeaderSidebar ? 'hidden':''"

    >
        <HeaderSidebar/>
        <div class="page-style__right">

            <BreadCrumbs :path-array="pathArrayCab" />


            <TableTemplate :to-show-array="certificatesArray" :table-name="'Сертификаты'" :table-type="'certificate'"/>

        </div>

    </div>

</template>

<script>
    import BreadCrumbs from "@/components/BreadCrumbs";
    import TableTemplate from "@/components/TableTemplate";
    import HeaderSidebar from "@/components/HeaderSidebar";


    import {$api} from "@/API/AxiosTemplate";
    import {mapState} from "vuex";

    export default {
        name:'CabinetCertificates',
        components: {TableTemplate, BreadCrumbs, HeaderSidebar},
        data(){
            return{
                pathArrayCab:[
                    {pathName:'Кабинет', pathPath:'/cabinet'},
                    {pathName:'Сертификаты', pathPath:'/cabinet/certificates'},
                ],

                certificatesArray:[]
            }
        },
        methods:{
            async getAllCertificates(){

                this.$store.commit('setIsLoading',true);


                await $api.get('/api/admin/certificates').then((res)=>{
                    console.log(res.data.result)

                    if(res.data.error){
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    }
                    else{
                        this.certificatesArray=res.data.result;
                        this.$store.commit('setOpenItemUrl','/api/admin/certificates')
                    }
                    this.$store.commit('setIsLoading',false);
                }).catch((err)=>{
                    console.log(err)
                    this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    this.$store.commit('setIsLoading',false);
                })
            },
            getSearchQuery(qu){
                this.searchBoxQuery=qu.queryText;
            }
        },
        mounted() {
            this.getAllCertificates()
        },
        computed: mapState([
            'createdItem',
            'orderByObject'
        ]),
        watch:{
            createdItem(){
                this.getAllCertificates();
            },
            searchBoxQuery:{
                handler(){
                    this.getAllCertificates()
                },
                deep:true

            },
        }
    }
</script>

<style scoped>

</style>