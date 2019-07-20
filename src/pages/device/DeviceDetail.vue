<template>
	<div>123</div>
</template>

<script>
    export default {
        name: "DeviceDetail",
      created(){
      },
      beforeRouteUpdate (to, from, next) {
        console.log(this.$route.query.device_sn);
        next();
      }
    }
</script>

<style scoped>

</style>
