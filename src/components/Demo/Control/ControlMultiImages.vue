<template>
  <div class="container">
    <h1>G Control Multiple Images</h1>
    <div id="map">
      <l-map
          id="coretest-map"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
      >
        <!--右上圖層選擇組件-->
        <GControlMultiImages position="topright" v-on:layerChanged="updateLayer"/>

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
import { LMap, LTileLayer, LControlAttribution, LControlLayers} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import GControlMultiImages from "@/components/Core/control/GControlMultiImages";

export default {
  name: "ControlLocalGeojsonDemo",
  components: {
    LMap,
    LTileLayer,
    LControlAttribution,
    LControlLayers,
    GControlMultiImages
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
    updateLayer(e) {
      this.url = e.url;
      this.attributionPrefix =
         `Powered by
         <a href="https://vue2-leaflet.netlify.app/">
            Vue2Leaflet
         </a>| ${e.name}`;
    }
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
