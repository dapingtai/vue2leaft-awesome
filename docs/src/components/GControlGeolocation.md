# GControlGeolocation

## Demo
<useFontAwesome/>
<control-ControlGeolocation />

## Code
```vue
<template>
  <div class="container">
    <h1>G Control Geolocaltion</h1>
    <div id="map">
      <l-map
          ref="map"
          id="coretest-map"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
      >
        <!--MapCore定位組件-->
        <GControlGeolocation position="topleft" @flyToCurrentPosition="flyToPosition"></GControlGeolocation>

        <!--圖磚-->
        <l-tile-layer
            :visible="visible"
            :url="url"
        />
        <l-control-attribution
            :position="attributionPosition"
            :prefix="attributionPrefix"
        />
      </l-map>

    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LControlAttribution } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import GControlGeolocation from "../core/control/GControlGeolocation";

export default {
  name: "ControlGeolocationDemo",
  components: {
    GControlGeolocation,
    LMap,
    LTileLayer,
    LControlAttribution,
  },
  data() {
    return {
      map: null,
      mapOptions: {
        zoomControl: false,
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
    flyToPosition(e){
      this.$refs.map.mapObject.flyTo(e.center, e.zoom);
    },
  },
  mounted(){

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
```