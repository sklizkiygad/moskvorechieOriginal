<template>
    <div class="page-style">
        <HeaderSidebar/>
        <div class="page-style__right">
            <BreadCrumbs :path-array="pathArrayDoc"/>


            <TableTemplate :to-show-array="documentsArray" :table-name="'Документы'" :table-type="'document'"/>
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

    export default {
        name:'DocumentsPage',
        components: { BreadCrumbs, HeaderSidebar, ShimmerPlaceholder, TableTemplate},
        data(){
            return{
                pathArrayDoc:[
                    {pathName:'Документы', pathPath:'/documents'},
                ],

                documentsArray:[],


            }
        },
        methods:{
            async getAllDocuments(){
                this.$store.commit('setIsLoading',true);



                await $api.get('/api/admin/documents').then((res)=>{
                    console.log(res)

                    if(res.data.error){
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    }
                    else{
                        this.documentsArray=res.data.result;
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


        },

        mounted() {
            this.getAllDocuments()
        },
        computed: mapState([
            'createdItem'
        ]),
        watch:{
            searchQuery:{
                handler(){
                    this.getAllDocuments()
                },

                deep:true
            },
            createdItem(){
                this.getAllDocuments();
            }

        }
    }
</script>

<style scoped>
</style>