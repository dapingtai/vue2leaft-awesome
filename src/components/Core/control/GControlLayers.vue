<template>
  <div style="display: none;">
    <slot v-if="ready">
      <!--控制底圖目錄-->
      <LControl class="geocloud-control-menu" :position="position">
        <a :class="{'geocloud-control-menu-icon':true, active: menuControlIconActive}"
           @click="controlMenuContent"
        >
          <i class="fas fa-map"></i>
        </a>
      </LControl>
      <!--控制底圖目錄面板-->
      <transition name="menu-slide">
        <slot v-if="menuShow">
          <LControl class="collapse-show" :position="position">
            <div class="card-body geocloud-menuContent-tile">
              <span class="close-content" @click="closeMenuContent">x</span>
              <table class="table table-bordered" v-for="(group, groupIndex) in layers" :key="group.name">
                <thead>
                <tr>
                  <th>{{group.name}}</th>
                </tr>
                </thead>
                <tbody>
                <tr class="title">
                  <td>
                    <div class="geocloud-menuContent-tile" v-for="(layer, layerIndex) in group.layers" :key="layer.name">
                      <div class="geocloud-tile-button">
                        <div class="geocloud-tile-describe"
                             :groupindex="groupIndex"
                             :layerindex="layerIndex"
                             @click="changeLayer($event, groupIndex, layerIndex)"
                        >
                          {{layer.name}}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </LControl>
        </slot>
      </transition>
    </slot>
  </div>
</template>

<script>
import {LControl} from 'vue2-leaflet';
import ncl1 from '@/assets/img/nlsc1.png';
import ncl2 from '@/assets/img/nlsc2.png';

const props = {
  position: {
    type: String,
    default: "topright"
  }
}

export default {
  name: "GControlLayers",
  props: props,
  components: {
    LControl
  },
  data: ()=>(
    {
      ready: false,
      menuControlIconActive: false,
      menuShow: false,
      layerObject: Object,
      layers: [
        {
            name:"基本地圖",
            layers: [
            {
              name: "臺灣通用電子地圖",
              url: "https://wmts.nlsc.gov.tw/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=EMAP&STYLE=_null&TILEMATRIXSET=EPSG:3857&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png"
            },
            {
              name: "臺灣通用電子地圖正射影像",
              url: "https://wmts.nlsc.gov.tw/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=PHOTO2&STYLE=_null&TILEMATRIXSET=EPSG:3857&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png"
            },
            {
              name: "Open Street Map",
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          ],
        },
        {
          name:"SPOT衛星影像圖",
          layers: [
            {
              name: "SPOT影像(2018年)",
              url: "http://140.115.110.11/SP/SP2018NC_3857/{z}/{x}/{y}.png"
            },
            {
              name: "SPOT影像(2017年)",
              url: "http://140.115.110.11/SP/SP2017NC_3857/{z}/{x}/{y}.png"
            }
          ],
        }
      ]
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
    changeLayer(event, groupindex, layerindex){
      let allEvents = document.querySelectorAll('.geocloud-tile-describe');
      // 先移除所有的active，再於指定目標加入active
      allEvents.forEach(
          (event)=>{
            event.classList.remove('active');
          }
      )
      event.currentTarget.classList.toggle('active');
      if(event.currentTarget.classList.contains('active')){
        console.log("Start Change");
        this.layerObject = this.layers[groupindex].layers[layerindex];
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
.geocloud-tile-button {
  margin: 5px 6px;
  cursor: pointer;
  transition: 0.3s;
  background-color: #FAFAFA;
  border: 1px solid #8ab48c;
}

.geocloud-tile-describe {
  background-color: #FAFAFA;
  color: #4CAF50;
  opacity: 0.9;
  font-family: 微軟正黑體;
  padding: 4px 8px;
  transition: 0.3s;
  cursor: pointer;
}

.geocloud-tile-describe.active {
  background-color: #4CAF50;
  color: #FAFAFA;
  opacity: 0.9;
  font-family: 微軟正黑體;
  padding: 4px 8px;
  transition: 0.3s;
  cursor: pointer;
}


</style>
