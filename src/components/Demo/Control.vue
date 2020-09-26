<template>
  <div class="container">
    <h1>Map Core Control Components</h1>
    <h3><router-link to="/">Home</router-link></h3>
    <ul class="lists">
      <li>
        <a href="#" @click.prevent="changeView('ControlGeolocation')">
          GControlGeolocation
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="changeView('ControlZoom')">
          GControlZoom
        </a>
      </li>
    </ul>
    <component :is="view"></component>
  </div>
</template>

<script>
import GControl from "@/components/Demo/Control/index.js";

export default {
  name: "Control",
  data() {
    return {
      view: null,
    }
  },
  methods: {
    changeView(viewName){
      this.view = viewName;
    }
  },
  components: {
    ...GControl
  }
}
</script>

<style scoped>
.lists {
  width: 400px;
  margin: 0 auto;
}

.lists li{
  text-align: left;
  display: inline;
  padding: .5em .5em;
  margin: .5em;
  background-color: rgb(209, 209, 209);
}

</style>
