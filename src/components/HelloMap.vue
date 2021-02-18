<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to use map core in project
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">leaflet</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">leaflet-vue</a></li>
      <li><router-link to="/CoreTest">CoreTest</router-link></li>
    </ul>
    <h3>Demo</h3>
    <ul>
      <li><router-link to="/Start">Start</router-link></li>
      <li><router-link to="/FullScreen">FullScreen</router-link></li>
      <li><router-link to="/Draggable">Draggable</router-link></li>
      <li><router-link to="/Attribution">Attribution</router-link></li>
      <li><router-link to="/Control">Control</router-link></li>
      <li><router-link to="/Analysis">Analysis</router-link></li>
      <li><router-link to="/Draw">Draw</router-link></li>
      <li><router-link to="/TopRightButton">TopRightButton</router-link></li>
      <li><router-link to="/BottomRightButton">BottomRightButton</router-link></li>
    </ul>
    <h3>Document</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">暫時還沒有</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
