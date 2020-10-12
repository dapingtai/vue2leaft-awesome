<template>
  <div>
    <slot v-if="ready">
      <LControl class="geocloud-control-geolocation geocloud-bar" :position="position">
        <a :class="{'geocloud-control-menu-icon':true, active: menuControlIconActive}"
           class="geocloud-control-geolocation"
           @click="controlMenuContent"
        >
          <i class="fas fa-route"></i>
        </a>
      </LControl>

      <!--控制GPX面板-->
      <transition name="menu-slide">
        <slot v-if="menuReady">
          <LControl class="collapse-show" :position="position" v-show="menuShow">
            <span class="close-content" @click="closeMenuContent">x</span>
            <div class="geocloud-drawGPX-switchBar">
              <span class="drawGPX-switch-describe">{{ gpxDescribe }}</span>
              <input id="drawGPX-switch"
                     class="gpx-toggle-round"
                     type="checkbox"
                     :checked="gpxChecked"
                     @change="handleGpxChange"
              />
              <label for="drawGPX-switch"></label>
            </div>
            <div class="geocloud-drawGPX-downloadBar">
              <span class="drawGPX-switch-describe">輸出GPX</span>
              <label for="drawGPX-download" class="geocloud-drawGPX-download">
                <i class="fas fa-download"></i>
              </label>
              <input id="drawGPX-download" type="button" @click="downloadGPX"/>
            </div>
          </LControl>
        </slot>
      </transition>

    </slot>
  </div>
</template>

<script>
import { LControl, LMarker, LPopup, LIcon} from 'vue2-leaflet';
import { buildGPX, GarminBuilder} from 'gpx-builder';
const { Point } = GarminBuilder.MODELS;

const props = {
  position: {
    type: String,
    default: "topleft"
  }
}

export default {
  name: "GControlGeolocation",
  props: props,
  components: { LControl, LMarker, LPopup, LIcon},
  data() {
    return {
      ready: false,
      menuShow: false,
      menuReady:false,
      menuControlIconActive: false,
      gpxDescribe: "開啟GPX",
      gpxChecked: false,
      gpxWatchID: null,
      gpxLocation: [],
      gpxDownloadLocation: Array,
      currentLocation: Array,
      currentLocationShow: false,
      iconSize: [24,24],
      iconAnchor: [12,12],
      popupOptions: { maxWidth: 100 }
    }
  },
  methods:{
    controlMenuContent(){
      this.menuReady = true;
      if (this.menuShow){
        this.menuControlIconActive = false;
        this.menuShow = false;
      }else {
        this.menuControlIconActive = true;
        this.menuShow = true;
      }
    },
    closeMenuContent(){
      this.menuControlIconActive = false;
      this.menuShow = false;
    },
    handleGpxChange(event){
      let gpxStatus = event.target.checked;
      if (gpxStatus){
        this.gpxDescribe = "關閉GPX";
        console.log("Open Gpx");
        if(navigator.geolocation){
          this.gpxWatchID = navigator.geolocation.watchPosition(
              (position) => {
                let gpxPoint = new Point(position.coords.latitude, position.coords.longitude, {
                  ele: position.coords.altitude,
                  time: new Date(position.timestamp)
                })
                console.log(gpxPoint);
                this.gpxLocation.push(gpxPoint);
              }
          );
        }
        console.log(this.gpxWatchID);
      }else {
        this.gpxDescribe = "開啟GPX";
        console.log(`Close Gpx ${this.gpxWatchID}`)
        navigator.geolocation.clearWatch(this.gpxWatchID);
        this.gpxDownloadLocation = this.gpxLocation;
        this.gpxLocation = [];
      }
    },
    async downloadGPX(){
      let currentTime = new Date();
      let points = this.gpxDownloadLocation;
      let gpxData = new GarminBuilder();
      await gpxData.setSegmentPoints(points);
      let outputGPX = await buildGPX(gpxData.toObject());
      let blob = new Blob([outputGPX], {data: 'text/gpx; charset=utf-8;' });
      let downloadUrl = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${currentTime}.gpx`;
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
    },
    getLocation: function (){
      if (this.menuControlIconActive){
        this.menuControlIconActive = false;
      }else {
        this.menuControlIconActive = true;
      }

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
              this.currentLocation = [
                  position.coords.latitude.toFixed('4'),
                  position.coords.longitude.toFixed('4')
              ];
              this.currentLocationShow = true;
              this.$emit('flyToCurrentPosition', {
                center: this.currentLocation,
                zoom: 12
              })
            }
        )
      }
    },
  },
  mounted() {
    this.ready = true;
  }
}
</script>

<style scoped>
/** 定位座標Bar **/
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

.geocloud-control-menu-icon.active {
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  color: #2196F3;
  background-color: orange;
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: block;
  text-align: center;
  text-decoration: none;
  margin-bottom: 4px;
  cursor: pointer;
}

/** Open GPX Menu **/
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all .8s ease;
}

.menu-slide-enter {
  transform: translateX(50px);
  opacity: 0;
}

.menu-slide-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

.collapse-show {
  top: 0px;
  background-color: white;
  box-shadow: 0 3px 1px lightgray, 0 3px 1px gray;
  width: 170px;
  border-radius: .25rem;
  padding: .2rem;
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
  padding-right: .1rem;
}

.close-content:hover {
  opacity: .5;
}

hr{
  margin-top: 20px;
}

/** GPX Switch Bar **/
.geocloud-drawGPX-switchBar{
  margin-top: 2px;
  float: left;
}

.drawGPX-switch-describe {
  font-size: 16px;
  font-weight: bold;
  margin-left: 3px;
  margin-right: 10px;
  width: 100%;
}

.gpx-toggle-round{
  display: none;
}

/** GPX Switch **/
.geocloud-drawGPX-switchBar label{
  display: block;
  position: relative;
  float: right;
  cursor: pointer;
  outline: none;
  user-select: none;
}

.geocloud-drawGPX-switchBar label{
  background-color: lightgray;
  padding: 2px;
  width: 50px;
  height: 22px;
  border-radius: 60px;
  transition: background 0.4s;
}

.geocloud-drawGPX-switchBar label:before,
.geocloud-drawGPX-switchBar label:after{
  display: block;
  position: absolute;
  content: "";
}

.geocloud-drawGPX-switchBar label:before{
  top: 2px;
  left: 2px;
  bottom: 2px;
  right: 2px;
  background-color: white;
  border-radius: 60px;
  transition: background 0.4s;
}
.geocloud-drawGPX-switchBar label:after{
  top: 4px;
  left: 4px;
  bottom: 4px;
  width: 20px;
  background-color: lightgray;
  border-radius: 60px;
  transition: margin 0.4s, background 0.4s;
}

.gpx-toggle-round:checked + label {
  background-color: #8ab48c;
}
.gpx-toggle-round:checked + label:after {
  margin-left: 25px;
  background-color: #8ab48c;
}

/** GPX Download Bar **/
.geocloud-drawGPX-downloadBar{
  margin-top: 5px;
  float: left;
}

#drawGPX-download{
  display: none;
}

.geocloud-drawGPX-download {
  background-color: #FAFAFA;
  color: #4CAF50;
  height: 15px;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  margin-right: 5px;
}

/** 定位座標Icon **/
.geocloud-marker-icon {
  background-color: #8ab48c;
  border: 2px solid #fff;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  color: #fff;
}
</style>
