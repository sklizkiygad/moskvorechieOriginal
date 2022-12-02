<template>
    <div
            class="page-style"
            :class="$store.state.isHeaderSidebar ? 'hidden':''"

    >
        <HeaderSidebar/>
        <div class="page-style__right">

            <BreadCrumbs :path-array="pathArrayCab" />

            <SearchBox :selector-array="searchBoxQuery" @doSearch="getSearchQuery"/>


            <TableTemplate :to-show-array="divisionsArray" :table-name="'Подразделения'" :table-type="'division'"/>

        </div>

    </div>

</template>

<script>
    import BreadCrumbs from "@/components/BreadCrumbs";
    import TableTemplate from "@/components/TableTemplate";
    import HeaderSidebar from "@/components/HeaderSidebar";
    import SearchBox from "@/components/SearchBox";

    import {$api} from "@/API/AxiosTemplate";
    import {mapState} from "vuex";

    export default {
        name:'CompanyDivisionsPage',
        components: {TableTemplate, BreadCrumbs, HeaderSidebar, SearchBox},
        data(){
            return{
                pathArrayCab:[
                    {pathName:'Компания', pathPath:'/company'},
                    {pathName:'Подразделения', pathPath:'/company/divisions'},
                ],
                divisionsArray:[],
                searchBoxQuery:{name:'', company:''}
            }
        },

        methods:{
            async getAllDivisions(){
                this.$store.commit('setIsLoading',true);

                let divisionData={
                    params:
                        {
                            name:this.searchBoxQuery.name,
                            company:this.searchBoxQuery.company,
                        }
                }
                await $api.get('/api/admin/divisions',divisionData).then((res)=>{
                    console.log(res.data.result)
                    if(res.data.error){
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    }
                    else{
                        this.divisionsArray=res.data.result;
                    }
                    this.$store.commit('setIsLoading',false);
                }).catch((err)=>{
                    console.log(err)
                    this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    this.$store.commit('setIsLoading',false);
                })
            },
            getSearchQuery(qu){
                this.searchBoxQuery[qu.selectText]=qu.queryText;
            }
        },

        mounted() {
            this.getAllDivisions()
        },

        computed: mapState([
            'createdItem'
        ]),

        watch:{
            searchBoxQuery:{
                handler(){
                    this.getAllDivisions()
                },
                deep:true

            },

            createdItem(){
                this.getAllDivisions();
            },

        }
    }
</script>

<style scoped>

</style>