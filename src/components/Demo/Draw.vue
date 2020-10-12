<template>
  <div class="container">
    <h1>Map Core Attribution Components</h1>
    <h3><router-link to="/">Home</router-link></h3>
    <ul class="lists">
      <li>
        <a href="#" @click.prevent="changeView('GDrawGPX')">
          GDrawGPX
        </a>
      </li>
    </ul>
    <component :is="view"></component>
  </div>
</template>

<script>
import GDrawGPX from "@/components/Demo/Draw/DrawGPX";

export default {
  name: "DrawGPX",
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
    GDrawGPX
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
