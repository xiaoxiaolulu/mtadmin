<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <el-button>我是按钮</el-button>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {Button} from 'element-ui'
export default {
  name: 'App',
  components: {
    [Button.name]:Button
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
