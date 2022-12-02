<template>
    <transition name="slide-fade">
    <div class="modal"
         :style="{background:whatTypeOfError()}"
         v-show="$store.state.isAlert">
        <p>{{$store.state.alertText}}</p>
    </div>
    </transition>
</template>

<script>
    export default {
        name:"AlertBlock",
        methods:{
            whatTypeOfError(){
                switch(this.$store.state.alertType){
                    case 'error':
                        return 'rgba(255, 43, 43, 0.8)'
                    case 'success':
                        return 'rgba(57,255,43,0.8)'
                    default:
                        return 'rgba(255, 43, 43, 0.8)'
                }

            }
        }



    }
</script>

<style scoped>


</style>