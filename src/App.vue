<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view msg="Welcome to Map_Core_Vue" />
    <router-view name="Start" />
    <router-view name="Control" />
    <router-view name="TopRightButton" />
    <router-view name="BottomRightButton" />
  </div>
</template>

<script>
export default {
  name: 'App'
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
  font-size: 16px;
}
</style>
