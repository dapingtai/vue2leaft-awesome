<template>
  <div class="topright-button-map">
    <slot v-if="ready">
      <!--控制底圖目錄-->
      <LControl class="geocloud-control-menu" :position="position">
        <a class="" @click="controlMenuContent">
          <img src="../../../../../Mohw_LTC_GIS_Ver/target_vue/src/assets/img/groundFloorMap.svg">
        </a>
      </LControl>
      <!--控制底圖目錄面板-->
      <LControl class="geocloud-control-menuContent" :position="position">
        <div class="content geocloud-menuContent-tile">
          <div class="contents">
            <div class="contentTitle">
              底圖切換
              <span class="close-content" @click="closeMenuContent">x</span>
            </div>
            <div class="geocloud-panel">
              <div class="title">底圖</div>
              <div class="area" v-for="(layer, index) in layers" :key="index">
                <div class="geocloud-tile-button" @click="selectMap($event, index)" :title="layer.name">
                  <div class="geocloud-tile-image">
                    <img :src="layer.img">
                  </div>
                  <div class="geocloud-tile-describe">{{layer.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LControl>
    </slot>
  </div>
</template>

<script>
import {LControl} from 'vue2-leaflet';
import ncl1 from '../../../../../Mohw_LTC_GIS_Ver/target_vue/src/assets/img/nlsc1.png';
import ncl2 from '../../../../../Mohw_LTC_GIS_Ver/target_vue/src/assets/img/nlsc2.png';

const props = {
  position: {
    type: String,
    default: "topright"
  }
}

export default {
  name: "TopRightButton",
  props: props,
  components: {
    LControl
  },
  data: ()=>(
    {
      ready: false,
      layerObject: Object,
      layers: [
        {
          name: "臺灣通用電子地圖",
          img: ncl1,
          url: "https://wmts.nlsc.gov.tw/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=EMAP&STYLE=_null&TILEMATRIXSET=EPSG:3857&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png"
        },
        {
          name: "臺灣通用電子地圖正射影像",
          img: ncl2,
          url: "https://wmts.nlsc.gov.tw/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=PHOTO2&STYLE=_null&TILEMATRIXSET=EPSG:3857&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png"
        }
      ]
    }
  ),
  methods: {
    /** Menu 控制開關 **/
    controlMenuContent(event){
      if(event.target.className){
        event.currentTarget.classList.remove('active');
        document.getElementsByClassName('geocloud-control-menuContent')[0].classList.remove('active');
      }else {
        event.currentTarget.classList.toggle('active');
        document.getElementsByClassName('geocloud-control-menuContent')[0].classList.toggle('active');
      }
    },
    /** Menu Content控制開關 **/
    closeMenuContent(){
      let menu = document.getElementsByClassName('geocloud-control-menu')[0];
      menu.getElementsByTagName('a')[0].classList.remove('active');
      document.getElementsByClassName('geocloud-control-menuContent')[0].classList.remove('active');
    },
    selectMap(event, index){
      let allEvents = document.querySelectorAll('.geocloud-tile-button');
      // 先移除所有的active，再於指定目標加入active
      allEvents.forEach(
          (event)=>{
            event.classList.remove('active');
          }
      )
      event.currentTarget.classList.toggle('active');
      if(event.currentTarget.classList.contains('active')){
        console.log("Start Change");
        this.layerObject = this.layers[index];
        this.$emit("layerChanged", this.layerObject);
      }else {
        console.log("No Change");
      }
    }
  },
  mounted() {
    this.ready = true
  }
}
</script>

<style scoped>
/**** Menu ****/
.geocloud-control-menu{
  position: absolute;
  display: inline-block;
  text-align: right;
  z-index: 1000;
  top: 0;
  right: 0;
  width: 540px;
  float: right;
}

.geocloud-control-menu a{
  cursor: pointer;
  background-color: #2196F3;
  display: inline-block;
  color: #fff;
  margin: 6px;
  left: 0;
  border-radius: 50%;
  transition: .5s;
}

.geocloud-control-menu img {
  width: 48px;
  vertical-align: middle;
}

.geocloud-control-menu a.active{
  background-color: #F39621;
  color: #fff;
  text-shadow: 1px 1px 4px rgba(0,0,0,.25);
  left: 5px;
}

/**** Menu Content ****/
.geocloud-control-menuContent {
  top: 60px;
  right: 0;
  height: calc(100% - 150px);
  clear: none;
  transition: .5s;
  margin-right: 10px !important;
  pointer-events: none;
  float: right;
  display: none;
  text-align: left;
}

.geocloud-control-menuContent .content {
  width: 240px;
  overflow-y: auto;
  margin: 6px;
  max-height: calc(100vh);
  box-shadow: 0 3px 5px rgba(0,0,0,.1);
  border-radius: 3px;
  pointer-events: fill;
}

.geocloud-control-menuContent.active{
  top: 60px;
  right: 0;
  height: calc(100% - 150px);
  clear: none;
  transition: .5s;
  margin-right: 10px !important;
  pointer-events: none;
  float: right;
  display: inline;
}

.geocloud-control-menuContent .contents {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
  height: calc(100%);
  pointer-events: fill;
}

.geocloud-control-menuContent .content .contentTitle {
  background: #BEBEBE;
  padding: 10px 15px 5px;
  border-bottom: 1px solid #cfcfcf;
  position: relative;
  min-height: 30px;
  color: #0C0C0C;
  font-family: 微軟正黑體;
  font-size: 15px;
  font-weight: 700;
}

.close-content {
  float: right;
  font-size: 21px;
  font-weight: bold;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .2;
  cursor: pointer;
}
.close-content:hover{
  opacity: .5;
}

.geocloud-menuContent-tile .geocloud-tile-image {
  height: 42px;
}

/**** Menu Content Map****/
.geocloud-control-menuContent .content .geocloud-panel {
  position: relative;
  background: #f3f3f3;
  pointer-events: fill;
}

.geocloud-control-menuContent .content .geocloud-panel .title {
  padding: 10px 30px 10px 15px;
  position: relative;
  color: #0C0C0C;
  font-family: 微軟正黑體;
  text-shadow: -1px 0 #fff,0 1px #fff,1px 0 #fff,0 -1px #fff,1px 1px 4px rgba(0,0,0,.25);
  font-size: 13px;
  font-weight: 700;
  min-height: 20px;
}

/**** Menu Content Map Tile****/
.geocloud-menuContent-tile .geocloud-tile-button {
  width: 180px;
  margin: 0 auto 12px;
  cursor: pointer;
  transition: .3s;
}
.geocloud-menuContent-tile .geocloud-tile-button {
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
}

.geocloud-menuContent-tile .geocloud-tile-image {
  height: 42px;
}

.geocloud-menuContent-tile img {
  height: 40px;
  width: 180px;
}

.geocloud-menuContent-tile .active {
  border: 2px solid #2196F3;
}
.geocloud-menuContent-tile .active .geocloud-tile-describe {
  background-color: #2196F3;
  color: #fff;
}


</style>
