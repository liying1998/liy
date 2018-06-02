<template>
  <div id="app">
    <leftNave></leftNave>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftNave from '@/components/common/leftNave'
export default {
  name: 'App',
  components:{
    leftNave
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{
  float:left;
  width:95%;
  background-color:#EFF2F7;
  height:100%;
  overflow:hidden;
}
</style>
