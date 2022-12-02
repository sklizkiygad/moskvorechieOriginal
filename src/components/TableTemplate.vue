<template>

    <div class="table-template-holder" >

        <CreateTemplate :type-create="tableType"/>
        <OpenTableItem  :type-of-url="tableType"/>

    <div class="table-template__create-button">
        <button @click="openCreateItem">Создать</button>
    </div>


            <div class="table-template-icon">
                <font-awesome-icon icon="fa-regular fa-file-lines" />
            </div>


        <ShimmerPlaceholder/>

    <div class="table-template" v-show="!$store.state.isLoading">

        <div class="table-template__head">
            <div class="table-template__head__icon">
                <div class="table-template__head__icon-svg">
                    <font-awesome-icon icon="fa-regular fa-file-lines" />
                </div>
            </div>
            <h2>{{tableName}}</h2>

        </div>
        <table v-if="toShowArray.length>0" class="table-template__table">
            <thead>
            <tr >
                <th>#</th>
                <th v-for="item in headTable">{{getNameRus(item)}}</th>
            </tr>
            </thead>
            <tbody>
            <tr @click="openThisItem(item.id)" v-for="(item,index) in toShowArray" :key="item.id" >
                <td>{{index+1}}</td>
                <td v-for="headName in headTable">{{getItemTable(item[headName])}}</td>

            </tr>
            </tbody>

        </table>
        <div v-else class="have-no-table">
            <h2>Нет записей</h2>
        </div>


    </div>
    </div>
</template>

<script>
    import CreateTemplate from "@/components/CreateTemplate";
    import ShimmerPlaceholder from "@/components/ShimmerPlaceholder";
    import {tableHeadNames} from "@/assets/tableHeadNames";
    import OpenTableItem from "@/components/OpenTableItem";

    export default {
        name:'TableTemplate',
        components: {OpenTableItem, CreateTemplate ,ShimmerPlaceholder},
        props:{
            toShowArray:{
                type:Array
            },
            tableName:{
                type: String,
                default:''
            },
            tableType:{
                type:String,
                default: ''
            }

        },
        data(){
            return{
                headTable:[]
            }

        },

        methods:{
            openCreateItem(){
                this.$store.commit('setIsCreateItem',true)
            },
            getNameRus(item){
                return tableHeadNames[item] || item
            },
            getItemTable(item){
                if(typeof (item) === 'object'){
                    return item.name
                }
                else{
                    return item
                }
            },
            openThisItem(e){
                this.$store.commit('setOpenItemId',e)
                this.$store.commit('setIsOpenItem',true)

            }
        },
        watch: {
            toShowArray(){
                if(this.toShowArray.length>0){
                    this.headTable = (Object.keys(this.toShowArray[0]))
                }

            }

        }
    }
</script>

<style scoped>
.have-no-table{
    text-align: center;
    padding: 10px;
}
.have-no-table h2{
    font-size: 20px;
    font-weight: 300;
}


</style>