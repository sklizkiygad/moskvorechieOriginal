<template>
    <div
            class="page-style"
            :class="$store.state.isHeaderSidebar ? 'hidden':''"

    >
        <HeaderSidebar/>
        <div class="page-style__right">

            <BreadCrumbs :path-array="pathArrayCab" />

            <TableTemplate :to-show-array="connectorsArray" :table-name="'Коннекторы'" :table-type="'connector'"/>

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
        name:'CompanyConnectorsPage',
        components: {TableTemplate, BreadCrumbs, HeaderSidebar},
        data(){
            return{
                pathArrayCab:[
                    {pathName:'Компания', pathPath:'/company'},
                    {pathName:'Коннекторы', pathPath:'/company/connectors'},
                ],
                connectorsArray:[]
            }
        },
        methods:{
            async getAllConnectors(){
                this.$store.commit('setIsLoading',true);
                await $api.get('/api/admin/connectors').then((res)=>{
                    console.log(res.data.result)

                    if(res.data.error){
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    }
                    else{
                        this.connectorsArray=res.data.result;
                    }
                    this.$store.commit('setIsLoading',false);
                }).catch((err)=>{
                    console.log(err)
                    this.$store.commit('setIsLoading',false);
                    this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                })
            }
        },
        mounted() {
            this.getAllConnectors()
        },
        computed: mapState([
            'createdItem'
        ]),
        watch:{
            createdItem(){
                this.getAllConnectors();
            },
        }
    }
</script>

<style scoped>

</style>