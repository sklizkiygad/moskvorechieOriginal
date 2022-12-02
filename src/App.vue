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
  export default {
    components: {AlertBlock},
  }
</script>