<template>
  <div class="container">
    <h1>Draggable</h1>
    <router-link to="/">Home</router-link>
    <div id="map">
      <l-map
          id="fullscreen-map"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
      >
        <l-tile-layer :url="url" />
        <l-control-attribution
            :position="attributionPosition"
            :prefix="attributionPrefix"
        />
        <!-- other map components -->
      </l-map>

    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import {
  LMap, LTileLayer, LControlAttribution,
  LMarker, LCircle, LPolygon, LPopup
} from 'vue2-leaflet';
import LControlFullscreen from 'vue2-leaflet-fullscreen';
import 'leaflet/dist/leaflet.css';

export default {
  name: "Start",
  components: {
    LMap,
    LTileLayer,
    LControlAttribution,
    LControlFullscreen
  },
  data() {
    return {
      mapOptions: {
        zoomControl: true,
        attributionControl: false,
        zoomSnap: true,
      },
      zoom: 13,
      center: L.latLng([22.992, 120.239]),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attributionPosition: 'bottomright',
      attributionPrefix: 'Powered by <a href="https://vue2-leaflet.netlify.app/">Vue2Leaflet</a>',
      visible: true,
    }
  },
}
</script>

<style scoped>
#fullscreen-map{
  height: 80vh;
  background-color:#a3ccff
}

#map{
  width: 100%; height: 100%
}

</style>
