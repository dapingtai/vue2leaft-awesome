<template>
  <div class="container">
    <h1>Start</h1>
    <router-link to="/">Home</router-link>
    <button @click="ShowMarkers">Show Markers</button>
    <button @click="ShowCircleMarkers">Show Circle Markers</button>
    <button @click="ShowPolygonMarkers">Show Polygon Markers</button>
    <div id="map">
      <l-map
          id="start-map"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
      >
        <!--圖磚-->
        <l-tile-layer :url="url" />
        <l-control-attribution
            :position="attributionPosition"
            :prefix="attributionPrefix"
        />

        <!--單點標記物-->
        <l-marker
              v-for="marker in markers" :key="marker.id"
              :lat-lng="marker.position" :visible="markersActive.markers"
        >
          <l-popup :content="marker.text"></l-popup>
        </l-marker>



        <!--圓形範圍標記-->
        <l-circle
            v-for="cmarker in circleMarkers"
            :key="cmarker.id"
            :lat-lng="cmarker.center"
            :radius="cmarker.radius"
            :color="cmarker.color"
            :visible="markersActive.cmarkers"
        >
          <l-popup :content="cmarker.text"></l-popup>
        </l-circle>

        <!--幾何多邊形標記-->
        <l-polygon
            v-for="pmarker in polygonMarkers"
            :lat-lngs="pmarker.polygon"
            :color="pmarker.color"
            :key="pmarker.id"
            :visible = "markersActive.pmarkers"
        >
          <l-popup :content="pmarker.text"></l-popup>
        </l-polygon>

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

import 'leaflet/dist/leaflet.css';

export default {
  name: "Start",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControlAttribution,
    LCircle,
    LPolygon
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
      markersActive: {
        markers: true,
        cmarkers: true,
        pmarkers: true
      },
      markers: [
        {
          id:"A",
          position: L.latLng([22.992, 120.239]),
          text: '這是標記物A'
        },
        {
          id:"B",
          position: L.latLng([22.994, 120.250]),
          text: '這是標記物B'
        }
      ],
      circleMarkers:[
        {
          id: "c1",
          center: [22.988, 120.220],   // 圓心座標
          radius: 1000,                // 半徑（公尺）
          color: 'red',      // 線條顏色
          fillColor: '#f03', // 填充顏色
          fillOpacity: 0.5,   // 透明度
          text: '這是圈圈A'
        },
        {
          id: "c2",
          center: [23, 120.220],   // 圓心座標
          radius: 1000,                // 半徑（公尺）
          color: 'red',      // 線條顏色
          fillColor: '#f03', // 填充顏色
          fillOpacity: 0.5,   // 透明度
          text: '這是圈圈B'
        }
      ],
      polygonMarkers:[
        {
          id: "p1",
          polygon: [
            [22.909, 120.228],
            [22.903, 120.248],
            [22.951, 120.262]
          ],                // 幾何面積
          color: 'green',    // 線條顏色
          text: '這是幾何A'
        },
        {
          id: "p2",
          polygon: [
            [22.909, 120.260],
            [22.903, 120.280],
            [22.951, 120.295]
          ],                 // 幾何面積
          color: 'green',    // 線條顏色
          text: '這是幾何B'
        }
      ]
    }
  },
  methods: {
    ShowMarkers(){
      this.markersActive.markers = this.markersActive.markers ? false : true;
      // console.log(this.markersActive)
    },
    ShowCircleMarkers(){
      this.markersActive.cmarkers = this.markersActive.cmarkers ? false : true;
    },
    ShowPolygonMarkers(){
      this.markersActive.pmarkers = this.markersActive.pmarkers ? false : true;
    }
  }
}
</script>

<style scoped>
#start-map{
  height: 80vh;
  background-color:#a3ccff
}

#map{
  width: 100%; height: 100%
}

</style>