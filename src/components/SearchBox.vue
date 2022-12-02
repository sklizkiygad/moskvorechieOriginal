<template>
    <div class="search-box-holder">
        <div class="search-box" v-show="!selectorArray || (selectorArray && selectorChoose !=='')">

            <button class="btn-search"><font-awesome-icon icon="fas fa-search" /></button>

            <input type="text" class="input-search" v-model="searchQuery" placeholder="Поиск...">


        </div>


        <select v-show="optionArray.length>0" v-model="selectorChoose"  class="search-box-select">
            <option disabled selected value="">Поиск по:</option>
            <option v-for="item in optionArray" :value="item">{{tableHeadNames[item]}}</option>


        </select>


    </div>
</template>

<script>
    import {tableHeadNames} from "@/assets/tableHeadNames";

    export default {
        name:'SearchBox',

        props:{
            selectorArray:{
                type:Object,
                default:null
            }
        },

        data(){
            return{
                tableHeadNames,
                searchQuery:'',
                selectorChoose:'',
                optionArray:[]
            }
        },

        methods:{
            getSearchNames(){
                if (this.selectorArray){
                    this.optionArray=Object.keys(this.selectorArray)
                }

            }
        },
        watch:{
            searchQuery(){
                this.$emit('doSearch',{queryText:this.searchQuery.trim(),selectText:this.selectorChoose})
            },
            selectorChoose(){
                this.searchQuery=''
                this.$emit('clearSearch')
            }
        },
        mounted() {
            this.getSearchNames()
        }

    }
</script>

<style scoped>

    .search-box-holder{
        gap: 20px;
    }

    .search-box-select{
        height: 54px;
        width: 120px;
        border-style: none;
        font-size: 18px;
        letter-spacing: 2px;
        outline: none;
        border-radius: 5px;
        transition: all .5s ease-in-out;
        background-color: #6658d3;

        color: #fff;
    }



</style>