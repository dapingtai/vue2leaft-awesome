<template>
  <div style="display: none;">
    <slot v-if="ready">
      <!--控制本地Image按扭-->
      <LControl class="geocloud-control-menu" :position="position">
        <a :class="{'geocloud-control-menu-icon':true, active: menuControlIconActive}"
           @click="controlMenuContent"
        >
          <i class="fas fa-images"></i>
        </a>
      </LControl>
      <!--控制本地Image面板-->
      <transition name="menu-slide">
        <slot>
          <LControl class="collapse-show" :position="position" v-show="menuShow">
            <div class="card-body geocloud-menuContent-imageOverlay">
              <span class="close-content" @click="closeMenuContent">x</span>
              <table class="table table-bordered" v-for="(group, groupindex) in images" :key="group.name">
                <thead>
                <tr>
                  <th>{{group.name}}</th>
                </tr>
                </thead>
                <tbody>
                <tr class="title">
                  <td>
                    <div class="geocloud-menuContent-imageOverlay" v-for="(image, imageindex) in group.images" :key="imageindex">
                      <div class="geocloud-imageOverlay-button">
                        <div class="geocloud-imageOverlay-describe"
                             @click="changeImage($event, groupindex, imageindex)"
                        >
                          {{image.name}}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <button class="geocloud-imageOverlay-removeDescribes" @click="removeGeojson">
              Remove All
            </button>
          </LControl>
        </slot>
      </transition>
      <!--顯示本地Image-->
      <slot v-if="imageShow">
        <div v-for="(image, index) in addImages" :key="index">
          <LImageOverlay :url="image.url" :bounds="image.bounds" :opacity="imageOpacity"></LImageOverlay>
        </div>
      </slot>
    </slot>
  </div>
</template>

<script>
import {LControl, LImageOverlay, LGeoJson} from 'vue2-leaflet';
import axios from 'axios';

const props = {
  position: {
    type: String,
    default: "topright"
  },
  imageOpacity: {
    type: Number,
    default: 0.6,
  }
}

export default {
  name: "GControlMultiImage",
  props: props,
  components: {
    LControl,
    LImageOverlay,
    LGeoJson
  },
  data: ()=>(
    {
      ready: false,
      menuControlIconActive: false,
      menuShow: false,
      images: [
        {
          name: '外部圖像',
          images: [
            {
              name: 'leaflet 測試圖',
              url: 'http://leafletjs.com/examples/crs-simple/uqm_map_full.png',
              bounds: [[-26.5, -25], [1021.5, 1023]]
            },
            {
              name: '臺灣紅外線雲圖',
              url: 'https://opendata.cwb.gov.tw/fileapi/opendata/MSC/O-B0028-003.jpg',
              bounds: [[18.600625745, 115.976888855],[27.79937425, 126.02300114]]
            },
            {
              name: '北美紅外線雲圖',
              url: 'https://i.imgur.com/06Q1fSz.png',
              bounds: [[13, -130],[32, -100]]
            }
          ]
        }
      ],
      imageShow: false,
      addImages:[]
    }
  ),
  methods: {
    /** Menu 控制開關 **/
    controlMenuContent(){
      if(this.menuControlIconActive){
        this.menuControlIconActive = false;
        this.menuShow = false;
      }else {
        this.menuControlIconActive = true;
        this.menuShow = true;
      }
    },
    /** Menu Content控制開關 **/
    closeMenuContent(){
      this.menuControlIconActive = false;
      this.menuShow = false;
    },
    removeGeojson(){
      let allEvents = document.querySelectorAll('.geocloud-imageOverlay-describe');
      // 先移除所有的active，再移除所有圖層
      allEvents.forEach(
          (event)=>{
            event.classList.remove('active');
          }
      )
      this.imageShow = false;
      this.addImages = [];
    },
    changeImage(event, groupindex, imageindex) {
      this.imageShow = true;

      if(event.currentTarget.classList.contains('active')){
        event.currentTarget.classList.remove('active');
        this.addImages.forEach(
            (addImage, findindex)=>{
              if (addImage.groupindex===groupindex && addImage.imageindex===imageindex){
                this.addImages.splice(findindex, 1);
              }
            }
        )
      }else {
        event.currentTarget.classList.toggle('active');
        console.log("Start Change");
        let addObject = {
          groupindex: groupindex,
          imageindex: imageindex,
          url: this.images[groupindex].images[imageindex].url,
          bounds: this.images[groupindex].images[imageindex].bounds
        };
        this.addImages.push(addObject);
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
.geocloud-control-menu-icon {
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

/**** Menu Content ****/
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all .5s ease;
}

.menu-slide-enter {
  transform: translateX(50px);
  opacity: 0;
}

.menu-slide-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.collapse-show{
  top: 0px;
  width: 240px;
  border-radius: .25rem;
  background-color: white;
  box-shadow: 0 3px 1px lightgray, 0 3px 1px gray;
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
.close-content:hover{
  opacity: .5;
}

/**** Menu Content Table ****/

.table{
  width: 100%;
  margin-bottom: .3rem;
  padding-bottom: 5px;
}

table{
  border: 1px solid #0c0c0c;
  border-collapse: collapse;
  text-align: center;
}

tr{
  padding: rem;
}

th{
  border: 1px solid #0c0c0c;
}

td{
  padding: .5rem;
}

/**** Menu Content Table body ****/
.geocloud-imageOverlay-button {
  margin: 5px 6px;
  cursor: pointer;
  transition: 0.3s;
  background-color: #FAFAFA;
  border: 1px solid #8ab48c;
}

.geocloud-imageOverlay-describe {
  background-color: #FAFAFA;
  color: #4CAF50;
  opacity: 0.9;
  font-family: 微軟正黑體;
  padding: 4px 8px;
  transition: 0.3s;
  cursor: pointer;
}

.geocloud-imageOverlay-describe.active {
  background-color: #4CAF50;
  color: #FAFAFA;
  opacity: 0.9;
  font-family: 微軟正黑體;
  padding: 4px 8px;
  transition: 0.3s;
  cursor: pointer;
}

.geocloud-imageOverlay-removeDescribes {
  color: white;
  background-color: red;
  border-radius: 6px;
  padding: .2rem;
  border: none;
  cursor: pointer;
}

</style>
