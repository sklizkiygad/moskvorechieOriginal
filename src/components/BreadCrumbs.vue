<template>
    <div class="breadcrumbs">
        <ul>
            <li v-for="item in pathArray"> <router-link :to="item.pathPath">{{item.pathName}}</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'BreadCrumbs',

        props:{
            pathArray:{
                type:Array
            }
        }



    }
</script>

<style scoped>


</style>