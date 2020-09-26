<template>
  <div class="topleft-button-map">
    <slot v-if="ready">
      <LControl class="geocloud-control-zoom geocloud-bar" :position="position">
        <a class="geocloud-control-zoom-in">
          <font-awesome-icon icon="plus"></font-awesome-icon>
        </a>
        <a class="geocloud-control-zoom-out">
          <font-awesome-icon icon="minus"></font-awesome-icon>
        </a>
      </LControl>
    </slot>
  </div>
</template>

<script>
import { LControl } from 'vue2-leaflet';

const props = {
  position: {
    type: String,
    default: "topleft"
  }
}

export default {
  name: "TopLeftButton",
  props: props,
  components: { LControl },
  data:()=> (
      {
       map: null,
       ready: false,
      }
  ),
  mounted() {
    this.ready = true;
  }
}
</script>

<style scoped>

.geocloud-bar a{
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  color: #2196F3;
  background-color: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: block;
  text-align: center;
  text-decoration: none;
  margin-bottom: 4px;
  cursor: pointer;
}

</style>
