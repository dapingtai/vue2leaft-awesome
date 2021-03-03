<template>
  <div class="container">
    <h1>G Position Attribution</h1>
    <div id="map">
      <l-map
          id="coretest-map"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          @mousemove="mapPosition"
          @update:center="centerUpdated"
          @update:zoom="zoomUpdated"
      >
        <!--圖磚-->
        <l-tile-layer :url="url" />
        <l-control-attribution
            :position="attributionPosition"
            :prefix="attributionPrefix"
        />
        <!--右下組件-->
        <GPositionAttribution :zoom="zoom" :center="center" :lat-lng="latLng" position="bottomright"/>

      </l-map>

    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LControlAttribution} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import GPositionAttribution from "../core/attribution/GAttributionPosition";

export default {
  name: "PositionAttributionDemo",
  components: {
    LMap,
    LTileLayer,
    LControlAttribution,
    GPositionAttribution
  },
  data() {
    return {
      mapOptions: {
        zoomControl: true,
        attributionControl: false,
        zoomSnap: true,
      },
      zoom: 10,
      center: L.latLng([24.9076, 121.5066]),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attributionPosition: 'bottomright',
      attributionPrefix: 'Powered by <a href="https://vue2-leaflet.netlify.app/">Vue2Leaflet</a>',
      visible: true,
      latLng: L.latLng([24.9076, 121.5066]),
    }
  },
  methods:{
    mapPosition(e){
      this.latLng = e.latlng;
    },
    centerUpdated(center){
      this.center = center;
    },
    zoomUpdated(zoom){
      this.zoom = zoom;
    },
  }
}
</script>

<style scoped>
#coretest-map{
  height: 80vh;
  background-color:#a3ccff
}
#map{
  width: 100%; height: 100%
}
</style>



