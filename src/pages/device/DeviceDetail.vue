<template>
	<div>{{$route.params.id}}</div>
</template>

<script>
    export default {
        name: "DeviceDetail",
      created(){
          console.log(this.$route.params.id)
      }
    }
</script>

<style scoped>

</style>
