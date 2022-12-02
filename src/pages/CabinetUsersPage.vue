<template>
        <div
                class="page-style"
                :class="$store.state.isHeaderSidebar ? 'hidden':''"
        >
            <HeaderSidebar/>
            <div class="page-style__right">
                <BreadCrumbs :path-array="pathArrayCab" />
                <SearchBox :selector-array="searchBoxQuery" @doSearch="getSearchQuery"/>
                <TableTemplate :to-show-array="usersArray" :table-name="'Пользователи'" :table-type="'user'"/>
            </div>
        </div>

</template>

<script>
    import BreadCrumbs from "@/components/BreadCrumbs";
    import TableTemplate from "@/components/TableTemplate";
    import HeaderSidebar from "@/components/HeaderSidebar";
    import {$api} from "@/API/AxiosTemplate";
    import {mapState} from "vuex";
    import SearchBox from "@/components/SearchBox";

    export default {
        name:'CabinetUsersPage',
        components: {SearchBox, TableTemplate, BreadCrumbs, HeaderSidebar},
        data(){
            return{
                pathArrayCab:[
                    {pathName:'Кабинет', pathPath:'/cabinet'},
                    {pathName:'Пользователи', pathPath:'/cabinet/users'},
                ],
                searchBoxQuery: {first_name:''},
                usersArray:[]
            }
        },
        methods:{
            async getAllUsers(){
                this.$store.commit('setIsLoading',true);


                let userData={
                    params:
                        {
                            name:this.searchBoxQuery.first_name,
                            order:'[name]=A'
                        }
                }
                await $api.get('/api/admin/users',userData).then((res)=>{
                    console.log(res)

                    if(res.data.error){
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    }
                    else{
                        this.usersArray=res.data.result;
                        this.$store.commit('setOpenItemUrl','/api/admin/users')
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
            this.getAllUsers()
        },
        computed: mapState([
            'createdItem'
        ]),
        watch:{
            searchBoxQuery:{
                handler(){
                    this.getAllUsers()
                },
                deep:true

            },
            createdItem(){
                this.getAllUsers();

            }

        }
    }
</script>

<style scoped>



</style>