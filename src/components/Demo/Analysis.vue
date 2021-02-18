<template>
  <div>
    <h1>Map Core Analysis Components</h1>
    <h3><router-link to="/">Home</router-link></h3>
    <ul class="lists">
      <li>
        <a href="#" @click.prevent="changeView('AnalysisRange')">
          GAnalysisRange
        </a>
      </li>
    </ul>
    <component :is="view"></component>
  </div>
</template>

<script>
import GAnalysis from "@/components/Demo/Analysis/index.js";

export default {
  name: "Analysis",
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
    ...GAnalysis
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
