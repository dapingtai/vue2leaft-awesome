<template>
  <div class="container">
    <h1>Map Core Control Components</h1>
    <h3><router-link to="/">Home</router-link></h3>
    <ul class="lists">
      <li v-for="(list, index) in lists" :key="index">
        <a href="#" @click.prevent="changeView(list)">
          {{list}}
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
      lists: []
    }
  },
  methods: {
    changeView(viewName){
      this.view = viewName;
    }
  },
  components: {
    ...GControl
  },
  mounted(){
    for (let i in {...GControl}){
      this.lists.push(i);
    }
  }
}
</script>

<style scoped>
.lists {
  width: 100%;
  margin: 0 auto;
}

.lists li{
  text-align: left;
  display: inline-block;
  padding: .5rem .5rem;
  margin: .1rem .5rem .5rem 0rem;
  background-color: rgb(209, 209, 209);
}

</style>
