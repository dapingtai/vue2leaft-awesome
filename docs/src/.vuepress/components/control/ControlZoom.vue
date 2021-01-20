<template>
  <div class="container">
    <h1>G Control Zoom</h1>
    <div id="map">
      <l-map
          ref="map"
          id="coretest-map"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
      >
        <!--左上Zoom選擇組件-->
        <GControlZoom position="topleft">
        </GControlZoom>

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
import GControlZoom from "../core/control/GControlZoom";

export default {
  name: "ControlZoomDemo",
  components: {
    LMap,
    LTileLayer,
    LControlAttribution,
    GControlZoom,
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