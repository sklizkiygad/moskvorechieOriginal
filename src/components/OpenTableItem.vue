<template>
    <transition name="fade">
    <div class="open-table-item" v-show="isOpenItem" @click="closeOpenItem">
        <div class="open-table-item__content" @click.stop>

            <CreateTemplate :type-create="typeOfUrl" />
        </div>
    </div>
    </transition>
</template>

<script>
    import {$api} from "@/API/AxiosTemplate";
    import {mapState} from "vuex";
    import CreateTemplate from "@/components/CreateTemplate";


    export default {
        name:'OpenTableItem',
        components: { CreateTemplate},
        props:{
            typeOfUrl:{
                type:String,
                default:''
            }
        },


        methods:{

            closeOpenItem(){
                this.$store.commit('setIsOpenItem',false)
            },

            async getItemData(){
                let responseString='';

                switch (this.typeOfUrl) {

                    case 'certificate':
                        responseString='/api/admin/certificate/'+this.openItemId
                        break

                    case 'user':
                        responseString='/api/admin/user/'+this.openItemId
                        break

                    case 'connector':
                        responseString='/api/admin/connector/'+this.openItemId
                        break

                    case 'employee':
                        responseString='/api/admin/employee/'+this.openItemId
                        break

                    case 'division':
                        responseString='/api/admin/division/'+this.openItemId
                        break

                    case 'company':
                        responseString='/api/admin/company/'+this.openItemId
                        break

                    case 'legal':
                        responseString='/api/admin/company/'+this.openItemId
                        break

                    case 'contragent':
                        responseString='/api/admin/company/'+this.openItemId
                        break

                    case 'document':
                        responseString='/api/admin/document/'+this.openItemId
                        break


                }




                await $api.get(responseString).then((res)=>{
                    console.log(res)
                    this.$store.commit('setOpenItemObject',res.data.result)
                }).then((err)=>{
                    console.log(err)
                    // this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка сервера!'})
                })
            },
        },

        computed: mapState([
            'isOpenItem',
            'openItemId'
        ]),
        watch:{
            isOpenItem(){
                if(this.isOpenItem){
                    this.getItemData()
                }

            }
        }
    }
</script>

<style scoped>
.open-table-item{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
}

    .open-table-item__content{
        background: #f1f3fb;
        border-radius: 6px;
        padding: 20px;
        width: 100%;
        max-width: 500px;
        max-height: calc(100% - 3rem);
        overflow-y: auto;
    }

</style>