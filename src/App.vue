<template>
  <div id="app">

      <AlertBlock/>
    <router-view/>
  </div>
</template>

<style>
</style>
<script>

  import AlertBlock from "@/components/AlertBlock";
  import {mapState} from "vuex";
  export default {
    components: {AlertBlock},

      computed: mapState([
          'isServerError'
      ]),


      watch:{
        isServerError(){
            if(this.isServerError){
                localStorage.removeItem('Moskvorechie')
                this.$router.go()
            }
        }

      }
  }
</script>