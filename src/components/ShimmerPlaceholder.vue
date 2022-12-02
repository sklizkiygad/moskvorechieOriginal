<template>
    <div class="placeholder shimmer" v-show="$store.state.isLoading">
        <div class="faux-image-wrapper">
            <div class="faux-image"></div>
        </div>
<!--        <div class="faux-text"></div>-->
<!--        <div class="faux-text short"></div>-->
    </div>
</template>

<script>
    export default {
        name:'ShimmerPlaceholder'
    }
</script>

<style scoped>


</style>