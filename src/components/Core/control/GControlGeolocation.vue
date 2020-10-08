<template>
  <div>
    <slot v-if="ready">
      <LControl class="geocloud-control-geolocation geocloud-bar" :position="position">
        <a class="geocloud-control-geolocation" @click="getLocation">
          <i class="fa fa-location-arrow"></i>
        </a>
      </LControl>
      <LMarker
          v-if="currentLocationShow"
          :lat-lng="currentLocation"
      >
        <LIcon
            class-name="geocloud-marker-icon"
            :icon-size="iconSize"
            :icon-anchor="iconAnchor"
        >
          <i class="fa fa-location-arrow"></i>
        </LIcon>
        <LPopup :options="popupOptions">
          我的位置 <br>
          經度 : {{currentLocation[0]}}<br>
          緯度 : {{currentLocation[1]}}<br>
        </LPopup>
      </LMarker>
    </slot>
  </div>
</template>

<script>
import { LControl, LMarker, LPopup, LIcon} from 'vue2-leaflet';

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
      currentLocation: Array,
      currentLocationShow: false,
      iconSize: [24,24],
      iconAnchor: [12,12],
      popupOptions: { maxWidth: 100 }
    }
  },
  methods:{
    getLocation: function (){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
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
    }
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
