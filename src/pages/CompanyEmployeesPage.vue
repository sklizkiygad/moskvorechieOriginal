<template>
    <div
            class="page-style"
            :class="$store.state.isHeaderSidebar ? 'hidden':''"

    >
        <HeaderSidebar/>
        <div class="page-style__right">
            <BreadCrumbs :path-array="pathArrayCab" />

            <TableTemplate :to-show-array="employeesArray" :table-name="'Сотрудники'" :table-type="'employee'"/>

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
        name:'CompanyEmployeesPage',
        components: {TableTemplate, BreadCrumbs, HeaderSidebar},
        data(){
            return{
                pathArrayCab:[
                    {pathName:'Компания', pathPath:'/'},
                    {pathName:'Сотрудники', pathPath:'/employees'},
                ],
                employeesArray:[]
            }
        },
        methods:{
            async getAllEmployees(){
                this.$store.commit('setIsLoading',true);

                await $api.get('/api/admin/employees').then((res)=>{
                    console.log(res.data.result)

                    if(res.data.error){
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    }
                    else{
                        this.employeesArray=res.data.result;
                    }
                    this.$store.commit('setIsLoading',false);
                }).catch((err)=>{
                    console.log(err)
                    this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    this.$store.commit('setIsLoading',false);
                })
            }
        },
        mounted() {
            this.getAllEmployees()
        },
        computed: mapState([
            'createdItem'
        ]),
        watch:{
            createdItem(){
                this.getAllEmployees();
            },
            searchBoxQuery:{
                handler(){
                    this.getAllEmployees()
                },
                deep:true

            },
        },

    }
</script>

<style scoped>

</style>