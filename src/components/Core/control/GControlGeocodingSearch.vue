<template>
  <div>
    <slot v-if="ready">
      <LControl class="geocloud-control-geocoding" :position="position">
        <div class="geocloud-control-geocoding-barContainer" >
          <div class="geocloud-control-geocoding-bar">
            <input type="text" placeholder="請輸入地址, 地名, 座標"
                   class = "search-input"
                   v-model="searchInfo"
                   v-on:focus="focusSearch"
                   v-on:blur="blurSearch"
            >
          </div>
        </div>

        <a class="geocloud-control-geocoding-search" @click="geoSearch" v-show="!showSearch">
          <i class="fa fa-search"></i>
        </a>

        <a class="geocloud-control-geocoding-removesearch" @click="geoRemoveSearch" v-show="showSearch">
          <i class="fa fa-arrow-left"></i>
        </a>
      </LControl >

      <LControl class="geocloud-control-geocoding-collapse"
                v-if="ifSearch"
                v-show="showSearch"
                :position="position"
      >
        <div class="geocloud-control-geocoding-listContainer" >
          <div class="geocloud-control-geocoding-list list-group"
               v-for="(item, index) in searchList"
               :key="index"
          >
            <button class="list-group-item" @click="chooseSearch(item, index)">
              <i class="fa fa-map-marker"></i>
              {{(item.landmark !== undefined) ? item.landmark : item}}
            </button>
          </div>
        </div>
      </LControl>

      <LMarker
          v-if="searchLocationShow"
          :lat-lng="searchLocation.latlng"
      >
        <LIcon
            class-name="geocloud-marker-icon"
            :icon-size="iconSize"
            :icon-anchor="iconAnchor"
        >
          <i class="fa fa-thumbtack"></i>
        </LIcon>
        <LPopup :options="popupOptions">
          {{ searchLocation.name }} <br>
          經度 : {{searchLocation.latlng[0]}}<br>
          緯度 : {{searchLocation.latlng[1]}}<br>
          <button class="geocloud-button-remove" @click="removeSearchLocation">
            移除
          </button>
        </LPopup>
      </LMarker>
    </slot>
  </div>
</template>

<script>
import { LControl, LMarker, LPopup, LIcon} from 'vue2-leaflet';
import axios from 'axios';

const props = {
  position: {
    type: String,
    default: "topleft"
  }
}

/**
 * Title: Search Right Taiwan Coordinate
 * @param searchInfo: Input information
 */
function searchCoordinate(searchInfo) {
  let latlng = searchInfo.split(',');
  let lat = Number(latlng[0]);
  let lng = Number(latlng[1]);
  if (lat <= 90 && lat >= -90 && lng <= 180 && lng >= -180){
    return [[lat, lng]];
  }else if(lng <= 90 && lng >= -90 && lat <= 180 && lat >= -180){
    return [[lng, lat]];
  }
}

/**
 * Title: Search Right Taiwan Address
 * @param searchInfo: Input information
 */
function searchAddress(searchInfo){
  let googleApi = `https://maps.googleapis.com/maps/api/geocode/json?sensor=false&region=tw&language=zh-tw&address=${searchInfo}`;
  let tgosApi = `/map/utils/tgos?address=${searchInfo}`;
  let landMarkApi = `https://www.geologycloud.tw/landmark?s=${searchInfo}`;
  return new Promise((resolve, reject) => {
    axios.get(landMarkApi).then(
        (res)=>{
          resolve(res.data);
        }
    ).catch(
        (err)=>{
          reject(err)
        }
    )
  })
}


export default {
  name: "GControlGeocodingSearch",
  props: props,
  components: { LControl, LMarker, LPopup, LIcon},
  data() {
    return {
      ready: false,
      searchLocation: {
        name: "我的位置",
        latlng: Array
      },
      searchLocationShow: false,
      ifSearch: false,
      showSearch: false,
      searchList: Array,
      iconSize: [24,24],
      iconAnchor: [12,12],
      popupOptions: { maxWidth: 100 },
      searchInfo: ""
    }
  },
  methods:{
    geoSearch(){
      this.ifSearch = true;
      this.showSearch = true;
      if (this.searchInfo.trim() !== ""){
        if (/([+-]?\d+\.?\d+)\s*,\s*([+-]?\d+\.?\d+)/.test(this.searchInfo)){
          this.searchList = searchCoordinate(this.searchInfo);
        }else {
          searchAddress(this.searchInfo).then(
              (data)=>{
                this.searchList = data.mark;
              }
          );
        }
      }else {
        this.showSearch = false;
      }
    },
    geoRemoveSearch(){
      this.showSearch = false;
    },
    focusSearch(){
      if (this.searchInfo.trim() === "") {
        this.showSearch = false;
      }
    },
    blurSearch(){
      // console.log("blur")
      this.showSearch = false;
    },
    chooseSearch(item, index){
      this.searchLocationShow = true;
      if(item.landmark === undefined){
        console.log(this.searchList[index])
        this.searchLocation.name = "我的位置";
        this.searchLocation.latlng = this.searchList[index];
      }else {
        let lat = item.y;
        let lng = item.x;
        this.searchLocation.name = item.landmark;
        this.searchLocation.latlng = [lat, lng];
      }
    },
    removeSearchLocation(){
      this.searchLocationShow = false;
      this.searchLocation.latlng = Array;
    }
  },
  watch:{
    searchInfo: {
      handler(value) {
        console.log(value)
        this.focusSearch()
      }
    }
  },
  mounted() {
    this.ready = true;
  }
}
</script>

<style scoped>

.geocloud-control-geocoding {
  max-width: 260px;
  width: 180%;
}

/** 搜尋座標Bar **/
.geocloud-control-geocoding-barContainer {
  float: left;
  position: relative;
  max-width: 250px;
  width: 100%;
  border-radius: 2px;
}

.geocloud-control-geocoding-bar {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  max-width: 250px;
  width: 100%;
}

.geocloud-control-geocoding-search,
.geocloud-control-geocoding-removesearch {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}

.geocloud-control-geocoding-search,
.geocloud-control-geocoding-removesearch {
  background-color: #fff;
  border-radius: 2px;
  width: 30px;
  height: 30px;
  line-height: 35px;
  outline: none;
  text-align: center;
  text-decoration: none;
  color: #8ab48c;
  cursor: pointer;
}

.geocloud-control-geocoding-search:hover,
.geocloud-control-geocoding-removesearch:hover {
  color: darkgreen;
}

.geocloud-control-geocoding-bar input{
  background-color: white;
  color: #8ab48c;
  line-height: 30px;
  outline: none;
  border: none;
  width: 100%;
  border-radius: 2px;
  padding-left: 10px;
}

/** 搜尋提示 **/
.geocloud-control-geocoding-listContainer {
  width: 100%;
  margin-top: 0px;
  max-height: 260px;
  background-color: white;
  border-radius: 4px;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #8ab48c white;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.geocloud-control-geocoding-list {
  padding: 2px;
}

.geocloud-control-geocoding-list button{
  width: 100%;
  text-align: left;
  padding: 3px;
  border: none;
  border-radius: 2px;
  color: #8ab48c;
  outline: none;
  height: 30px;
}

.geocloud-control-geocoding-list button:hover {
  background-color: #8ab48c;
  color: white;
}

.list-group-item {
  display: block;
  background-color: white;
  height: 30px;
  margin-bottom: -1px;
}


/** 定位座標Icon 無作用 需更改leaflet.css才可**/
.geocloud-button-remove {
  background-color: red;
  border-radius: 6px;
  padding: .2rem;
  color: white;
  width: 100%;
  border: none;
  cursor: pointer;
  margin-top: 2px;
}
.geocloud-marker-icon {
  background-color: #8ab48c;
  border: 2px solid #fff;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  color: #fff;
}
</style>
