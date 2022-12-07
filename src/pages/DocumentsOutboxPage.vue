<template>
    <div class="page-style">
        <HeaderSidebar/>
        <div class="page-style__right">
            <BreadCrumbs :path-array="pathArrayDoc"/>


            <TableTemplate :to-show-array="documentsArray" :table-name="'Исходящие'" :table-type="'document'"/>
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
        name:'DocumentsOutboxPage',
        components: { BreadCrumbs, HeaderSidebar, ShimmerPlaceholder, TableTemplate},
        data(){
            return{
                pathArrayDoc:[
                    {pathName:'Документы', pathPath:'/documents'},
                    {pathName:'Исходящие', pathPath:'/documents/outbox'},
                ],

                documentsArray:[],


            }
        },
        methods:{
            async getAllDocuments(){
                this.$store.commit('setIsLoading',true);

                let outboxData={
                    params:{
                        type_id:1
                    }
                }

                await $api.get('/api/admin/documents',outboxData).then((res)=>{
                    console.log(res)

                    if(res.data.error){
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                    }
                    else{
                        console.log(res.data.result)
                        let formatDateArray =
                            res.data.result.map((item)=>{
                                item.legal_date=item.legal_date.slice(0,10)
                                return item
                            })

                        this.documentsArray=formatDateArray;
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