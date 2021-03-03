<template>
  <div>
    <slot v-if="ready">
      <!--Latitude緯度/Longitude經度-->
      <LControl class="geocloud-control-position leaflet-control-attribution leaflet-control" :position="position">
        <div class="geocloud-control-position-wgs84" v-on:click="selectLatlngBar($event)">{{latLngBar.WGS84}}</div>
        <div class="geocloud-control-position-twd97" v-on:click="selectLatlngBar($event)">{{latLngBar.TWD97}}</div>
        <div class="geocloud-control-position-twd67" v-on:click="selectLatlngBar($event)">{{latLngBar.TWD67}}</div>
      </LControl>
      <!--比例尺-->
      <LControl class="leaflet-control-attribution leaflet-control" :position="position">
        <div>
          比例尺 = {{scalebar}}
        </div>
      </LControl>
    </slot>
  </div>
</template>

<script>
import {LControl, LControlScale} from "vue2-leaflet";
import proj4 from "@/lib/proj4";
// depends on Proj4js
proj4.defs("EPSG:3825", "+proj=tmerc +lat_0=0 +lon_0=119 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
proj4.defs("EPSG:3826", "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
proj4.defs("EPSG:3827", "+proj=tmerc +lat_0=0 +lon_0=119 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA +towgs84=-752,-358,-179,-0.0000011698,0.0000018398,0.0000009822,0.00002329 +units=m +no_defs");
proj4.defs("EPSG:3828", "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA +towgs84=-752,-358,-179,-0.0000011698,0.0000018398,0.0000009822,0.00002329 +units=m +no_defs");
const G ={};
G.proj4 = {
  wgs84: proj4("EPSG:4326"),
  twd97: proj4("EPSG:3826"),
  twd97P: proj4("EPSG:3825"),
  twd67: proj4("EPSG:3828"),
  twd67P: proj4("EPSG:3827")
};
// 比例尺增加逗點
let numberWithCommas = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// 定義可接收父組件的參數
const props = {
  zoom: {
    type: Number,
    default: true
  },
  center: {
    type: [Object, Array],
    default: true
  },
  latLng: {
    type: [Object, Array],
    custom: true
  },
  position: {
    type: String,
    default: "bottomright"
  }
}
export default {
  name: "GPositionAttribution",
  props: props,
  components: {
    LControl,
    LControlScale,
  },
  data:()=>(
      {
        visible: true,
        latLngBar:{
          WGS84: '『WGS84』經度:121.5066 緯度:24.9076',
          TWD97: '『TWD97』',
          TWD67: '『TWD67』'
        },
        scalebar: "1 : 2,114,654",
        ready: false
      }
  ),
  methods:{
    selectLatlngBar(event){
      let parent = event.target.parentElement;
      let parentClassName = event.target.parentElement.className;
      let firstChild = parent.firstChild;
      let newItem = event.currentTarget;
      document.getElementsByClassName(parentClassName)[0].insertBefore(newItem, firstChild);
    }
  },
  computed:{
    latLngChange(){
      return this.latLng
    },
    zoomChange(){
      return this.zoom
    }
  },
  watch: {
    latLngChange: {
      handler(){
        // 定義需轉換座標
        let xy = [this.latLng.lng, this.latLng.lat];
        // 隨滑鼠移動的WGS84經緯度
        let wgs84Lng = this.latLng.lng.toFixed(4);
        let wgs84Lat = this.latLng.lat.toFixed(4);
        this.latLngBar.WGS84 = `『WGS84』經度:${wgs84Lng} 緯度:${wgs84Lat}`;
        // console.log(this.latLngBar.WGS84)
        // 隨滑鼠移動的TWD97經緯度
        let twd97 = G.proj4.twd97.forward(xy);
        let twd97Lng = twd97[0].toFixed(0);
        let twd97Lat = twd97[1].toFixed(0);
        this.latLngBar.TWD97 = `『TWD97』X:${twd97Lng} Y:${twd97Lat}`;
        // console.log(this.latLngBar.TWD97)
        // 隨滑鼠移動的TWD67經緯度
        let twd67 = G.proj4.twd67.forward(xy);
        let twd67Lng = twd67[0].toFixed(0);
        let twd67Lat = twd67[1].toFixed(0);
        this.latLngBar.TWD67 = `『TWD67』X:${twd67Lng} Y:${twd67Lat}`;
      }
    },
    zoomChange : {
      handler(){
        let scale = (96 * 39.37 * 156543.04 * Math.cos(this.center.lat * (Math.PI / 180)) / Math.pow(2, this.zoom));
        this.scalebar = `1 : ${numberWithCommas(Math.round(scale))}`;
      }
    }
  },
  mounted(){
    this.ready = true;
  }
}
</script>

<style scoped>
.leaflet-container .leaflet-control-attribution{
  margin-bottom: 3px;
}
.geocloud-control-position {
  text-align: left;
  cursor: pointer;
  height: 18px;
  overflow: hidden;
  transition: 1s;
}
.geocloud-control-position:hover {
  text-align: left;
  cursor: pointer;
  height: 54px;
  overflow: hidden;
  transition: 1s;
}
.geocloud-control-position-wgs84:hover,
.geocloud-control-position-twd97:hover,
.geocloud-control-position-twd67:hover{
  background-color: #fbfdff;
  color: #2196F3;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
}
</style>
