<template>
    <div class="page-style">
        <HeaderSidebar/>
        <div class="page-style__right">
            <BreadCrumbs :path-array="pathArrayCom"/>


            <SearchBox :selector-array="searchQuery" @doSearch="getSearchQuery" @clearSearch="clearQuery"/>



            <TableTemplate :to-show-array="companiesArray" :table-name="'Контрагенты'" :table-type="'contragent'"/>
        </div>

    </div>
</template>

<script>

    import HeaderSidebar from "@/components/HeaderSidebar";
    import BreadCrumbs from "@/components/BreadCrumbs";
    import ShimmerPlaceholder from "@/components/ShimmerPlaceholder";
    import TableTemplate from "@/components/TableTemplate";


    import {$api} from "@/API/AxiosTemplate";
    import {mapState} from "vuex";
    import SearchBox from "@/components/SearchBox";
    export default {
        name:'ContragentsPage',
        components: {SearchBox, BreadCrumbs, HeaderSidebar, ShimmerPlaceholder, TableTemplate},
        data(){
            return{
                pathArrayCom:[
                    {pathName:'Контрагенты', pathPath:'/contragents'},
                ],

                companiesArray:[],
                searchQuery: {name:'',inn:''},

            }
        },
        methods:{
            async getAllCompanies(){
                this.$store.commit('setIsLoading',true);


                let userData={
                    params:{
                        name:this.searchQuery.name,
                        inn:this.searchQuery.inn,
                        is_owner:false
                    }

                }

                await $api.get('/api/admin/companies',userData).then((res)=>{
                    console.log(res)

                    if(res.data.error){
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    }
                    else{
                        this.companiesArray=res.data.result;
                    }
                    this.$store.commit('setIsLoading',false);
                }).catch((err)=>{
                    console.log(err)
                    this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    this.$store.commit('setIsLoading',false);
                })


            },
            getSearchQuery(qu){
                this.searchQuery[qu.selectText]=qu.queryText
            },
            clearQuery(){
                this.searchQuery={name:'',inn:''}
            }

        },

        mounted() {
            this.getAllCompanies()
        },
        computed: mapState([
            'createdItem'
        ]),
        watch:{
            searchQuery:{
                handler(){
                    this.getAllCompanies()
                },

                deep:true
            },
            createdItem(){
                this.getAllCompanies();
            }

        }
    }
</script>

<style scoped>
</style>